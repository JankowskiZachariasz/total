import type { Model, Types, Document} from 'mongoose';
import type {Operation, localVariable} from './worker';
import paczka, {paczkaInterface} from '../models/paczka';
import variable, {variableInterface} from '../models/variable';
import {variableDbObject} from './onoToOneResolver';
import conveyor, {conveyorInterface} from '../models/conveyor';
import ResolverUtil, {packageColors} from './resolverUtil';


class ConveyorResolver{

    private variableMap : variableDbObject =null;

    private LastShifterState : shifterState = {};

    public async resolveConveyors(freshVariables:Array<localVariable>):Promise<void>{
        return new Promise<void>(async (resolve, reject) => {         
            try{
                if(this.variableMap==null)this.variableMap=this.translateVars(freshVariables);    
                var generatedConveyors: Array<conveyorInterface> = this.turnVariablesIntoConveyors(this.variableMap);
                await this.upsertConveyors(generatedConveyors);
                //count products
                //current products on the line
                
                resolve();
            }
            catch(e){reject(e);}
        })
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