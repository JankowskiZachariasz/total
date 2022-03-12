import variable, { variableInterface } from "../models/variable";
import datablock, { datablockInterface } from "../models/datablock";
import operacje, { operacjeInterface } from "../models/operationsPLC";
import { Schema, Types, model, Document } from "mongoose";
import { FetchResult } from "@apollo/client";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import {PaczkaResolverSingleton} from './onoToOneResolver';
import {ConveyorResolverSingleton} from './conveyorResolver';
import paczka, {paczkaInterface} from '../models/paczka';
import ProductUtil from './productUtil';
var nodes7 = require("nodes7");
var loadedTestData = false;

//constants
var   API_default:API = {
  v1: 0,//status komunikacji
  v2: 0,//nr polecenia
  //paczka
  v3: '',//nazwa
  v4: 0,//ilośc paczek
  v5: 0,//nr paczki (którą jestem z koleji)
  v6: 0,//nr seryjny 1
  v7: 0,//nr seryjny 2
  v8: 0,//nr seryjny 3
  v9: 0,//id
  v10: 0,//długość podkładu
  //produkt
  v11: '',//nazwa
  v12: 0,//ilosc paczek
  v13: 0,//nr seryjny 2
  v14: 0,//nr seryjny 2
  v15: 0,//nr seryjny 3
  v16: 0,//id
}

export default class Syncer {
  public constructor() {}

  PLCs: Array<PLC> = [];
  connections: Array<connection> = [];
  datablocks: Array<Datablock> = [];
  pendingOperations: Array<Operation> = [];


  private generateConnectionAddress(
    retrievedVariable: Document<any, any, variableInterface> &
      variableInterface & { _id: Types.ObjectId },
    retrievedDatablock: Document<any, any, datablockInterface> &
      datablockInterface & { _id: Types.ObjectId }
  ): String {
    var connectionString: String = "DB";
    connectionString += retrievedDatablock?.dbNumber?.toString();
    connectionString += ",";
    connectionString += retrievedVariable?.type?.toString();
    connectionString += retrievedVariable?.offset?.toString();
    if (
      retrievedVariable.type == "S" ||
      retrievedVariable.type == "X"  ) {
      connectionString += ".";
      connectionString += retrievedVariable?.offsetDecimal?.toString();
    }
    return connectionString;
  }

  private generateVariables(localVariables: Array<localVariable>): Object {
    var toReturn = {};
    localVariables.map((localVar) => {
      toReturn[localVar.variableRef.name] = localVar.connectionAddress;
    });

    return toReturn;
  }

  async retrieveVariablesToSync(): Promise<Array<PLC>> {
    return new Promise<Array<PLC>>((resolve, reject) => {
      var ipAddresses: Array<String> = [];
      var newPLCs: Array<PLC> = [];

      datablock.find({}).exec(async (err, retrievedDatablocks:Datablock[]) => {
        if (err) reject();
      //console.log(retrievedDatablocks);
        this.datablocks = retrievedDatablocks;
        await Promise.all(
          retrievedDatablocks.map(async (datablockInstance) => {
            if (!ipAddresses.includes(datablockInstance.ip)) {
              ipAddresses.push(datablockInstance.ip);
              newPLCs.push({
                ip: datablockInstance.ip,
                variablesToReadWrite: new Array(),
                variablesToReadOnly: new Array(),
              });
            }
            //now the current PLC is already in the PLCs array
            await Promise.all(
              newPLCs.map(async (plc) => {
                if (plc.ip == datablockInstance.ip) {
                  //for every dataBlock retrieve variables
                  try {
                    var retrievedVariables = await variable
                      .find({ datablock: datablockInstance._id })
                      .exec();
                    retrievedVariables.map((variableInstance) => {
                      var localVariable: localVariable = {
                        variableRef: variableInstance,
                        connectionAddress: this.generateConnectionAddress(
                          variableInstance,
                          datablockInstance
                        ),
                      };
                      if (variableInstance.rwMode == "Read") {
                        plc.variablesToReadOnly.push(localVariable);
                      } else {
                        plc.variablesToReadWrite.push(localVariable);
                      }
                    });
                  } catch (err) {
                  //console.log(err);
                    reject();
                  }
                }
              })
            );
          })
        );

        this.PLCs = newPLCs;
        resolve(newPLCs);
      });
    });
  }

