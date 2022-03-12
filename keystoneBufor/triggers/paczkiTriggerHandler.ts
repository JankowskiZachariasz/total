require('dotenv').config();
import PaczkaTrigger, {PaczkaDb} from './variablePaczkaTriggers'

class paczkiTriggerHandler {


    async checkIfDuplicateExists(props: keystoneValidateInputDataForFields) :Promise<Boolean>{
        return new Promise<Boolean>(async (resolve,reject)=>{
            console.log('paczkiTriggerHandler.ts [28]: Prventing duplicate creation '+props.resolvedData.enumerator);
            console.log('paczkiTriggerHandler.ts [28]: Prventing duplicate creation '+props.resolvedData.type);
            var paczkasData = await props.context.executeGraphQL({
                context: props.context,
                query: `   
                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {
                    data: allPaczkas(where: { 
                      type: $recordType
                      enumerator: $enumerator
                    }) {
                        id
                    }
                }
                        `,
                variables: {
                    enumerator: props.resolvedData.enumerator,
                    recordType: props.resolvedData.type
                  },
            });
            if(paczkasData?.data?.data?.length>0){
                console.log('paczkiTriggerHandler.ts [28]: Prventing duplicate creation '+paczkasData?.data?.data);
                resolve(true);
            }
            else{
                resolve(false);
            }



        });
    }

    async onDataChange(props: keystoneAfterTriggerData) :Promise<void>{
        return new Promise<void>(async (resolve,reject)=>{
            //find out the entity state
            //I am linking entities by their enumerators
            let enumerator:String = props?.updatedItem?.enumerator;
            var allPaczkas:paczkasMap={};
            try{
                allPaczkas = await this.fetchPaczkasByEnumerator([enumerator], props);
            }
            catch(e){reject(e);}        
            //execute an appropriate action
            await this.resolveEntityLevelConsistancy(allPaczkas, props);
            await this.resolveFieldLevelConsistancy(allPaczkas, props);
            resolve();
            
        }); 
    }
  
    async resolveEntityLevelConsistancy(allPaczkas:paczkasMap,props: keystoneAfterTriggerData) :Promise<void>{
        return new Promise<void>(async (resolve,reject)=>{
            await Promise.all(Object.keys(allPaczkas).map(async key => {
                var A :number = allPaczkas[key][0]!=null?1:0;
                var B :number = allPaczkas[key][1]!=null?1:0;
                var C :number = allPaczkas[key][2]!=null?1:0;
                var product:number = (A*4)+(B*2)+(C*1);
                console.log(product);
                switch(product){
                    case(0):{break;}//stable
                    case(1):{delete allPaczkas[key][2].id; await PaczkaTrigger.createPaczkas([{data:{...allPaczkas[key][2],type:'DB_EDIT'}}],props?.context); break;}//L2=L3
                    case(2):{await this.addToPLC(allPaczkas[key][1],props?.context); break;}//L3=L2 (new PLCcommand)
                    case(3):{delete allPaczkas[key][2].id; await PaczkaTrigger.createPaczkas([{data:{...allPaczkas[key][2],type:'DB_REF'}}],props.context); break;}//L1=L3
                    case(4):{await PaczkaTrigger.deletePaczkas([allPaczkas[key][0].id],props?.context); break;}//delete L1
                    case(5):{await this.deleteFromPLC(allPaczkas[key][2],props?.context); break;}//delete L3 (new PLCcommand)
                    case(6):{await PaczkaTrigger.deletePaczkas([allPaczkas[key][1].id],props?.context); break;}//delete L2
                    case(7):{break;}//stable
                }
            }));
            resolve();           
        }); 
    }

