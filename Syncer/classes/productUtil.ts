import paczka, {paczkaInterface} from '../models/paczka';
import produkt, {produktInterface} from '../models/products';

class ProductUtil{

    
    //beginning of teh loop >> products -> paczkas
    public async productsToPaczkasTranslate():Promise<void>{
        return new Promise(async (resolve, reject)=>{
            var untouchedProducts = await this.retrieveProducts();
            var artificialPaczkas:Array<paczkaInterface> = this.unpackPaczkas(untouchedProducts);
            await this.resetModifiedFlags(untouchedProducts);
            var dbPaczkas:Array<paczkaInterface> = await this.retrievePaczkas();
            var changes:paczkaDiff = this.resolveDiffPaczkas(dbPaczkas,artificialPaczkas);
            await this.CommitPaczkas(changes);
            resolve();
        });
    }
    private async retrieveProducts():Promise<Array<produktInterface>>{
        return new Promise(async(resolve,reject)=>{
            try{
                var retrievedProducts = await produkt.find({toDelete:{$ne:true}}).exec();
                resolve(retrievedProducts)
            }
            catch(e){reject(e);}
        })
    }
    private unpackPaczkas(produkts:Array<produktInterface>):Array<paczkaInterface>{
        
        var resolvedInexes :Array<paczkaInterface> = [];
        var notYetResolvedIndexes :Array<paczkaInterface> = [];
        var indexesUsed = [];
        produkts.map(m=>{

            for(var pck=0;pck<3;pck++){
                var currentPlcID;
                var currentLength;
                switch(pck){
                    case(0):{
                        currentPlcID=m.plcId1;
                        currentLength=m.length1;
                        break;}
                    case(1):{
                        currentPlcID=m.plcId2;
                        currentLength=m.length2;
                        break;}
                    case(2):{
                        currentPlcID=m.plcId3;
                        currentLength=m.length3;
                        break;}
                }

                if(currentPlcID >0 && currentPlcID <= 400){
                    if(!indexesUsed.includes(currentPlcID)){
                        resolvedInexes.push({
                            enumerator:'paczka'+currentPlcID,
                            name:m.namePlc,
                            type:'DB_EDIT',
                            lPaczek:currentLength?(currentLength):0,
                            nrPaczki:pck+1,
                            nrSeryjny1:m.series1,
                            nrSeryjny2:m.series2,
                            nrSeryjny3:m.series3,
                            plcId:currentPlcID,
                            dlugosc:0,
                        });
                        indexesUsed.push(currentPlcID);
                    } 
                }
                else if(currentPlcID < 0){
                    notYetResolvedIndexes.push({
                        enumerator:'paczka',
                        name:m.namePlc,
                        type:'DB_EDIT',
                        lPaczek:currentLength?(currentLength):0,
                        nrPaczki:pck+1,
                        nrSeryjny1:m.series1,
                        nrSeryjny2:m.series2,
                        nrSeryjny3:m.series3,
                        plcId:null,
                        dlugosc:0,
                    });
                }
            }


        });
        //assign indexes
        for(var i =1;i<=400;i++){
            if(!(notYetResolvedIndexes.length>0)){
                break;
            }
            if(!indexesUsed.includes(i)){
                //popping time
                var toAssign = notYetResolvedIndexes.pop();
                toAssign.enumerator += i;
                toAssign.plcId = i;
                resolvedInexes.push(toAssign);
            }
        }


        return resolvedInexes;
    }
    private async resetModifiedFlags(produkts:Array<produktInterface>):Promise<void>{
        return new Promise(async (resolve,reject)=>{
            var toModifyArray:Array<produktInterface>=[];

          //console.log(produkts.length)
            produkts.forEach(element => {
                if(element.wasUpdatedByClient==true){
                    toModifyArray.push(element._doc);
                }
            });
          //console.log(toModifyArray.length)
            //modify
            await Promise.all(toModifyArray.map(async toModify =>{
                var currentId = toModify._id;
                toModify.wasUpdatedByClient = false;
                delete toModify._id;
                try{await produkt.updateOne({_id: currentId},{...toModify})}catch(e){console.log(e);}      
            })).then(()=>{resolve();});
        })
    }
    private resolveDiffPaczkas(dbPaczkas:Array<paczkaInterface>, artificialPaczkas:Array<paczkaInterface>):paczkaDiff{
        var toReturn:paczkaDiff={toAdd:[],toDelete:[],toModify:[]};
        var map: doubleMapPaczka = {};
        [...dbPaczkas,...artificialPaczkas].forEach(paczka => {
            var currentEnum = paczka.enumerator;
                if (!map.hasOwnProperty(currentEnum)) 
                    map[currentEnum] = [null,null];
                
                if(typeof paczka._id == 'undefined')
                    map[currentEnum][0]=paczka;
                else map[currentEnum][1]=paczka;
                
        });
        //DB_EDIT_A -> DB_EDIT
        Object.keys(map).map(async key => {
            var A:number = (map[key][0]==null)?(0):(1);
            var B:number = (map[key][1]==null)?(0):(1);
            var product:number = (A*2)+(B*1);
           
            switch(product){
                case(0):{break;}//an impossible case
                case(1):{toReturn.toDelete.push(map[key][1]); break;}//delete
                case(2):{toReturn.toAdd.push(map[key][0]); break;}//create
                case(3):{
                  //console.log(map[key][0].name!=map[key][1].name);
                  //console.log(map[key][0].lPaczek!=map[key][1].lPaczek);
                  //console.log(map[key][0].nrPaczki!=map[key][1].nrPaczki);
                  //console.log(map[key][0].nrSeryjny1!=map[key][1].nrSeryjny1);
                  //console.log(map[key][0].nrSeryjny2!=map[key][1].nrSeryjny2);
                  //console.log(map[key][0].nrSeryjny3!=map[key][1].nrSeryjny3);
                  //console.log(map[key][0].plcId!=map[key][1].plcId);
                  //console.log(map[key][0].dlugosc!=map[key][1].dlugosc);
                    if(//if there is any differance -> write 1bstract to DB_EDIT
                        map[key][0].name!=map[key][1].name||
                        map[key][0].lPaczek!=map[key][1].lPaczek||
                        map[key][0].nrPaczki!=map[key][1].nrPaczki||
                        map[key][0].nrSeryjny1!=map[key][1].nrSeryjny1||
                        map[key][0].nrSeryjny2!=map[key][1].nrSeryjny2||
                        map[key][0].nrSeryjny3!=map[key][1].nrSeryjny3||
                        map[key][0].plcId!=map[key][1].plcId||
                        map[key][0].dlugosc!=map[key][1].dlugosc
                    ){
                        var modifyToAdd = {...(map[key][0]), _id:map[key][1]._id};
                      //console.log('Modify to add: (START)')
                      //console.log(modifyToAdd);
                      //console.log('Modify to add: (END)')
                        toReturn.toModify.push(modifyToAdd); 
                    }
                    
                    
                    break;}//check and modify
            }
        });



        return toReturn;
    }
    private async CommitPaczkas(diff:paczkaDiff):Promise<void>{
        return new Promise(async (resolve,reject)=>{
            //delete
            var localDelete: Array<string> = [];
            diff.toDelete.forEach(toDelete => {
                localDelete.push(toDelete._id);
            });
            if(localDelete.length>0)
            try{await paczka.deleteMany({_id: {$in:localDelete}})}catch(e){console.log(e);}
            
            //add
            var localAdd: Array<any> = [];
            diff.toAdd.forEach(toAdd =>{
                delete toAdd._id;
                localAdd.push(
                    new paczka({...toAdd})
                );
            });
            if(localAdd.length>0)
            try{
                await paczka.insertMany(localAdd)
            }catch(e){
              //console.log(localAdd);
              //console.log(e);
            }

            //modify
            // await Promise.all(diff.toModify.map(async toModify =>{
            //     // console.log('[197]: to modify:')
            //     // console.log(toModify)
            //     var currentId = toModify._id;
            //     delete toModify._id;
            //     try{await paczka.replaceOne({_id: currentId},toModify, (err, doc)=>{console.log(doc);console.log(err);}).clone()}catch(e){console.log(e);}    
            // })).then(()=>{resolve();});
            try{

                await paczka.bulkWrite(diff.toModify.map(doc => ({
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

    //tripples processed, resolved and saved to db >> paczkas -> products
    public async updateProductsWithPaczkas():Promise<void>{
        return new Promise(async (resolve,reject)=>{
            var paczkas: Array<paczkaInterface> = await this.retrievePaczkas();
            var artifficialProdukts: Array<produktInterface> = this.buildProducts(paczkas);

            var untouchedProducts = await this.retrieveProducts();
            var changes: produktDiff = this.resolveDiffProductss(untouchedProducts, artifficialProdukts);
            await this.CommitProducts(changes);
            await this.deleteToDelete();
            resolve();
        });
    }
    public async retrievePaczkas():Promise<Array<paczkaInterface>>{
        return new Promise(async (resolve,reject)=>{
            try{
                var retrievedPaczkas = await paczka.find({ type: 'DB_EDIT'}).exec();
                resolve(retrievedPaczkas)
            }
            catch(e){reject(e);}
        })
    }
    private buildProducts(paczkas:Array<paczkaInterface>):Array<produktInterface>{
        var toReturn:Array<produktInterface>=[];
        var map: preProductMap = {};

        paczkas.forEach(element => {
            var s1 = element.nrSeryjny1?((element.nrSeryjny1?.toString()+'*****').substring(0,5)):('*****');
            var s2 = element.nrSeryjny2?((element.nrSeryjny2?.toString()+'*****').substring(0,5)):('*****');
            var s3 = element.nrSeryjny3?((element.nrSeryjny3?.toString()+'*****').substring(0,5)):('*****');
            var key = s1+s2+s3;

            if (!map.hasOwnProperty(key)) {map[key] = [null, null, null];}
            map[key][element.nrPaczki-1]=element;
        });

        Object.keys(map).map(async key => {
            var a:number = (map[key][0]?.plcId>0 && map[key][0]?.plcId<=400)?(1):(0);
            var b:number = (map[key][1]?.plcId>0 && map[key][1]?.plcId<=400)?(1):(0);
            var c:number = (map[key][2]?.plcId>0 && map[key][2]?.plcId<=400)?(1):(0);
            var notnullPaczka: paczkaInterface = map[key][0]?(map[key][0]):(map[key][1]?(map[key][1]):(map[key][2]));
          //console.log('Not null paczka:');
          //console.log(notnullPaczka);
            toReturn.push(
                {
                    namePlc:notnullPaczka?.name,
                    series1:notnullPaczka?.nrSeryjny1?(notnullPaczka?.nrSeryjny1>32767?(32767):(notnullPaczka?.nrSeryjny1<0?(0):(notnullPaczka?.nrSeryjny1))):(0),
                    series2:notnullPaczka?.nrSeryjny2?(notnullPaczka?.nrSeryjny2>32767?(32767):(notnullPaczka?.nrSeryjny2<0?(0):(notnullPaczka?.nrSeryjny2))):(0),
                    series3:notnullPaczka?.nrSeryjny3?(notnullPaczka?.nrSeryjny3>32767?(32767):(notnullPaczka?.nrSeryjny3<0?(0):(notnullPaczka?.nrSeryjny3))):(0),
                    count:a+b+c,
                    length1:map[key][0]?.lPaczek>32767?(32767):(map[key][0]?.lPaczek<0?(0):(map[key][0]?.lPaczek)),
                    length2:map[key][1]?.lPaczek>32767?(32767):(map[key][1]?.lPaczek<0?(0):(map[key][1]?.lPaczek)),
                    length3:map[key][2]?.lPaczek>32767?(32767):(map[key][2]?.lPaczek<0?(0):(map[key][2]?.lPaczek)),
                    plcId1:map[key][0]?.plcId,
                    plcId2:map[key][1]?.plcId,
                    plcId3:map[key][2]?.plcId,
                    toDelete:false,
                    wasUpdatedByClient:false,
                    name: notnullPaczka?.nrSeryjny1?.toString()+notnullPaczka?.nrSeryjny2?.toString()+notnullPaczka?.nrSeryjny3?.toString()
                    + ' '+notnullPaczka?.nrSeryjny1+'-'+notnullPaczka?.nrSeryjny2+'-'+notnullPaczka?.nrSeryjny3//hyphens
                    + ' '+notnullPaczka?.nrSeryjny1+' '+notnullPaczka?.nrSeryjny2+' '+notnullPaczka?.nrSeryjny3//spaces
                    + ' '+notnullPaczka?.name

                }
            )

        });

        return toReturn;
    }
    private resolveDiffProductss(dbProducts:Array<produktInterface>, artificialProducts:Array<produktInterface>):produktDiff{
        var toReturn:produktDiff={toAdd:[],toDelete:[],toModify:[]};
        var map: doubleMapProdukt = {};
        [...dbProducts,...artificialProducts].forEach(produkt => {
            var s1 = produkt.series1?((produkt.series1?.toString()+'*****').substring(0,5)):('*****');
            var s2 = produkt.series1?((produkt.series2?.toString()+'*****').substring(0,5)):('*****');
            var s3 = produkt.series1?((produkt.series3?.toString()+'*****').substring(0,5)):('*****');
            var key = s1+s2+s3;

            if (!map.hasOwnProperty(key)) {map[key] = [null, null];}
                
                if(typeof produkt._id == 'undefined')
                    map[key][0]=produkt;
                else map[key][1]=produkt;
                
        });

        //artificialProducts -> dbProducts
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
                         plcId1:null,plcId2:null,plcId3:null,
                         length1:null,length2:null,length3:null
                
                }); break;}//delete
                case(2):{toReturn.toAdd.push(map[key][0]); console.log(map[key][0]); break;}//create
                case(3):{
                    if(//if there is any differance -> write 1bstract to DB_EDIT

                        map[key][0].namePlc != map[key][1].namePlc||
                        map[key][0].series1 != map[key][1].series1||
                        map[key][0].series2 != map[key][1].series2||
                        map[key][0].series3 != map[key][1].series3||
                        map[key][0].count != map[key][1].count||
                        map[key][0].length1 != map[key][1].length1||
                        map[key][0].length2 != map[key][1].length2||
                        map[key][0].length3 != map[key][1].length3||
                        map[key][0].plcId1 != map[key][1].plcId1||
                        map[key][0].plcId2 != map[key][1].plcId2||
                        map[key][0].plcId3 != map[key][1].plcId3

                    ){
                        if(map[key][1].wasUpdatedByClient!=true)toReturn.toModify.push({...(map[key][0]), _id:map[key][1]._id}); 
                    }
                    break;}//check and modify
            }
        });




        return toReturn;
    }
    private async CommitProducts(diff:produktDiff):Promise<void>{
        return new Promise(async (resolve,reject)=>{
            //delete
            var localDelete: Array<string> = [];
            diff.toDelete.forEach(toDelete => {
                localDelete.push(toDelete._id);
            });
            if(localDelete.length>0)
            try{await produkt.deleteMany({_id: {$in:localDelete}})}catch(e){console.log(e);}
            
            //add
            var localAdd: Array<any> = [];
            diff.toAdd.forEach(toAdd =>{
                delete toAdd._id;
                localAdd.push(
                    new produkt({...toAdd})
                );
            });
            if(localAdd.length>0)
            try{await produkt.insertMany(localAdd)}catch(e){console.log(e);}

            //modify
            // await Promise.all(diff.toModify.map(async toModify =>{
            //     var currentId = toModify._id;
            //     delete toModify._id;
            //   //console.log('modifying')
            //   //console.log(toModify);
            //     try{await produkt.replaceOne({_id: currentId},toModify, (err, doc)=>{console.log(doc);console.log(err);}).clone()}catch(e){console.log(e);}      
            // })).then(()=>{resolve();});
            try{

                await produkt.bulkWrite(diff.toModify.map(doc => ({
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
    private async deleteToDelete():Promise<void>{
        return new Promise(async (resolve,reject)=>{
           
            produkt.deleteMany({'toDelete' : true}, function(err, result) {
            if (err) {
                console.log(err);
                reject();
            } else {
                resolve();
            }
            });
        
        })
    }

}
type preProductMap = { [key: string]: paczkaInterface[] };
type doubleMapPaczka = { [key: string]: paczkaInterface[] };
type doubleMapProdukt = { [key: string]: produktInterface[] };
type paczkaDiff = {toModify?:Array<paczkaInterface>,toAdd?:Array<paczkaInterface>,toDelete?:Array<paczkaInterface>};
type produktDiff = {toModify?:Array<produktInterface>,toAdd?:Array<produktInterface>,toDelete?:Array<produktInterface>};

export default ProductUtil;