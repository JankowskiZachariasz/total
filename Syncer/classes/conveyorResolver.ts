import type { Model, Types, Document} from 'mongoose';
import type {Operation, localVariable} from './worker';
import paczka, {paczkaInterface} from '../models/paczka';
import variable, {variableInterface} from '../models/variable';
import {variableDbObject} from './onoToOneResolver';
import conveyor, {conveyorInterface} from '../models/conveyor';
import ResolverUtil, {packageColors} from './resolverUtil';
import ProductUtil from './productUtil';
import bufforedProduct, {bufforedProductInterface} from '../models/bufforedProduct'
import { forEachChild } from 'typescript';


class ConveyorResolver{

    private variableMap : variableDbObject =null;

    private LastShifterState : shifterState = {};

    public async resolveConveyors(freshVariables:Array<localVariable>):Promise<void>{
        return new Promise<void>(async (resolve, reject) => {         
            try{
                if(this.variableMap==null)this.variableMap=this.translateVars(freshVariables);    
                var generatedConveyors: Array<conveyorInterface> = this.turnVariablesIntoConveyors(this.variableMap);
                try{await this.upsertConveyors(generatedConveyors);}catch(e){console.log(e)}
                var productUiResolver = new ProductUtil();
                var paczkas: Array<paczkaInterface> = await productUiResolver.retrievePaczkas();
                var paczkasMap = this.mapPaczkas(paczkas);
                var artificcialBufforedproducts = this.generateBufforedProducts(paczkasMap, generatedConveyors);
                var retrievedBufforedProducts = await this.retrieveBufforedProducts();
                var diff = this.bufforedProductFindDiff(artificcialBufforedproducts, retrievedBufforedProducts);
                this.CommitbufforedProductDiff(diff);


                resolve();
            }
            catch(e){reject(e);}
        })
    }

    private async CommitbufforedProductDiff(diff: bufforedProductDiff):Promise<void>{
        return new Promise(async (resolve,reject)=>{
            //delete
            var localDelete: Array<string> = [];
            diff.toDelete.forEach(toDelete => {
                localDelete.push(toDelete._id);
            });
            if(localDelete.length>0)
            try{await bufforedProduct.deleteMany({_id: {$in:localDelete}})}catch(e){console.log(e);}
            
            //add
            var localAdd: Array<any> = [];
            diff.toAdd.forEach(toAdd =>{
                delete toAdd._id;
                localAdd.push(
                    new bufforedProduct({...toAdd})
                );
            });
            if(localAdd.length>0)
            try{await bufforedProduct.insertMany(localAdd)}catch(e){console.log(e);}

            //modify
            // await Promise.all(diff.toModify.map(async toModify =>{
            //     var currentId = toModify._id;
            //     delete toModify._id;
            //   //console.log('modifying')
            //   //console.log(toModify);
            //     try{await produkt.replaceOne({_id: currentId},toModify, (err, doc)=>{console.log(doc);console.log(err);}).clone()}catch(e){console.log(e);}      
            // })).then(()=>{resolve();});
            try{

                await bufforedProduct.bulkWrite(diff.toModify.map(doc => ({
                    'updateOne': {
                        'filter': { '_id': doc._id },
                        'update': { '$set': doc },
                        'upsert': true,
                        }
                })))
                resolve();

                
            }
            catch(err){console.log(err); reject(err);}
        })
    }

