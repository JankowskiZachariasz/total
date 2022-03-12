import { Schema, model, Types } from 'mongoose';

export interface produktInterface{
  
    _id?:string,
    namePlc?:string,
    series1?:number,
    series2?:number,
    series3?:number,
    count?:number,
    length1?:number,
    length2?:number,
    length3?:number,
    plcId1?:number,
    plcId2?:number,
    plcId3?:number,
    toDelete?:Boolean,
    wasUpdatedByClient?:boolean,
    name?:string,
    _doc?:any
  
  
};

var produktSchema = new Schema<produktInterface>({

    namePlc:{type: String , required: false},
    series1:{type: Number, required: false},
    series2:{type: Number, required: false},
    series3:{type: Number, required: false},
    count:{type: Number, required: false},
    length1:{type: Number, required: false},
    length2:{type: Number, required: false},
    length3:{type: Number, required: false},
    plcId1:{type: Number, required: false},
    plcId2:{type: Number, required: false},
    plcId3:{type: Number, required: false},
    toDelete:{type: Boolean , required: false},
    wasUpdatedByClient:{type: Boolean , required: false},
    name:{type: String , required: false}
  
});


var produkt = model('product', produktSchema);

export default produkt;