    async resolveFieldLevelConsistancy(allPaczkas:paczkasMap,props: keystoneAfterTriggerData) :Promise<void>{
        return new Promise<void>(async (resolve,reject)=>{
            await Promise.all(Object.keys(allPaczkas).map(async key => {
                if(allPaczkas[key][0]!=null && allPaczkas[key][1]!=null && allPaczkas[key][2]!=null){//must be stable
                    var iterable:PaczkaDb = {
                        enumerator:'',
                        name:'',
                        type:'',
                        lPaczek:0,
                        nrPaczki:0,
                        nrSeryjny1:0,
                        nrSeryjny2:0,
                        nrSeryjny3:0,
                        plcId:0,
                        dlugosc:0,
                    }
                    var temp1:PaczkaDb = {}; Object.assign(temp1, allPaczkas[key][0]);
                    var temp2:PaczkaDb = {}; Object.assign(temp2, allPaczkas[key][1]);
                    var temp3:PaczkaDb = {}; Object.assign(temp3, allPaczkas[key][2]);
                    
                    var currentTripple:Array<PaczkaDb>=[temp1,temp2,temp3]
                    await Promise.all(Object.keys(iterable).map(async fieldKey => {
                        var L1 :any = allPaczkas[key][0][fieldKey];
                        var L2 :any = allPaczkas[key][1][fieldKey];
                        var L3 :any = allPaczkas[key][2][fieldKey];
                        if(!(L1==L2&&L2==L3)){
                            if((L1==L2)&&(L1!=L3)&&(L2!=L3)){// AAB -> A=B
                                console.log('AAB -> A=B');
                                //currentTripple[0][fieldKey]=currentTripple[2][fieldKey];
                                currentTripple[1][fieldKey]=currentTripple[2][fieldKey];
                            }
                            else if((L3==L2)&&(L1!=L3)&&(L1!=L2)){// ABB -> A=B
                                console.log('ABB -> A=B');
                                currentTripple[0][fieldKey]=currentTripple[2][fieldKey];
                            }
                            else if((L1==L3)&&(L1!=L2)&&(L3!=L2)){// BAB -> B=A
                                console.log('BAB -> B=A');
                                //currentTripple[0][fieldKey]=currentTripple[1][fieldKey];
                                currentTripple[2][fieldKey]=currentTripple[1][fieldKey];
                            }
                            else if((L1!=L3)&&(L1!=L2)&&(L3!=L2)){// ABC -> B=C
                                console.log('BAB -> B=A');
                                //currentTripple[0][fieldKey]=currentTripple[1][fieldKey];
                                currentTripple[1][fieldKey]=currentTripple[2][fieldKey];
                            }
                        } 
                    }));
                    if(!this.comparePaczkas(allPaczkas[key][0], currentTripple[0])){
                        let id:string = currentTripple[0].id;
                        delete currentTripple[0].id;
                        await PaczkaTrigger.updatePaczkas([{id:id, data: currentTripple[0]}],props?.context);
                    }
                    if(!this.comparePaczkas(allPaczkas[key][1], currentTripple[1])){
                        let id:string = currentTripple[1].id;
                        delete currentTripple[1].id;
                        await PaczkaTrigger.updatePaczkas([{id:id, data: currentTripple[1]}],props?.context);
                    }
                    if(!this.comparePaczkas(allPaczkas[key][2], currentTripple[2])){
                        await this.modifyPLC(currentTripple[2],props?.context);
                    }

                }
            }));
              
            
        }); 
    }

    comparePaczkas(paczka1:PaczkaDb,paczka2:PaczkaDb):Boolean{

        var toReturn:Boolean = (
            paczka1.name==paczka2.name&&
            paczka1.lPaczek==paczka2.lPaczek&&
            paczka1.nrPaczki==paczka2.nrPaczki&&
            paczka1.nrSeryjny1==paczka2.nrSeryjny1&&
            paczka1.nrSeryjny2==paczka2.nrSeryjny2&&
            paczka1.nrSeryjny3==paczka2.nrSeryjny3&&
            paczka1.plcId==paczka2.plcId&&
            paczka1.dlugosc==paczka2.dlugosc
        );

        return toReturn;
    }

    async resolveGlobalEintityLevelConsistancy(props: keystoneAfterTriggerData) :Promise<void>{
        return new Promise<void>(async (resolve,reject)=>{
          
             
            
        }); 
    }
  
    async fetchPaczkasByEnumerator(enums: Array<String>, props: keystoneAfterTriggerData) :Promise<paczkasMap>{
        return new Promise<paczkasMap>(async (resolve,reject)=>{
            var paczkasData: gqlPaczkasResult = {};
            try{
                paczkasData = await props.context.executeGraphQL({
                    context: props.context,
                    query: `   
                    query MyQuerry($enumerators: [String]!) {
                        data: allPaczkas(where: { 
                          enumerator_in: $enumerators,
                        }) {
                            id
                            enumerator
                            name
                            type
                            lPaczek
                            nrPaczki
                            nrSeryjny1
                            nrSeryjny2
                            nrSeryjny3
                            plcId
                            dlugosc
                            }
                        }
                            `,
                    variables: {
                        enumerators: enums
                      },
                });
            }
            catch(e){reject(e);}
            
            var toReturn:paczkasMap={};
            //go through results and build an answer
            paczkasData?.data?.data?.forEach(paczka  => {
                var currentEnum = paczka.enumerator;
                if (!toReturn.hasOwnProperty(currentEnum)) {
                    toReturn[currentEnum] = [null,null,null];
                }
                switch(paczka.type){
                    case('DB_REF'):{toReturn[currentEnum][0]=paczka; break;}
                    case('DB_EDIT'):{toReturn[currentEnum][1]=paczka; break;}
                    case('PLC'):{toReturn[currentEnum][2]=paczka; break;}
                }
            });
            resolve(toReturn);
        });
    }

