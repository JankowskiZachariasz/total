import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer} from '@keystonejs/fields';

const datablockSchema: ListSchema={
    fields:{
        name:{type:Text,isRequired: true},
        ip:{label:"PLC IP", type:Text,isRequired: true},
        dbNumber:{type:Integer,isRequired: true}
    },
    labelField:"name",
    adminConfig: {
        defaultColumns: 'name, ip, dbNumber',
      },
    
}
export default datablockSchema;