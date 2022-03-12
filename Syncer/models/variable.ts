import { Schema, Types, model } from 'mongoose';

export interface variableInterface{
  
    name: string;
    datablock: any;
    offset: Number;
    offsetDecimal: Number;
    type: string;
    rwMode: string;
    value: string;
    valueToWrite: string;
    
  };

var variableSchema = new Schema<variableInterface>({
  
  name:{type: String , required: true},
  datablock:{type: Types.ObjectId, required: true},
  offset:{type: Number, required: true},
  offsetDecimal:{type: Number, required: false},
  type:{type: String, required: true},
  rwMode:{type: String, required: false},
  value:{type: String, required: false},
  valueToWrite:{type: String, required: false}
  
});

var variable = model('variable', variableSchema);

export default variable;