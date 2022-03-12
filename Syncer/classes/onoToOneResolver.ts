import type { Model, Types, Document} from 'mongoose';
import type {Operation, localVariable} from './worker';
import paczka, {paczkaInterface} from '../models/paczka';
import variable, {variableInterface} from '../models/variable';
import ResolverUtil from './resolverUtil'
import resolverUtil from './resolverUtil';
abstract class OnoToOneResolver {

    triples : tripleMap = null;
    variableMap : variableDbObject =null;

    PLC : Array<record>
    DB_REF : Array<record>
    DB_EDIT : Array<record>

    schema : Model<any>

    toDelete : Array<record>
    toAdd : Array<record>
    toModify : Array<record>
    PLCcommands : Array<Operation>

    abstract translateVars(vars: Array<localVariable>):variableDbObject;
    abstract queryRecords():Promise<{DB_REF: Array<record>, DB_EDIT: Array<record>}>;//this fills up DB_REF and DB_EDIT arrays
    abstract processVariables(vars: variableDbObject):Array<record>;//this turns variables into PLC array
    abstract deriveTriples(DB_REF: Array<record>, DB_EDIT: Array<record>, PLC: Array<record>):tripleMap;
    abstract enforceRecordLevelConsistancy(vars: tripleMap)
    :{doDelete: Array<record>, toAdd: Array<record>, commands : Array<Operation>};//compares triples and generates doDelete, toAdd, PLCcommands
    abstract enforceFieldLevelConsistancy(vars: tripleMap)
    :{toModify: Array<record>, commands : Array<Operation>};//compares triples and generates toModify, PLCcommands
    
    async resolve(freshVariables:Array<localVariable>):Promise<void>{
        return new Promise<void>(async (resolve, reject) => {         
            try{
                if(this.variableMap==null)this.variableMap=this.translateVars(freshVariables);
                var dbRecords = await this.queryRecords();
                this.DB_REF = dbRecords.DB_REF;
                this.DB_EDIT = dbRecords.DB_EDIT;
                this.PLC = this.processVariables(this.variableMap);
                this.triples = this.deriveTriples(this.DB_REF,this.DB_EDIT,this.PLC);
              //console.log(this.triples);
                this.PLCcommands = [];
                var recordLevelChanges = this.enforceRecordLevelConsistancy(this.triples);
                this.toDelete = recordLevelChanges.doDelete;
                this.toAdd = recordLevelChanges.toAdd;
                this.PLCcommands.push(...recordLevelChanges.commands);
                var fieldLevelChanges = this.enforceFieldLevelConsistancy(this.triples);
                this.toModify = fieldLevelChanges.toModify;
                this.PLCcommands.push(...fieldLevelChanges.commands);
              //console.log('commands:')
              //console.log(this.PLCcommands);
              //console.log('END commands:')
                // console.log(this.toDelete);
                // console.log(this.toAdd);
                //console.log(this.toModify);
                // console.log('Czemu tego nie widać?');
                // //console.log(this.PLCcommands);
                // console.log('Hmmmmm??');
                resolve();
            }
            catch(e){reject(e);}
        })
    }

    abstract commitChanges():Promise<void>;



}

class PaczkaResolver extends OnoToOneResolver{

    constructor (){
        super();
        this.schema = paczka;
    }