  async buildConnections(newPLCs: Array<PLC>): Promise<Array<connection>> {
    return new Promise<Array<connection>>(async (resolve, reject) => {
      var connectionsTemp: Array<connection> = [];
      await Promise.all(
        newPLCs.map(async (plc) => {
          var conn = new nodes7();
          try{
            await new Promise<void>(async (resolve, reject) => {
              conn.initiateConnection(
                { port: 102, host: plc.ip, rack: 0, slot: 1 },
                (err) => {
                  if (typeof err !== "undefined") {
                  //console.log(err);
                    reject();
                  } else {
                    var inputVariables: Array<localVariable> = [];
                    inputVariables.push(...plc.variablesToReadOnly);
                    inputVariables.push(...plc.variablesToReadWrite);
                    var variables = this.generateVariables(inputVariables);
                    conn.setTranslationCB((tag) => {
                      return variables[tag];
                    }); // This sets the "translation" to allow us to work with object names
                    conn.addItems([...Object.getOwnPropertyNames(variables)]);
                    var localConnection: connection = {
                      plc: plc,
                      plcConnection: conn,
                    };
                    connectionsTemp.push(localConnection);
                  }
                  resolve();
                }
              );
            });
          }
          catch(e){console.log(e);}
        })
      );
      this.connections = connectionsTemp;
      resolve(connectionsTemp);
    });
  }

  public async tick() {
    //this method will initiate a series of events:
    //1) handling PLC commands
    //2) retrieval of PLC variables
    //3) updating database with new values

    for (var i = 0; i < this.connections.length; i++) {
      var currentConnection: connection = this.connections[i];
      //fetch current operations and choose a command to write to plc
      var currentOperation:Operation = await this.translatePlcCommandsToWritables(currentConnection);
      //write controlling variables to plc
      if(currentOperation) try{await this.write(currentConnection);}catch(e){console.log(e);}
      //read all watched variables from the plc
      var variablesToUpdate: Array<localVariable>=null; 
      if(currentConnection) 
      try{variablesToUpdate = await this.read(currentConnection);}catch(e){console.log(e);}

      var productUiResolver = new ProductUtil();
      await productUiResolver.productsToPaczkasTranslate();
      //paczki: (onoToOneResolver)
      await PaczkaResolverSingleton.resolve(currentConnection.plc.variablesToReadOnly);
      await PaczkaResolverSingleton.commitChanges();
      await productUiResolver.updateProductsWithPaczkas();
      
      //read conveyor states
      await ConveyorResolverSingleton.resolveConveyors(currentConnection.plc.variablesToReadOnly);

      // loadedTestData=true;
      // if(!loadedTestData){
      //   var localAdd: Array<any> = [];
      //   for(var i=4;i<997;i++){
      //     localAdd.push(
      //       new paczka({type:'DB_EDIT',name:'Zachi_paczka_'+i,enumerator:('paczka'+i),nrSeryjny1:23,nrSeryjny2:i,nrSeryjny3:2000-i,nrPaczki:1,plcId:i})
      //       );
      //   }
      //   if(localAdd.length>0)
      //   try{await paczka.insertMany(localAdd)}catch(e){console.log(e);}
      // }
      
      


      //try to declare operation a success (triggers will either confirm it or not)
      await this.operationProcessor(this.pendingOperations,PaczkaResolverSingleton.PLCcommands);
      //update database with new variables through keystoneJS
      if (variablesToUpdate) {await this.updateDatabase(currentConnection, variablesToUpdate);}

      
    }
  }

