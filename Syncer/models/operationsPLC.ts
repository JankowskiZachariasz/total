import { Schema, Types, model } from 'mongoose';

export interface operacjeInterface{
  
        _id?: string;
        name?: string;
        datablock?: any|{ connect: {id: string} };
        operation?: string;
        timeSubmitted?: string;
        status?: string;
        payload?: string;
    
  };

var operacjeSchema = new Schema<operacjeInterface>({

    name: {type: String , required: true},
    datablock:{type: Types.ObjectId, required: true},
    operation: {type: String , required: true},
    timeSubmitted: {type: String , required: true},
    status: {type: String , required: true},
    payload: {type: String , required: true},
  
});

var operacje = model('operacjeplc', operacjeSchema);

export default operacje;