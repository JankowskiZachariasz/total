import { Schema, model, Types } from 'mongoose';

export interface conveyorInterface{
  
    _id?:string,
    plcId?:number,
    position0?:boolean,
    position1?:boolean,
    position2?:boolean,
    position3?:boolean,
    packageId?:number,
    colorClicked?:string,
    colorRegular?:string
  
  
};

var conveyorSchema = new Schema<conveyorInterface>({


    _id:{type: String , required: false},
    plcId:{type: Number , required: false},
    position0:{type: Boolean , required: false},
    position1:{type: Boolean , required: false},
    position2:{type: Boolean , required: false},
    position3:{type: Boolean , required: false},
    packageId:{type: Number , required: false},
    colorClicked:{type: String , required: false},
    colorRegular:{type: String , required: false}
  
  
});


var conveyor = model('conveyor', conveyorSchema);

export default conveyor;
