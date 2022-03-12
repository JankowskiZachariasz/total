require('dotenv').config()
var mongoose = require('mongoose');
import variable, {variableInterface } from './models/variable';
import datablock, {datablockInterface } from './models/datablock';
import Syncer from './classes/worker';
import { connections } from 'mongoose';
mongoose.connect(process.env.mongodbConnectionString,{ useUnifiedTopology: true, useNewUrlParser: true },async(err)=>{
    var syncer = new Syncer();
    try{
      await syncer.retrieveVariablesToSync();
      await syncer.buildConnections(syncer.PLCs);
    }
    catch(e){
      console.log(e);
    }
    
    
    setInterval(async()=>{
      console.log("tick");
      try{
        await syncer.tick();
      }
      catch(e){
        console.log(e);
      }
      console.log("tock");
    }, 10000);
});






// var db = new datablock();
// db.name = "mongoose";
// db.dbNumber = 2;
// db.ip = "moje ip";
// db.save().then((err)=>{

//     datablock.findOne({
//         name: "Produkty"
//       }).exec((err, datablock) => {console.log(datablock);});

// });
// datablock.find({}).exec((err, datablocks)=>{
//   //console.log(datablocks);
// })


// var variable1 = new variable();
// variable1.name ="LOLZ";

// name:{type: String , required: true},
// datablock:{type: Types.ObjectId, required: true},
// offset:{type: Number, required: true},
// type:{type: String, required: true},