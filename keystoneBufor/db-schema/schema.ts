import {Keystone} from '@keystonejs/keystone'
import datablockSchema from './lists/datablock';
import variablekSchema from './lists/variable';
import paczkaSchema from './lists/paczki';
import plcCommandSchema from './lists/plcCommands';
import product from './lists/product';
import conveyor from './lists/conveyor';

import settingSchema from './lists/setting';
import bufforedProductSchema from './lists/bufforedProduct';
import bufforingHistorySchema from './lists/bufforingHistory';


export function applySchema(keystoneObject:Keystone){
    keystoneObject.createList('datablock',datablockSchema);
    keystoneObject.createList('variable',variablekSchema);
    keystoneObject.createList('paczka',paczkaSchema);
    keystoneObject.createList('operacjePLC',plcCommandSchema);
    keystoneObject.createList('product',product);
    keystoneObject.createList('conveyor',conveyor);

    //keystoneObject.createList('setting',settingSchema);
    keystoneObject.createList('bufforedProduct',bufforedProductSchema);
    //keystoneObject.createList('bufforingHistory',bufforingHistorySchema);
}

