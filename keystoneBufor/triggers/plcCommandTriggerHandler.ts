class plcCommandTrigger {
  
    async validateStatus(props: keystoneValidateInputDataForFields) :Promise<Boolean>{
        return new Promise<Boolean>(async (resolve,reject)=>{
            if(//detecting Pending -> Success change
                props?.originalInput?.status=='Success'
                && props?.existingItem?.status=='Pending'
            ){
                var result = await this.checkIfCommandExecuted(props);
                resolve(result);
            }
            else{
                resolve(true);
            }
        }); 
    }
  
    async checkIfCommandExecuted(props: keystoneValidateInputDataForFields) :Promise<Boolean>{
        return new Promise<Boolean>(async (resolve,reject)=>{
            switch(props?.existingItem?.operation){
                case('Paczki_CREATE'):{resolve(await this.checkIfRecordCreated(props?.existingItem?.payload, props));break;}
                case('Paczki_UPDATE'):{resolve(await this.checkIfRecordModified(props?.existingItem?.payload, props));break;}
                case('Paczki_DELETE'):{resolve(await this.checkIfRecordDeleted(props?.existingItem?.payload, props));break;}
                default:resolve(true);break;
            }
        });
    }

    async checkIfRecordCreated(payloadToParse:any, props: keystoneValidateInputDataForFields) :Promise<Boolean>{
        return new Promise<Boolean>(async (resolve,reject)=>{
            var payload = JSON.parse(payloadToParse);
            console.log(payload.enumerator);
            var paczkasData = await props.context.executeGraphQL({
                context: props.context,
                query: `   
                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {
                    data: allPaczkas(where: { 
                      type: $recordType
                      enumerator: $enumerator
                    }) {
                        id
                    }
                }
                        `,
                variables: {
                    enumerator: payload.enumerator,
                    recordType: "PLC"
                  },
            });
            if(paczkasData?.data?.data?.length>0){
                resolve(true);
            }
            else{
                resolve(false);
            }



        });
    }

    async checkIfRecordDeleted(payloadToParse:any, props: keystoneValidateInputDataForFields) :Promise<Boolean>{
        return new Promise<Boolean>(async (resolve,reject)=>{
            var payload = JSON.parse(payloadToParse);
            var paczkasData = await props.context.executeGraphQL({
                context: props.context,
                query: `   
                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {
                    data: allPaczkas(where: { 
                      type: $recordType
                      enumerator: $enumerator
                    }) {
                        id
                    }
                }
                        `,
                variables: {
                    enumerator: payload.enumerator,
                    recordType: "PLC"
                  },
            });
            if(paczkasData?.data?.data?.length>0){
                resolve(false);      
            }
            else{
                resolve(true);
            }



        });
    }

    async checkIfRecordModified(payloadToParse:any, props: keystoneValidateInputDataForFields) :Promise<Boolean>{
        return new Promise<Boolean>(async (resolve,reject)=>{
            var payload = JSON.parse(payloadToParse);
            var paczkasData = await props.context.executeGraphQL({
                context: props.context,
                query: `   
                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {
                    data: allPaczkas(where: { 
                      type: $recordType
                      enumerator: $enumerator
                    }) {
                        name
                        lPaczek
                        nrPaczki
                        nrSeryjny1
                        nrSeryjny2
                        nrSeryjny3
                        plcId
                        dlugosc
                    }
                }
                        `,
                variables: {
                    enumerator: payload.enumerator,
                    recordType: "PLC"
                  },
            });
            if(paczkasData?.data?.data?.length>0){
                var objectToExamine = paczkasData?.data?.data[0];
                console.log(objectToExamine);
                console.log(payload);
                if(
                    (objectToExamine.name==payload.name||objectToExamine.name==(payload.name==null?(''):(payload.name)))&&
                    (objectToExamine.lPaczek==payload.lPaczek||objectToExamine.lPaczek==(payload.lPaczek==null?(0):(payload.lPaczek)))&&
                    (objectToExamine.nrPaczki==payload.nrPaczki||objectToExamine.nrPaczki==(payload.nrPaczki==null?(0):(payload.nrPaczki)))&&
                    (objectToExamine.nrSeryjny1==payload.nrSeryjny1||objectToExamine.nrSeryjny1==(payload.nrSeryjny1==null?(0):(payload.nrSeryjny1)))&&
                    (objectToExamine.nrSeryjny2==payload.nrSeryjny2||objectToExamine.nrSeryjny2==(payload.nrSeryjny2==null?(0):(payload.nrSeryjny2)))&&
                    (objectToExamine.nrSeryjny3==payload.nrSeryjny3||objectToExamine.nrSeryjny3==(payload.nrSeryjny3==null?(0):(payload.nrSeryjny3)))&&
                    (objectToExamine.plcId==payload.plcId||objectToExamine.plcId==(payload.plcId==null?(0):(payload.plcId)))&&
                    (objectToExamine.dlugosc==payload.dlugosc||objectToExamine.dlugosc==(payload.dlugosc==null?(0):(payload.dlugosc)))
                )
                resolve(true);
                else resolve(false);
            }
            else{
                resolve(false);
            }



        });
    }


  }

  export default new plcCommandTrigger();

  export interface keystoneValidateInputDataForFields {
    operation?: String;
    existingItem?: any;
    originalInput?: any;
    resolvedData?: any;
    context?: any;
    addFieldValidationError :any;
    listKey?: String;
    fieldPath?: String;
  }

