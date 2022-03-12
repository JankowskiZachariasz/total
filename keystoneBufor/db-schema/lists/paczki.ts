import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Select} from '@keystonejs/fields';
import paczkiTriggerHandler, {keystoneAfterTriggerData} from '../../triggers/paczkiTriggerHandler'

const paczkiSchema: ListSchema={

    fields:{
        enumerator:{type:Text,isRequired: true},
        name:{type:Text,isRequired: false},
        type:{type: Select, isRequired: true,
            options:[
                {value:'PLC',label:'PLC'},
                {value:'DB_REF',label:'DB_REF'},
                {value:'DB_EDIT',label:'DB_EDIT'},
            ]
        }, 
        lPaczek:{type:Integer,isRequired: false},
        nrPaczki:{type:Integer,isRequired: false},
        nrSeryjny1:{type:Integer,isRequired: false},
        nrSeryjny2:{type:Integer,isRequired: false},
        nrSeryjny3:{type:Integer,isRequired: false},
        plcId:{type:Integer,isRequired: false},
        dlugosc:{type:Integer,isRequired: false},
    },
    labelField:"enumerator",
    adminConfig: {
        defaultColumns: 'enumerator, name, type, lPaczek',
    },
    // hooks: {
    //     async validateInput(props : any){
    //         if(props.operation=="create"){
    //             var result = await paczkiTriggerHandler.checkIfDuplicateExists(props);
    //             if(result==true) {
    //                 props.addFieldValidationError('Duplicate detected.')
    //             };
    //         }
    //         return props.resolvedData;
    //     },
    //     afterChange: (props) => {
    //         console.log('paczki triggers');
    //         paczkiTriggerHandler.onDataChange(props);
    //     },
    //     afterDelete : (props) => {
    //         console.log('paczki triggers');
    //         var transcodedObject: keystoneAfterTriggerData ={...props,updatedItem:props.existingItem,originalInput:props.existingItem};
    //         paczkiTriggerHandler.onDataChange(transcodedObject);
    //     }
    // }
    
}
export default paczkiSchema;