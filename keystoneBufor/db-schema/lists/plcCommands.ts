import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Select, DateTimeUtc, Relationship} from '@keystonejs/fields';
import plcCommandTrigger, {keystoneValidateInputDataForFields} from '../../triggers/plcCommandTriggerHandler';

const plcCommandSchema: ListSchema={

    fields:{
        name:{type: Text, isRequired: false},
        datablock:{label:"Datablock", type: Relationship, isRequired: true, ref:"datablock"},
        operation:{type: Select, isRequired: true,
            options:[
                {value:'Paczki_CREATE',label:'Paczki_CREATE'},
                {value:'Paczki_UPDATE',label:'Paczki_UPDATE'},
                {value:'Paczki_DELETE',label:'Paczki_DELETE'},
     
            ]
        },
        timeSubmitted:{type: DateTimeUtc, isRequired: true},
        status:{type: Select, isRequired: true,
            options:[
                {value:'Pending',label:'Pending'},
                {value:'Success',label:'Success'}
            ]
            // hooks: {
            //     async validateInput(props : any){
            //         console.log('plCommand triggers'+props?.existingItem?.operation);
            //         if(props.operation=="update"){
            //             var result = await plcCommandTrigger.validateStatus(props);
            //             if(!result) {
            //                 props.addFieldValidationError('Command did not take effect yet.')
            //             };
            //         }
            //         return props.resolvedData;
            //     },
        
            // }
        },
        payload:{type:Text,isRequired: true}
        
        
    },
    labelField:"name",
    adminConfig: {
        defaultColumns: 'name, timeSubmitted, status',
    },
    
    
}

export default plcCommandSchema;