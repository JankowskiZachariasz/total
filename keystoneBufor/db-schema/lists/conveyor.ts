import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Checkbox} from '@keystonejs/fields';

const conveyorSchema: any={
    fields:{
        plcId:{type:Integer,isRequired: true, isUnique: true},
        position:{type:Integer,isRequired: false},
        position0:{type:Checkbox,isRequired: false},
        position1:{type:Checkbox,isRequired: false},
        position2:{type:Checkbox,isRequired: false},
        position3:{type:Checkbox,isRequired: false},
        packageId:{type:Integer,isRequired: false},
        colorClicked:{label:"Color Clicked", type:Text,isRequired: false},
        colorRegular:{label:"Color Regular", type:Text,isRequired: false},

    },
    labelField:"plcId",
    adminConfig: {
        defaultColumns: 'plcId, position0, position1',
      },
    
}

export default conveyorSchema;