    private bufforedProductFindDiff(artificial:Array<bufforedProductInterface>, existing: Array<bufforedProductInterface>):bufforedProductDiff{
        var toReturn : bufforedProductDiff ={toAdd:[],toDelete:[],toModify:[]};
        var map : bufforedProductDoubleMap = {};

        [...artificial,...existing].forEach(produkt => {
            var s1 = produkt.series1?((produkt.series1?.toString()+'*****').substring(0,5)):('*****');
            var s2 = produkt.series1?((produkt.series2?.toString()+'*****').substring(0,5)):('*****');
            var s3 = produkt.series1?((produkt.series3?.toString()+'*****').substring(0,5)):('*****');
            var key = s1+s2+s3;

            if (!map.hasOwnProperty(key)) {map[key] = [null, null];}
                
                if(typeof produkt._id == 'undefined')
                    map[key][0]=produkt;//inderx 0 - artificial
                else map[key][1]=produkt;
                
        });

        //artificialBufforedProducts -> dbBufforedProducts
        Object.keys(map).map(async key => {
            var A:number = (map[key][0]==null)?(0):(1);
            var B:number = (map[key][1]==null)?(0):(1);
            var product:number = (A*2)+(B*1);
            //console.log(product);
            switch(product){
                case(0):{break;}//an impossible case
                case(1):{toReturn.toModify.push(
                    {...(map[key][1]._doc),
                            _id:map[key][1]._id,
                            status: 'History'
                
                }); break;}//delete
                case(2):{toReturn.toAdd.push(map[key][0]); console.log(map[key][0]); break;}//create
                case(3):{
                    if(//if there is any differance -> write 1bstract to DB_EDIT

                        map[key][0].name != map[key][1].name||
                        map[key][0].series1 != map[key][1].series1||
                        map[key][0].series2 != map[key][1].series2||
                        map[key][0].series3 != map[key][1].series3||
                        map[key][0].count1 != map[key][1].count1||
                        map[key][0].count2 != map[key][1].count2||
                        map[key][0].count3 != map[key][1].count3||
                        map[key][0].plcId1 != map[key][1].plcId1||
                        map[key][0].plcId2 != map[key][1].plcId2||
                        map[key][0].plcId3 != map[key][1].plcId3||
                        map[key][0].buffored1 != map[key][1].buffored1||
                        map[key][0].buffored2 != map[key][1].buffored2||
                        map[key][0].buffored3 != map[key][1].buffored3||
                        map[key][0].delivered1 != map[key][1].delivered1||
                        map[key][0].delivered2 != map[key][1].delivered2||
                        map[key][0].delivered3 != map[key][1].delivered3||
                        map[key][0].status != map[key][1].status

                    ){
                        toReturn.toModify.push({...(map[key][0]), _id:map[key][1]._id}); 
                    }
                    break;}//check and modify
            }
        });
        

        return toReturn;
    }

    private async retrieveBufforedProducts():Promise<Array<bufforedProductInterface>>{
        return new Promise(async (resolve,reject)=>{
            try{
                var retrievedBufforedProducts = await bufforedProduct.find({status: 'Current'}).exec();
                resolve(retrievedBufforedProducts)
            }
            catch(e){reject(e);}
        })
    }

    private generateBufforedProducts(paczkas: paczkaInfoMap, conveyors:Array<conveyorInterface>): Array<bufforedProductInterface>{

        var toReturn:  Array<bufforedProductInterface> = [];
        var tempProductmap: produktMap = {};
        conveyors.forEach(element => {

            var plcId = element.packageId?(element.packageId):(0);

            var podkladyQuantity:number = 
            (element.position0?(1):(0))
            +(element.position1?(1):(0))
            +(element.position2?(1):(0))
            +(element.position3?(1):(0));

            var paczka = paczkas.hasOwnProperty(plcId)?(paczkas[plcId]):(null);
            var series1:any = paczka?(paczka.nrSeryjny1):('');
            var series2:any = paczka?(paczka.nrSeryjny2):('');
            var series3:any = paczka?(paczka.nrSeryjny3):('');

            var s1 = series1?((series1.toString()+'*****').substring(0,5)):('*****');
            var s2 = series2?((series2.toString()+'*****').substring(0,5)):('*****');
            var s3 = series3?((series3.toString()+'*****').substring(0,5)):('*****');
            var key = s1+s2+s3;

            //make sure the product exists
            if (!tempProductmap.hasOwnProperty(key)) {
                
                var newBufforedProduct : bufforedProductInterface = {};
                newBufforedProduct.series1 =series1;
                newBufforedProduct.series2 =series2;
                newBufforedProduct.series3 =series3;

                //set initial 0s, tbh we only need buffored counter
                newBufforedProduct.buffored1 = 0;
                newBufforedProduct.buffored2 = 0;
                newBufforedProduct.buffored3 = 0;

                newBufforedProduct.plcId1 = 0;
                newBufforedProduct.plcId2 = 0;
                newBufforedProduct.plcId3 = 0;

                newBufforedProduct.delivered1 = 0;
                newBufforedProduct.delivered2 = 0;
                newBufforedProduct.delivered3 = 0;

                newBufforedProduct.status = 'Current';

                newBufforedProduct.name = paczka?.name;
                if(series1!=''||series2!=''||series3!='')
                tempProductmap[key] = newBufforedProduct;
            }
            
            //increment whatever you need
            switch(paczkas[plcId]?.nrPaczki){
                case(1):{ tempProductmap[key].buffored1 += podkladyQuantity; tempProductmap[key].plcId1 = plcId; tempProductmap[key].count1 = paczkas[plcId]?.lPaczek; break;}
                case(2):{ tempProductmap[key].buffored2 += podkladyQuantity; tempProductmap[key].plcId2 = plcId; tempProductmap[key].count2 = paczkas[plcId]?.lPaczek; break;}
                case(3):{ tempProductmap[key].buffored3 += podkladyQuantity; tempProductmap[key].plcId3 = plcId; tempProductmap[key].count3 = paczkas[plcId]?.lPaczek; break;}
            }

        });

        Object.keys(tempProductmap).forEach(key => {
            toReturn.push(tempProductmap[key]);
        });
       
        return toReturn; 

    }

