import { ListSchema } from "@keystonejs/keystone";
import {Text, Integer, Checkbox} from '@keystonejs/fields';

const productSchema: ListSchema={
    fields:{    
        namePlc:{type:Text,isRequired: false},
        series1:{type:Integer,isRequired: false},
        series2:{type:Integer,isRequired: false},
        series3:{type:Integer,isRequired: false},
        count:{type:Integer,isRequired: false},
        length1:{type:Integer,isRequired: false},
        length2:{type:Integer,isRequired: false},
        length3:{type:Integer,isRequired: false},
        plcId1:{type:Integer,isRequired: false},
        plcId2:{type:Integer,isRequired: false},
        plcId3:{type:Integer,isRequired: false},
        toDelete:{type:Checkbox,isRequired: false},
        wasUpdatedByClient:{type:Checkbox,isRequired: false},
        name:{type:Text,isRequired: false},
        
    },
    labelField:"namePlc",
    adminConfig: {
        defaultColumns: ' name , series1',
      },
      access: {
        create: (props) => {return props.authentication.item.isAdmin;},
        read: (props) => {return props.authentication.item.id!=null;},
        update: (props) => {return props.authentication.item.isAdmin;},
        delete: (props) => {return props.authentication.item.isAdmin;},
      },
    hooks:{
    resolveInput: (props:any) => {
        return new Promise(async(resolve,reject)=>{

            if(props.originalInput.wasUpdatedByClient){
                var paczkasData = await props.context.executeGraphQL({
                    context: props.context,
                    query: `   
                    query MyQuerry($recordType : paczkaTypeType!) {
                        data: allPaczkas(where: { 
                          type: $recordType
                        }) {
                            enumerator
                        }
                    }
                            `,
                    variables: {recordType: 'DB_EDIT'},
                });
                var nextFreeIndex=-1;
                var usedIds = [];
                paczkasData.data.data.forEach(element => {
                    var currentId = Number.parseInt(element.enumerator.substring(6));
                    usedIds.push(currentId);
                });
                for(var i=1;i<1000;i++){
                    if(!usedIds.includes(i)){
                        nextFreeIndex=-i;
                        break;
                    }
                }
                if(props.originalInput.hasOwnProperty('plcId1')&&props.resolvedData.plcId1!=null)
                props.resolvedData.plcId1 = nextFreeIndex--;
                if(props.originalInput.hasOwnProperty('plcId2')&&props.resolvedData.plcId2!=null)
                props.resolvedData.plcId2 = nextFreeIndex--;
                if(props.originalInput.hasOwnProperty('plcId3')&&props.resolvedData.plcId3!=null)
                props.resolvedData.plcId3 = nextFreeIndex--;
    
            }
            

            //provisional paczkas counter
            var newPaczkasCount = 0;
            var assambledObject = {...props.existingItem,...props.resolvedData};
            if(assambledObject.plcId1?(true):(false))newPaczkasCount++;
            if(assambledObject.plcId2?(true):(false))newPaczkasCount++;
            if(assambledObject.plcId3?(true):(false))newPaczkasCount++;
            props.resolvedData.count = newPaczkasCount;
            //no null series
            props.resolvedData.series1 = assambledObject.series1?(assambledObject.series1>32767?(32767):(assambledObject.series1<0?(0):(assambledObject.series1))):(0);
            props.resolvedData.series2 = assambledObject.series2?(assambledObject.series2>32767?(32767):(assambledObject.series2<0?(0):(assambledObject.series2))):(0);
            props.resolvedData.series3 = assambledObject.series3?(assambledObject.series3>32767?(32767):(assambledObject.series3<0?(0):(assambledObject.series3))):(0);
            //populate tags
            props.resolvedData.name = props.resolvedData?.series1?.toString()+props.resolvedData?.series2?.toString()+props.resolvedData?.series3?.toString();
            props.resolvedData.name += ' '+props.resolvedData?.series1+'-'+props.resolvedData?.series2+'-'+props.resolvedData?.series3;//hyphens
            props.resolvedData.name += ' '+props.resolvedData?.series1+' '+props.resolvedData?.series2+' '+props.resolvedData?.series3;//spaces
            props.resolvedData.name += ' '+assambledObject?.namePlc;
            //enforce variable limits
            props.resolvedData.length1=assambledObject.length1>32767?(32767):(assambledObject.length1<0?(0):(assambledObject.length1));
            props.resolvedData.length2=assambledObject.length2>32767?(32767):(assambledObject.length2<0?(0):(assambledObject.length2));
            props.resolvedData.length3=assambledObject.length3>32767?(32767):(assambledObject.length3<0?(0):(assambledObject.length3));

            resolve(props.resolvedData);
        });
    },
    validateInput: (props:any):Promise<void> => {
        return new Promise(async(resolve,reject)=>{
            var assambledObject = {...(props.existingItem),...(props.resolvedData)};
            var variables = {
                series1:assambledObject.series1?(assambledObject.series1):(0),
                series2:assambledObject.series2?(assambledObject.series2):(0),
                series3:assambledObject.series3?(assambledObject.series3):(0),
                id:assambledObject?.id?(assambledObject?.id):('')
            };
            var duplicates = await props.context.executeGraphQL({
                context:props.context,
                query: `   
                query MyQuerry($series1:Int!,$series2:Int!,$series3:Int!,$id:ID!){
                    data: allProducts(
                      where:{
                        series1:$series1,
                        series2:$series2,
                        series3:$series3,
                        id_not:$id,
                        toDelete_not:true
                      }
                    ){id}
                  }               
                        `,
                variables,
            });
            if(duplicates?.data?.data?.length>0&&assambledObject.toDelete!=true){console.log('Detected Duplicates');reject('detected a duplicate')}
            else resolve();
        });
      },   
    } 
}

export default productSchema;