  private async translatePlcCommandsToWritables( currentConnection : connection): Promise<Operation> {
    return new Promise<Operation>(async (resolve, reject) => {
      operacje.find({status:'Pending'}).exec(async (err, retrievedOperations) =>{
        if(err)reject(err);
        this.pendingOperations = retrievedOperations;
        //building a list of considered datablocks to filter out commands conserning other PLCs
        var consideredDatablockIds: Array<String> = [];
        this.datablocks.forEach(datablock => {
          if(datablock.ip==currentConnection.plc.ip)
          consideredDatablockIds.push(datablock._id.toString());
        });
          //choose the oldest operation for the current ip (if no operation can be found, the result can be null)
          var oldest: Date = new Date(8640000000000000);
          var oldestOperation: Operation = null;
          retrievedOperations.forEach(operation => {
            var candidateOldest:Date = new Date(operation.timeSubmitted);

            if(candidateOldest < oldest && consideredDatablockIds.includes(operation.datablock._id.toString())){
              oldest=candidateOldest;
              oldestOperation=operation;
            }
          });
          //console.log(oldestOperation);
          //choose variable states. Following are some hard-coded responses to command codes
          //first set all controlling variables to their defaults (0 fur numeric vars and '' for Strings)
          var API_commands:API = {};
          Object.assign(API_commands, API_default);

          
          //modify the variables according to the current operation
          if(oldestOperation!=null){
            switch(oldestOperation.operation){
              case('Paczki_CREATE'):{API_commands=Paczki_CREATE.generateVariables(oldestOperation); break;}
              case('Paczki_UPDATE'):API_commands=Paczki_UPDATE.generateVariables(oldestOperation); {break;}
              case('Paczki_DELETE'):API_commands=Paczki_DELETE.generateVariables(oldestOperation); {break;}
              default: {break;}
            }
          }
          //writing to PLC variables
          if(currentConnection?.plc?.variablesToReadWrite?.length>0){
            currentConnection?.plc?.variablesToReadWrite.forEach(PLCvar => {
              var varName:string = PLCvar?.variableRef?.name;
              var group:string = varName.substring(0,varName.lastIndexOf('v'));
              var specifics:string = varName.substring(varName.lastIndexOf('v'),varName.length);
              switch(group){
                case('api1'):{
                  if(API_commands.hasOwnProperty(specifics)){
                    
                    PLCvar.variableRef.valueToWrite=API_commands[specifics];
                  }
                  break;
                }
                //case('other'):{break;}
              }
            });
          }

          //returning operation for further usage
        resolve(oldestOperation);
      })

      });
  }

  private async write(connection: connection): Promise<Array<connection>> {
    return new Promise<Array<connection>>(async (resolve, reject) => {

    //set all controlling variables to 0/null
    var variableNames:Array<String> = new Array();
    var variableValues:Array<any> = new Array();

    connection?.plc?.variablesToReadWrite?.map(m=>{

      let name = m?.variableRef?.name;
      let valueToWrite = m?.variableRef?.valueToWrite;

      if(name&&valueToWrite){
        variableNames.push(name);       
        variableValues.push(valueToWrite);
      }
      
    });
    try{
      connection.plcConnection.writeItems(variableNames,variableValues,async (result)=>{console.log(result);resolve(result);});
    }
    catch(e)
    {console.log(e);reject(e);}
    
    //pick the oldest one
    //translate it into new variable state
    //asynchronously apply ne variable state

    });


  }