    private mapPaczkas(inputPaczkas: Array<paczkaInterface> ):paczkaInfoMap{

        var toReturn : paczkaInfoMap = {};
        inputPaczkas.forEach(e => {
            if(!toReturn.hasOwnProperty(e.plcId)){
                toReturn[e.plcId]=e;
            }
        });

        return toReturn;
    }

    private translateVars(vars:Array<localVariable>):variableDbObject{
        var toReturn: variableDbObject={};
        vars.map(m=>{
            if(m.variableRef.name.substring(0,4)=='conv'){
                toReturn[m.variableRef.name]=m.variableRef;
            }
        });
        return toReturn;
    }
    
    private turnVariablesIntoConveyors(vars: variableDbObject): Array<conveyorInterface> {
        

        // console.log(Object.keys(vars));

        var toReturn : conveyorInterface[] = [];
        var index: number =-1;
        do{
            index++;
            var numberOfPallets = vars['conveyor'+index+'v2']?.value;
            var numberOfPalletsProcessed = isNaN(Number.parseInt(numberOfPallets))?(0):(Number.parseInt(numberOfPallets));
            var packageId = vars['conveyor'+index+'v1']?.value;
            var packageIdProcessed = isNaN(Number.parseInt(packageId))?(0):(Number.parseInt(packageId));
            var colors:packageColors = ResolverUtil.getColorsForPackageId(packageId);

            var conveyor: conveyorInterface = {
                plcId:index,
                position0:numberOfPalletsProcessed>0,
                position1:numberOfPalletsProcessed>1,
                position2:numberOfPalletsProcessed>2,
                position3:numberOfPalletsProcessed>3,
                packageId:packageIdProcessed,
                colorRegular:colors!=null?(colors.color1):(null),
                colorClicked:colors!=null?(colors.color2):(null),
                
            };
            toReturn.push(conveyor);


        }while(typeof vars['conveyor'+(index+1)+'v1'] != 'undefined');



        return toReturn;
    }

    private async upsertConveyors(inputArray: Array<conveyorInterface>): Promise<void>{
        return new Promise<void>(async (resolve, reject) => {         
            try{

                await conveyor.bulkWrite(inputArray.map(doc => ({
                    'updateOne': {
                        'filter': { 'plcId': doc.plcId },
                        'update': { '$set': doc },
                        'upsert': true,
                        }
                })))
                resolve();

                
            }
            catch(err){console.log(err); reject(err);}
        })
    }


}

export var ConveyorResolverSingleton = new ConveyorResolver();

type shifterState = {plcId1? : string, plcId2? : string, plcId3? : string};

type paczkaInfoMap = { [key: string]: paczkaInterface };

type produktMap = { [key: string]: bufforedProductInterface };

type bufforedProductDoubleMap =  { [key: string]: bufforedProductInterface[] };

type bufforedProductDiff = {toModify?:Array<bufforedProductInterface>,toAdd?:Array<bufforedProductInterface>,toDelete?:Array<bufforedProductInterface>};