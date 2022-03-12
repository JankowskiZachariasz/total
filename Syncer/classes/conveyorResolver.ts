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
                //Create buffored products using (generated Conveyors + DB_REF for packages (the most stable version))
                console.log('getting to this point');
                var productUiResolver = new ProductUtil();
                var paczkas: Array<paczkaInterface> = await productUiResolver.retrievePaczkas();
                console.log(paczkas);
                var paczkasMap = this.mapPaczkas(paczkas);
                console.log(paczkasMap);
                var bufforedproducts = this.generateBufforedProducts(paczkasMap, generatedConveyors);
                console.log(bufforedproducts);


                resolve();
            }
            catch(e){reject(e);}
        })
    }


    private generateBufforedProducts(paczkas: paczkaInfoMap, conveyors:Array<conveyorInterface>): Array<bufforedProductInterface>{

        var toReturn:  Array<bufforedProductInterface> = [];
        var tempProductmap: produktMap = {};
        conveyors.forEach(element => {

            var plcId = element.plcId?(element.plcId):(0);

            var podkladyQuantity:number = 
            (element.position0?(1):(0))
            +(element.position1?(1):(0))
            +(element.position2?(1):(0))
            +(element.position3?(1):(0));

            var series1:any = paczkas?(paczkas[plcId]?(paczkas[plcId]?.nrSeryjny1):('')):(''); 
            var series2:any = paczkas?(paczkas[plcId]?(paczkas[plcId]?.nrSeryjny2):('')):(''); 
            var series3:any = paczkas?(paczkas[plcId]?(paczkas[plcId]?.nrSeryjny3):('')):(''); 

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

                newBufforedProduct.delivered1 = 0;
                newBufforedProduct.delivered2 = 0;
                newBufforedProduct.delivered3 = 0;

                tempProductmap[key] = newBufforedProduct;
            }
            
            //increment whatever you need
            switch(paczkas[plcId]?.nrPaczki){
                case(1):{ tempProductmap[key].buffored1 += podkladyQuantity; break;}
                case(2):{ tempProductmap[key].buffored2 += podkladyQuantity; break;}
                case(3):{ tempProductmap[key].buffored3 += podkladyQuantity; break;}
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