  private async read(connection: connection): Promise<Array<localVariable>> {
    return new Promise<Array<localVariable>>(async (resolve, reject) => {
      setTimeout(()=>{//read operation is delayed to make sure that a command was executed by PLC after write 
        var variablesToUpdate: Array<localVariable> = new Array();
        connection.plcConnection.readAllItems((error: any, values: Object) => {
          if (error) reject(error);
          else {
            var allVariables = [...connection.plc.variablesToReadOnly,...connection.plc.variablesToReadWrite];
            allVariables.map((m) => {
              if (values.hasOwnProperty(m.variableRef.name)) {
                if (
                  variablesToUpdate.length<100&&
                    ((
                     (typeof m?.variableRef?.value == 'undefined')
                     && (typeof values[m.variableRef.name] != 'undefined')
                    )||
                    (m?.variableRef?.value !=
                    values[m.variableRef.name])))
                    {
                      //so the local list of variables is always up to date
                      m.variableRef.value = values[m.variableRef.name];
                      variablesToUpdate.push(m);
                    }
              }
            });
            resolve(variablesToUpdate);
          }
        });
      },500)
    });
  }

  private async updateDatabase(connection: connection, variablesToUpdate: Array<localVariable>): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> {
    return new Promise<FetchResult<any, Record<string, any>, Record<string, any>>>(async (resolve, reject) => {
      var dataToInsert = new Array();
      variablesToUpdate.map((m) => {
        dataToInsert.push({
          id: m.variableRef._id,
          "data": {
            value: m.variableRef.value,
          }
        });
      });
      try{
        let returnedData = await client.mutate({
            mutation: gql`
              mutation myMutation($data: [VariablesUpdateInput]!) {
                updateVariables(data: $data) {
                  id
                  value
                }
              }
            `,
            variables: {
              data: dataToInsert,
            },
          });
          resolve(returnedData);
      }
      catch(e){
        //console.log(e.networkError);
      }
      
    });
  }

  private async operationProcessor(allInPending:Array<Operation>,newOperations:Array<Operation>):Promise<void>{
    return new Promise<void>(async (resolve, reject) => {
      //check which pending operations didn't appear amoung new ones
      //and declare them Successful
      var toDeclareSuccessfull : Array<any> = [];
      allInPending.forEach(pendingOperation => {
        var matched = false;
        for(var i=0;i<newOperations.length;i++){
          if(pendingOperation.operation==newOperations[i].operation
            &&pendingOperation.payload==newOperations[i].payload){
              matched=true;break;
            }
        }
        if(!matched){
          toDeclareSuccessfull.push({data: {status: "Success"}, id: pendingOperation._id});
        }
      });

      if(toDeclareSuccessfull.length>0)
      try{
        let returnedData = await client.mutate({
            mutation: gql`
                mutation myMutation($data:  [OperacjePLCSUpdateInput]) {
                  updateOperacjePLCS(data: $data) {
                    id
                    status
                  }
                }
            `,
            variables: {
              data: toDeclareSuccessfull
            },
          });
      }
      catch(e){
        //console.log(e.networkError);
          reject(e);
      }

      //if number of pending jobs = 0;
      //pick the most important task from the list of new jobs
      //send it to db as pending
    //console.log('will proceed with commands?')
    //console.log((allInPending.length-toDeclareSuccessfull.length)<=0)
    //console.log('end commands')
      if((allInPending.length-toDeclareSuccessfull.length)<=0){
        //the order is as follows:
        //new ones
        //modifications
        //deletions
        var newOpps : Array<Operation> = [];
        var modOpps : Array<Operation> = [];
        var delOpps : Array<Operation> = [];
        newOperations.forEach(operation => {
          switch(operation?.operation){
            case('Paczki_CREATE'):{newOpps.push(operation); break;}
            case('Paczki_UPDATE'):{modOpps.push(operation); break;}
            case('Paczki_DELETE'):{delOpps.push(operation); break;}
          }
        });
        var toCreate:Operation = [...newOpps,...modOpps,...delOpps][0];

        if(toCreate)
        try{
          let returnedData = await client.mutate({
              mutation: gql`
                mutation myMutation($data:  OperacjePLCCreateInput) {
                 createOperacjePLC(data: $data){
    						id
  							}
                }
              `,
              variables: {
                data: toCreate
              },
            });
        }
        catch(e){
          //console.log(e.networkError);
            reject(e);
        }
        resolve();

      }
      resolve();



    })
  }


}

