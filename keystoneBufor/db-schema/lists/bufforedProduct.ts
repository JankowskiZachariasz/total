import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Checkbox, Select} from '@keystonejs/fields';

const bufforedProductSchema: any={
    fields:{    
        name:{type:Text,isRequired: false},
        series1:{type:Integer,isRequired: false},
        series2:{type:Integer,isRequired: false},
        series3:{type:Integer,isRequired: false},

        count1:{type:Integer,isRequired: false},
        count2:{type:Integer,isRequired: false},
        count3:{type:Integer,isRequired: false},

        plcId1:{type:Integer,isRequired: false},
        plcId2:{type:Integer,isRequired: false},
        plcId3:{type:Integer,isRequired: false},

        buffored1:{type:Integer,isRequired: false},//buffored = currently buffored
        buffored2:{type:Integer,isRequired: false},
        buffored3:{type:Integer,isRequired: false},

        delivered1:{type:Integer,isRequired: false},//delivered - how many arrived at the line and was taken
        delivered2:{type:Integer,isRequired: false},
        delivered3:{type:Integer,isRequired: false},

        status:{type: Select, isRequired: true,
            options:[
                {value:'Current',label:'Na buforze'},
                {value:'History',label:'Historyczny'},
            ]
        },
        
    },
    labelField:"name",
    adminConfig: {
        defaultColumns: ' name , series1',
      },
}

export default bufforedProductSchema;