    async deleteFromPLC(toDelete:PaczkaDb, apolloContext:any) :Promise<void>{      
        return new Promise<void>(async (resolve,reject)=>{
            var operacja:plcCommand={};
            var indexToDelete:number = Number.parseInt(toDelete?.enumerator?.substring(6,toDelete?.enumerator?.length));
            operacja.name='PLC_DELETE_'+toDelete.name;
            operacja.datablock={connect:{id:process.env.API_DB_ID}};
            operacja.operation='Paczki_DELETE';
            operacja.payload=JSON.stringify({...toDelete,plcId:indexToDelete});
            operacja.status='Pending';
            operacja.timeSubmitted=Date.now().toString();
            if(toDelete)
            try{
            var result = await apolloContext.executeGraphQL({
                context: apolloContext,
                query: `   mutation MyMutation($newOperacje: OperacjePLCCreateInput!){
                            createOperacjePLC( data: $newOperacje){id}
                        }`,
                variables: { newOperacje: operacja},
              });
              if(result.errors){throw new Error(result.errors);}
            }
            catch(e){console.log(e);reject(e);}
            resolve();           
        }); 
    }

    async addToPLC(toAdd:PaczkaDb, apolloContext:any) :Promise<void>{
        return new Promise<void>(async (resolve,reject)=>{
            var operacja:plcCommand={};
            operacja.name='Paczki_CREATE_'+toAdd.name;
            operacja.datablock={connect:{id:process.env.API_DB_ID}};
            operacja.operation='Paczki_CREATE';
            operacja.payload=JSON.stringify(toAdd);
            operacja.status='Pending';
            operacja.timeSubmitted=Date.now().toString();
            if(toAdd)
            try{
            var result = await apolloContext.executeGraphQL({
                context: apolloContext,
                query: `   mutation MyMutation($newOperacje: OperacjePLCCreateInput!){
                            createOperacjePLC( data: $newOperacje){id}
                        }`,
                variables: { newOperacje: operacja},
              });
              if(result.errors){throw new Error(result.errors);}
            }
            catch(e){console.log(e);reject(e)}
            resolve();          
        }); 
    }

    async modifyPLC(toModify:PaczkaDb, apolloContext:any) :Promise<void>{
        return new Promise<void>(async (resolve,reject)=>{
            var operacja:plcCommand={};
            var indexToModify:number = Number.parseInt(toModify?.enumerator?.substring(6,toModify?.enumerator?.length));
            operacja.name='Paczki_UPDATE'+toModify.name;
            operacja.datablock={connect:{id:process.env.API_DB_ID}};
            operacja.operation='Paczki_UPDATE';
            operacja.payload=JSON.stringify({...toModify,plcId:indexToModify});
            operacja.status='Pending';
            operacja.timeSubmitted=Date.now().toString();
            if(toModify)
            try{
            var result = await apolloContext.executeGraphQL({
                context: apolloContext,
                query: `   mutation MyMutation($newOperacje: OperacjePLCCreateInput!){
                            createOperacjePLC( data: $newOperacje){id}
                        }`,
                variables: { newOperacje: operacja},
              });
              if(result.errors){throw new Error(result.errors);}
            }
            catch(e){console.log(e);reject(e)}
            resolve();          
        }); 
    }




  }

  export default new paczkiTriggerHandler();

  export interface keystoneAfterTriggerData {
    operation?: string;
    existingItem?: any;
    originalInput?: any;
    updatedItem?: any;
    context?: any;
    listKey?: string;
    fieldPath?: string;
  }

  export interface keystoneValidateInputDataForFields {
    operation?: String;
    existingItem?: any;
    originalInput?: any;
    resolvedData?: any;
    context?: any;
    addFieldValidationError :any;
    listKey?: String;
    fieldPath?: String;
  }

  interface plcCommand{
    name?:string;
    datablock?:{ connect: {id: string} };
    operation?:string;
    timeSubmitted?:string;
    status?:string;
    payload?:string;
  }
  

  type paczkasMap = { [key: string]: Array<PaczkaDb> };

  type gqlPaczkasResult = { data?:{ data?: Array<PaczkaDb>} };