class Paczki_CREATE{//instruction: 1
    
  static generateVariables(instructions : Operation): API{
    var toReturn: API = {};
    Object.assign(toReturn, API_default);
    toReturn.v1=1;//status komunikacji
    toReturn.v2=1;//nr polecenia
    var payload:any = JSON.parse(instructions?.payload);
    //payload to paczka
    toReturn.v3=payload?.name;//nazwa
    toReturn.v4=parseInt(payload?.lPaczek);//ilość paczek
    toReturn.v5=parseInt(payload?.nrPaczki);//numer paczki
    toReturn.v6=parseInt(payload?.nrSeryjny1);//nr seryjny 1
    toReturn.v7=parseInt(payload?.nrSeryjny2);//nr seryjny 2
    toReturn.v8=parseInt(payload?.nrSeryjny3);//nr seryjny 3
    toReturn.v9=parseInt(payload?.plcId);//id
    toReturn.v10=parseInt(payload?.dlugosc);//długość podkładu

    return toReturn;
  }

  static verifyResult(){}
}

class Paczki_UPDATE{//instruction: 2
    
  static generateVariables(instructions : Operation): API{
    var toReturn: API = {};
    Object.assign(toReturn, API_default);
    toReturn.v1=1;//status komunikacji
    toReturn.v2=2;//nr polecenia
    var payload:any = JSON.parse(instructions?.payload);
    //payload to paczka
    toReturn.v3=payload?.name;//nazwa
    toReturn.v4=parseInt(payload?.lPaczek);//ilość paczek
    toReturn.v5=parseInt(payload?.nrPaczki);//numer paczki
    toReturn.v6=parseInt(payload?.nrSeryjny1);//nr seryjny 1
    toReturn.v7=parseInt(payload?.nrSeryjny2);//nr seryjny 2
    toReturn.v8=parseInt(payload?.nrSeryjny3);//nr seryjny 3
    toReturn.v9=parseInt(payload?.plcId);//id
    toReturn.v10=parseInt(payload?.dlugosc);//długość podkładu

    return toReturn;
  }

  static verifyResult(){}
}

class Paczki_DELETE{//instruction: 3
    
  static generateVariables(instructions : Operation): API{
    var toReturn: API = {};
    Object.assign(toReturn, API_default);
    toReturn.v1=1;//status komunikacji
    toReturn.v2=3;//nr polecenia
    var payload:any = JSON.parse(instructions?.payload);
    //payload to paczka
    toReturn.v9=parseInt(payload?.plcId);//id
    return toReturn;
  }

  static verifyResult(){}
}

interface connection {
  plc?: PLC;
  plcConnection?: any;
}

export interface localVariable {
  variableRef: Document<any, any, variableInterface> &
    variableInterface & { _id: Types.ObjectId };
  connectionAddress: String;
}

interface PLC {
  ip: String;
  variablesToReadWrite?: Array<localVariable>;
  variablesToReadOnly?: Array<localVariable>;
}

interface API_Interface {
  v1?:Number;//status komunikacji
  v2?:Number;//nr polecenia
  //paczka
  v3?:String;//nazwa
  v4?:Number;//ilośc paczek
  v5?:Number;//nr paczki (którą jestem z koleji)
  v6?:Number;//nr seryjny 1
  v7?:Number;//nr seryjny 2
  v8?:Number;//nr seryjny 3
  v9?:Number;//id
  v10?:Number;//długość podkłądu
  //produkt
  v11?:String;//nazwa
  v12?:Number;//ilosc paczek
  v13?:Number;//nr seryjny 2
  v14?:Number;//nr seryjny 2
  v15?:Number;//nr seryjny 3
  v16?:Number;//id
}

type API = API_Interface & Object;

export type Operation = Document<any, any, operacjeInterface> & operacjeInterface & {_id: Types.ObjectId;}|operacjeInterface;

type Datablock = Document<any, any, datablockInterface> & datablockInterface & {_id: Types.ObjectId;}