    async queryRecords(): Promise<{ DB_REF: paczkaRecord[]; DB_EDIT: paczkaRecord[]; }> {
        return new Promise<{ DB_REF: paczkaRecord[]; DB_EDIT: paczkaRecord[];}>(async (resolve, reject) => {
            var ref : paczkaRecord[] = [];
            var edit : paczkaRecord[] =[];
            try{
                var retrievedVariables = await paczka.find({ type: {$in: ['DB_REF','DB_EDIT']} }).exec();
                retrievedVariables.map(m=>{
                    switch(m.type){
                        case('DB_REF'):{ref.push(m);}
                        case('DB_EDIT'):{edit.push(m);}
                    }
                });
                resolve({DB_REF:ref,DB_EDIT:edit})
            }
            catch(e){reject(e);}
        });
        
    }
    translateVars(vars: localVariable[]): variableDbObject {
        var toReturn: variableDbObject={};
        vars.map(m=>{
            if(m.variableRef.name.substring(0,4)=='pacz'){
                toReturn[m.variableRef.name]=m.variableRef;
            }
        });
        return toReturn;
    }
    processVariables(vars: variableDbObject): paczkaRecord[] {
        var toReturn : paczkaRecord[]=[];
        var toReadThoroughly : number[] =[];
        var index: number =0;
        do{
            index++;
            var currentPlcIndex = vars['paczka'+index+'v7']?.value;
            if(currentPlcIndex!='0' && currentPlcIndex!=null && typeof currentPlcIndex != undefined)
            toReadThoroughly.push(index);

        }while(typeof vars['paczka'+(index+1)+'v7'] != 'undefined');

        toReadThoroughly.forEach(i => {
            var paczka: paczkaRecord = {
                type : 'PLC',
                enumerator : 'paczka'+i,
                name : vars['paczka'+i+'v1'].value,
                lPaczek : Number.parseInt(vars['paczka'+i+'v2'].value),
                nrPaczki : Number.parseInt(vars['paczka'+i+'v3'].value),
                nrSeryjny1 : Number.parseInt(vars['paczka'+i+'v4'].value),
                nrSeryjny2 : Number.parseInt(vars['paczka'+i+'v5'].value),
                nrSeryjny3 : Number.parseInt(vars['paczka'+i+'v6'].value),
                plcId : Number.parseInt(vars['paczka'+i+'v7'].value),
                dlugosc : Number.parseInt(vars['paczka'+i+'v8'].value),
            };
            

                
                toReturn.push(paczka);
        });

        return toReturn;
    }

    deriveTriples(DB_REF: paczkaRecord[], DB_EDIT: paczkaRecord[], PLC: paczkaRecord[]): tripleMap {
        var map: tripleMap = {};
        [...DB_REF,...DB_EDIT,...PLC].forEach(paczka => {
            var currentEnum = paczka.enumerator;
                if (!map.hasOwnProperty(currentEnum)) {
                    map[currentEnum] = [null,null,null];
                }
                switch(paczka.type){
                    case('DB_REF'):{map[currentEnum][0]=paczka; break;}
                    case('DB_EDIT'):{map[currentEnum][1]=paczka; break;}
                    case('PLC'):{map[currentEnum][2]=paczka; break;}
                }
        });
        return map;
    }

    enforceRecordLevelConsistancy(vars: tripleMap):
     { doDelete: paczkaRecord[]; toAdd: paczkaRecord[]; commands: Operation[]; } {
        var doDelete: paczkaRecord[]=[];
        var toAdd: paczkaRecord[]=[];
        var commands: Operation[]=[];
        
        Object.keys(vars).map(async key => {
            var A :number = vars[key][0]!=null?1:0;
            var B :number = vars[key][1]!=null?1:0;
            var C :number = vars[key][2]!=null?1:0;
            var product:number = (A*4)+(B*2)+(C*1);
            
            switch(product){
                case(0):{break;}//stable
                case(1):{toAdd.push({...vars[key][2],type:'DB_EDIT'}); break;}//L2=L3
                case(2):{commands.push(ResolverUtil.generatePaczkaCommandToCreateOnPLC(vars[key][1])); break;}//L3=L2 (new PLCcommand)
                case(3):{toAdd.push({...vars[key][2],type:'DB_REF'}); break;}//L1=L3
                case(4):{doDelete.push(vars[key][0]); break;}//delete L1
                case(5):{commands.push(ResolverUtil.generatePaczkaCommandToDeleteFromPLC(vars[key][2])); break;}//delete L3 (new PLCcommand)
                case(6):{doDelete.push(vars[key][1]); break;}//delete L2
                case(7):{break;}//stable
            }
        });


        return({doDelete,toAdd,commands});

    }

