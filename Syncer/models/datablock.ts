import { Schema, model, Types } from 'mongoose';

export interface datablockInterface{
  
  name: String;
  ip: String;
  dbNumber: Number;
  dbNumber2: Number;
  
  
};

var datablockSchema = new Schema<datablockInterface>({

    name:{type: String , required: true},
    ip:{type: String, required: true},
    dbNumber:{type: Number, required: true},
    dbNumber2:{type: Number, required: true}
  
});


var datablock = model('datablock', datablockSchema);

export default datablock;
