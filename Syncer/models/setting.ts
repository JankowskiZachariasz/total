import { Schema, model, Types } from 'mongoose';

export interface settingInterface{
  
    _id?:string,
    settingName?:string,
    value?:string,
  
};

var settingSchema = new Schema<settingInterface>({


    settingName:{type: String , required: false},
    value:{type: String , required: false},

});


var setting = model('setting', settingSchema);

export default setting;
