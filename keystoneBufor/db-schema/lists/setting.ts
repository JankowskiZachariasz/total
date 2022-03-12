import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Checkbox} from '@keystonejs/fields';

const settingSchema: any={

    fields:{

        settingName:{type:Text, isRequired: true},
        value:{type:Text, isRequired: false},
    },
    labelField:"settingName",
    adminConfig: {
        defaultColumns: 'settingName, value',
      },
    
}

export default settingSchema;