    enforceFieldLevelConsistancy(vars: tripleMap):
     { toModify: paczkaInterface[]; commands: Operation[]; } {
         var toReturn:{ toModify: paczkaInterface[]; commands: Operation[]; } = {toModify:[],commands:[]};
        Object.keys(vars).map( key => {
        if(vars[key][0]!=null && vars[key][1]!=null && vars[key][2]!=null){//must be stable
            var iterable:paczkaInterface = {
                name:'',
                lPaczek:0,
                nrPaczki:0,
                nrSeryjny1:0,
                nrSeryjny2:0,
                nrSeryjny3:0,
                plcId:0,
                //dlugosc:0,
            }
            const temp1:paczkaInterface = resolverUtil.paczkaDeepCopy(vars[key][0]);
            const temp2:paczkaInterface = resolverUtil.paczkaDeepCopy(vars[key][1]);
            const temp3:paczkaInterface = resolverUtil.paczkaDeepCopy(vars[key][2]);
            
            var currentTripple:Array<paczkaInterface>=[temp1,temp2,temp3];
            Object.keys(iterable).map(fieldKey => {
                var L1 :any = (vars[key][0][fieldKey]==null||vars[key][0][fieldKey]=='')?("0"):(vars[key][0][fieldKey]?.toString()?.substring(0,15));
                var L2 :any = (vars[key][1][fieldKey]==null||vars[key][1][fieldKey]=='')?("0"):(vars[key][1][fieldKey]?.toString()?.substring(0,15));
                var L3 :any = (vars[key][2][fieldKey]==null||vars[key][2][fieldKey]=='')?("0"):(vars[key][2][fieldKey]?.toString()?.substring(0,15));
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
                      console.log('ABC -> B=C ');
                        //currentTripple[0][fieldKey]=currentTripple[1][fieldKey];
                        currentTripple[1][fieldKey]=currentTripple[2][fieldKey];
                    }
                } 
            });
            if(!ResolverUtil.comparePaczkas(vars[key][0], currentTripple[0])){
                toReturn.toModify.push(currentTripple[0]);
            }
            if(!ResolverUtil.comparePaczkas(vars[key][1], currentTripple[1])){
                toReturn.toModify.push(currentTripple[1]);
            }
            if(!ResolverUtil.comparePaczkas(vars[key][2], currentTripple[2])){
                //console.log('got here!');
                toReturn.commands.push(ResolverUtil.generatePaczkaCommandToModifyOnPLC(currentTripple[2]));
            }

        }
    })
    return toReturn;
    }

    async commitChanges():Promise<void>{
        return new Promise<void>(async (resolve, reject) => {
            //delete
            var localDelete: Array<string> = [];
            this.toDelete.forEach(toDelete => {
                localDelete.push(toDelete._id);
            });
            if(localDelete.length>0)
            try{await paczka.deleteMany({_id: {$in:localDelete}})}catch(e){console.log(e);}
            
            //add
            var localAdd: Array<any> = [];
            this.toAdd.forEach(toAdd =>{
                delete toAdd._id;
                localAdd.push(
                    new paczka({...toAdd})
                );
            });
            if(localAdd.length>0)
            try{await paczka.insertMany(localAdd)}catch(e){console.log(e);}

            //modify
            await Promise.all(this.toModify.map(async toModify =>{
                var currentId = toModify._id;
                delete toModify._id;
                
                try{await paczka.updateOne({_id: currentId},{...toModify})}catch(e){console.log(e);}      
            })).then(()=>{resolve();});
            
            
        });
    }




}

type tripleMap = { [key: string]: paczkaInterface[] };//0-ref,1-edit,2-incurred

export type variableDbObject = { [key: string]: variableInterface };

export type paczkaRecord = (Document<any, any, paczkaInterface> & paczkaInterface & { _id: Types.ObjectId })|paczkaInterface;

export type record = paczkaInterface;

export var PaczkaResolverSingleton = new PaczkaResolver();