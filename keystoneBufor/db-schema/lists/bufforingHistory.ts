import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Checkbox, Relationship, DateTimeUtc} from '@keystonejs/fields';

/*
These are going to be snapshots from bufforring
**/

const bufforingHistorySchema: any={
    fields:{    
        bufforedProduct:{label:"buffored Product", type: Relationship, isRequired: true, ref:"bufforedProduct"},

        time:{type: DateTimeUtc, isRequired: true},

        buffored1:{type:Integer,isRequired: false},//buffored = currently buffored
        buffored2:{type:Integer,isRequired: false},
        buffored3:{type:Integer,isRequired: false},

        delivered1:{type:Integer,isRequired: false},//delivered - how many arrived at the line and was taken
        delivered2:{type:Integer,isRequired: false},
        delivered3:{type:Integer,isRequired: false},
        
    },
    labelField:"bufforedProduct",
    adminConfig: {
        defaultColumns: ' bufforedProduct , buffored1',
      },
}

export default bufforingHistorySchema;