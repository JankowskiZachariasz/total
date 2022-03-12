import { Schema, model, Types } from 'mongoose';

export interface bufforedProductInterface{
  
    _id?:string,
    name?:string,
    series1?:number,
    series2?:number,
    series3?:number,
    count1?:number,
    count2?:number,
    count3?:number,
    plcId1?:number,
    plcId2?:number,
    plcId3?:number,
    buffored1?:number,
    buffored2?:number,
    buffored3?:number,
    delivered1?:number,
    delivered2?:number,
    delivered3?:number,
    status?:string,
    _doc?:any,
  
  
};

var bufforedProductSchema = new Schema<bufforedProductInterface>({

    name:{type: String , required: false},
    series1:{type: Number, required: false},
    series2:{type: Number, required: false},
    series3:{type: Number, required: false},
    count1:{type: Number, required: false},
    count2:{type: Number, required: false},
    count3:{type: Number, required: false},
    plcId1:{type: Number, required: false},
    plcId2:{type: Number, required: false},
    plcId3:{type: Number, required: false},
    buffored1:{type: Number, required: false},
    buffored2:{type: Number, required: false},
    buffored3:{type: Number, required: false},
    delivered1:{type: Number, required: false},
    delivered2:{type: Number, required: false},
    delivered3:{type: Number, required: false},
    status:{type: String , required: false},
  
});


var bufforedProduct = model('bufforedProduct', bufforedProductSchema);

export default bufforedProduct;
