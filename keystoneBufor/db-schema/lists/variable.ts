import { ListSchema } from "@keystonejs/keystone";
import {Text, Select, Relationship, Integer} from '@keystonejs/fields';
import paczkaTrigger, {keystoneBeforeTriggerData} from '../../triggers/variablePaczkaTriggers';

const variablekSchema: ListSchema={
    fields:{
        name:{type: Text, isRequired: true, isUnique: true},
        datablock:{label:"Datablock", type: Relationship, isRequired: true, ref:"datablock"},
        offset:{type: Integer, isRequired: true},
        offsetDecimal:{label:"Offset Decimal", type: Integer, isRequired: false, defaultValue:()=>{return 0;}},
        type:{type: Select, isRequired: true,
            options:[
                {value:'S',label:'String'},
                {value:'INT',label:'Integer'},
                {value:'DI',label:'DInt'},
                {value:'X',label:'Bit'},
                {value:'B',label:'Byte'},
            ]
        },
        rwMode:{label:"Read/Write mode", type: Select, isRequired: true,
            options:[
                {value:'Read',label:'Read'},
                {value:'ReadWrite',label:'Read/Write'},
            ]
        },
        value:{type: Text, isRequired: false},       
        valueToWrite:{label:"Value to write", type:Text, isRequired: false},
        
    },
    labelField:"name",
    adminConfig: {defaultColumns: 'name, datablock, rwMode'},
    // hooks: {
    //     beforeChange: (props:keystoneBeforeTriggerData)=>{
    //         console.log('executing variable before triggers');
    //         if(props.operation=="update"){
    //             Object.assign(props.existingItem, props.resolvedData);
    //             switch(props.existingItem.name.substring(0,4)){
    //                 case('pacz'):{ 
    //                     paczkaTrigger.beforeTriggerHandler(props);
    //                     break;  
    //                 }
    
    //             }
    //         }
    //         return props.resolvedData;},
    //     async afterChange(props){
    //         console.log('executing variable after triggers');
    //         var updatedItem = props?.updatedItem;
    //         switch(updatedItem?.name?.substring(0,4)){
    //             case('pacz'):{
    //                 await paczkaTrigger.afterTriggerHandler(props);
    //                 break;}
    //         }
    //     },
    // }
}
export default variablekSchema;

