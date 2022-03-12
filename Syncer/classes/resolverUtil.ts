import type {operacjeInterface} from '../models/operationsPLC';
import type {paczkaInterface} from '../models/paczka'
import type {Operation} from './worker'
require('dotenv').config()

class ResolverUtil{


    generatePaczkaCommandToDeleteFromPLC(toDelete : paczkaInterface):Operation{
        
        var indexToDelete:number = Number.parseInt(toDelete?.enumerator?.substring(6,toDelete?.enumerator?.length));
        var operation :Operation = {
            name: 'PLC_DELETE: '+toDelete.name,
            datablock: {connect:{id:process.env.API_DB_ID}},
            operation: 'Paczki_DELETE',
            payload: JSON.stringify({...toDelete,plcId:indexToDelete}),
            status: 'Pending',
            timeSubmitted: Date.now().toString(),
        };
        
        return operation;

    }

    generatePaczkaCommandToCreateOnPLC(toAdd : paczkaInterface):Operation{

        toAdd.plcId = Number.parseInt(toAdd.enumerator.substring(6)); 
        var operation :Operation = {
            name: 'Paczki_CREATE: '+toAdd.name,
            datablock: {connect:{id:process.env.API_DB_ID}},
            operation: 'Paczki_CREATE',
            payload: JSON.stringify(toAdd),
            status: 'Pending',
            timeSubmitted: Date.now().toString(),
        };

        return operation;
    }

    generatePaczkaCommandToModifyOnPLC(toModify : paczkaInterface):Operation{
        var indexToModify:number = Number.parseInt(toModify?.enumerator?.substring(6,toModify?.enumerator?.length));
        var name:string = toModify?.name?(toModify?.name):('');
        var operation : Operation = {
            name: 'Paczki_UPDATE: '+toModify.name,
            datablock: {connect:{id:process.env.API_DB_ID}},
            operation: 'Paczki_UPDATE',
            payload: JSON.stringify({...toModify,plcId:indexToModify,name}),
            status: 'Pending',
            timeSubmitted: Date.now().toString(),
        };
        return operation;
    }

    comparePaczkas(paczka1:paczkaInterface,paczka2:paczkaInterface):Boolean{
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

    paczkaDeepCopy(source:paczkaInterface):paczkaInterface{
        var target:paczkaInterface={};
        var iterable:paczkaInterface = {
            _id:'',
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
        Object.keys(iterable).map(fieldKey => {
            target[fieldKey] = source[fieldKey];
        });
        return target;
    }

}

export default new ResolverUtil();