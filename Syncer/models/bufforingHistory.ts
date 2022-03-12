import { Schema, model, Types } from 'mongoose';

export interface bufforingHistoryInterface{
  
    _id?:string,
    bufforedProduct?:any,
    time?:string,
    buffored1?:number,
    buffored2?:number,
    buffored3?:number,
    delivered1?:number,
    delivered2?:number,
    delivered3?:number,
  
  
};

var bufforingHistorySchema = new Schema<bufforingHistoryInterface>({


    bufforedProduct:{type: Types.ObjectId, required: true},
    time:{type: String , required: false},
    buffored1:{type: Number, required: false},
    buffored2:{type: Number, required: false},
    buffored3:{type: Number, required: false},
    delivered1:{type: Number, required: false},
    delivered2:{type: Number, required: false},
    delivered3:{type: Number, required: false},
  
});


var bufforingHistory = model('bufforingHistory', bufforingHistorySchema);

export default bufforingHistory;
