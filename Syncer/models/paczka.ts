import { Schema, model, Types } from 'mongoose';

export interface paczkaInterface{
  
    _id?:string,
    enumerator?:string,
    name?:string,
    type?:string,
    lPaczek?:number,
    nrPaczki?:number,
    nrSeryjny1?:number,
    nrSeryjny2?:number,
    nrSeryjny3?:number,
    plcId?:number,
    dlugosc?:number,
  
  
};

var paczkaSchema = new Schema<paczkaInterface>({

    enumerator:{type: String , required: true},
    name:{type: String , required: false},
    type:{type: String , required: false},
    lPaczek:{type: Number, required: false},
    nrPaczki:{type: Number, required: false},
    nrSeryjny1:{type: Number, required: false},
    nrSeryjny2:{type: Number, required: false},
    nrSeryjny3:{type: Number, required: false},
    plcId:{type: Number, required: false},
    dlugosc:{type: Number, required: false},
  
});


var paczka = model('paczka', paczkaSchema);

export default paczka;
