class PaczkaTrigger {
  bulkSilo:Array<keystoneBeforeTriggerData>=[];

  beforeTriggerHandler(props: keystoneBeforeTriggerData) {
      this.bulkSilo.push(props);
  }

  async afterTriggerHandler(props: keystoneAfterTriggerData): Promise<void> {
    return new Promise<void>(async (resolve,reject)=>{
      if(this.bulkSilo.length>0)
    await this.executeUpdatesInBulk(
      props.context,
      this.bulkSilo
    );
    this.bulkSilo = [];
    resolve();
    });
  }

  async fetchPLCPaczkasFromPLC(apolloContext: any,namesToFetch:Array<String>): Promise<any> {
    return new Promise<any>(async (resolve,reject)=>{
      
      var paczkasData = await apolloContext.executeGraphQL({
        context: apolloContext,
        query: `   query MyQuerry($namesToFetch: [String]!, $type: paczkaTypeType!) {
                  data: allPaczkas(where: { enumerator_in: $namesToFetch, type: $type}) {
                    id
                    enumerator
                    name
                    type
                    lPaczek
                    nrPaczki
                    nrSeryjny1
                    nrSeryjny2
                    nrSeryjny3
                    plcId
                    dlugosc
                  }
                }`,
        variables: { namesToFetch, type:'PLC' },
      });
    resolve(paczkasData);
    });
  } 

  async fetchVariables(apolloContext: any,variableNamesToFetch:Array<String>): Promise<any> {
    return new Promise<any>(async (resolve,reject)=>{
      var variableData = await apolloContext.executeGraphQL({
        context: apolloContext,
        query: `   query MyQuerry($variableNamesToFetch: [String]!) {
                  data: allVariables(
                    where:{name_in:$variableNamesToFetch}
                  ) {
                    name
                    value  
                  }
                }`,
        variables: { variableNamesToFetch },
      });
    resolve(variableData);
    });
  } 

  async executeUpdatesInBulk(
    apolloContext: any,
    newData: Array<keystoneBeforeTriggerData>
  ) : Promise<void> {
    return new Promise<void>(async (resolve,reject)=>{
      console.log('variablePaczkaTriggers.ts [22]: Executing update in bulk with '+newData.length+' records.');


    var namesToFetch: Array<String> = new Array();
    var variableNamesToFetch: Array<String> = new Array();

    newData.forEach((element) => {
      var name: String = element.existingItem.name.toString();
      name = name.substring(0, name.lastIndexOf("v"));
      namesToFetch.push(name);
      console.log(name);
      //all variables should be avialable
      for (var i = 1; i <= 8; i++) {
        variableNamesToFetch.push(name + "v" + i);
      }
    });
    

    //fetching PLC paczaks from Db 
    var paczkasData = await this.fetchPLCPaczkasFromPLC(apolloContext,namesToFetch);
    //transforming retrieved paczakas into map
    var retrievedPaczaks: PaczkaDbObject = {};
    paczkasData?.data?.data.forEach((retrievedElement: PaczkaDb) => {
      retrievedPaczaks[retrievedElement.enumerator.toString()] = retrievedElement;
    });
    //fetching all variables from associated Paczkas
    //this is really a precaution
    var variableData = await this.fetchVariables(apolloContext,variableNamesToFetch);

    var relatedPlcVariables: Array<any> = variableData?.data?.data;
    var incurredPaczaks: PaczkaDbObject = {};

    //build records from variables
    relatedPlcVariables.forEach((variable) => {
      let name: String = variable?.name;
      let paczkaName = variable?.name.substring(
        0,
        variable?.name.lastIndexOf("v")
      );
      let whichVariable = Number.parseInt(
        name.substring(name.lastIndexOf("v") + 1, name.length)
      );
      let value = variable?.value;

      if (!incurredPaczaks.hasOwnProperty(paczkaName)) {
        var newEmptyPaczka: PaczkaDb = { type: "PLC", enumerator: paczkaName };
        incurredPaczaks[paczkaName] = newEmptyPaczka;
      }

      switch (whichVariable) {
        case 1: {
          incurredPaczaks[paczkaName].name = value;
          break;
        }
        case 2: {
          incurredPaczaks[paczkaName].lPaczek = Number.parseInt(value);
          break;
        }
        case 3: {
          incurredPaczaks[paczkaName].nrPaczki = Number.parseInt(value);
          break;
        }
        case 4: {
          incurredPaczaks[paczkaName].nrSeryjny1 = Number.parseInt(value);
          break;
        }
        case 5: {
          incurredPaczaks[paczkaName].nrSeryjny2 = Number.parseInt(value);
          break;
        }
        case 6: {
          incurredPaczaks[paczkaName].nrSeryjny3 = Number.parseInt(value);
          break;
        }
        case 7: {
          incurredPaczaks[paczkaName].plcId = Number.parseInt(value);
          break;
        }
        case 8: {
          incurredPaczaks[paczkaName].dlugosc = Number.parseInt(value);
          break;
        }
      }
    });

    var addPaczaks: PaczkaDbObjectForCreation = [];
    var deletePaczaks: Array<String> = [];
    var modifyPaczaks: PaczkaDbObjectForUpdate = [];

    //find deltas
    Object.keys(incurredPaczaks).forEach((element) => {

      var incurredPaczka = incurredPaczaks[element];
      var retrievedPaczka = retrievedPaczaks[element];
      console.log(incurredPaczka);
      console.log(retrievedPaczka);

      //add to db
      if(incurredPaczka.plcId != 0 && !retrievedPaczka){
        addPaczaks.push({data: incurredPaczka});
      }
      //delete from db
      else if((incurredPaczka.plcId == 0) && retrievedPaczka != null){
        deletePaczaks.push(retrievedPaczka.id);
        Object.keys(retrievedPaczaks).forEach(element => {
          console.log(retrievedPaczaks[element].type);
        });
      }
      //modified paczka
      else if(
        (incurredPaczka && retrievedPaczka)
            &&
        (retrievedPaczka.enumerator != incurredPaczka.enumerator||
        retrievedPaczka.name != incurredPaczka.name.toString()||
        retrievedPaczka.type != incurredPaczka.type.toString()||
        retrievedPaczka.lPaczek != incurredPaczka.lPaczek||
        retrievedPaczka.nrPaczki != incurredPaczka.nrPaczki||
        retrievedPaczka.nrSeryjny1 != incurredPaczka.nrSeryjny1||
        retrievedPaczka.nrSeryjny2 != incurredPaczka.nrSeryjny2||
        retrievedPaczka.nrSeryjny3 != incurredPaczka.nrSeryjny3||
        retrievedPaczka.plcId != incurredPaczka.plcId||
        retrievedPaczka.dlugosc != incurredPaczka.dlugosc)
      ){
        modifyPaczaks.push({data: incurredPaczka, id:retrievedPaczka.id});
      }
    });   
    console.log('addPaczaks')
    console.log(addPaczaks);
    console.log('deletePaczaks')
    console.log(deletePaczaks);
    console.log('modifyPaczaks')
    console.log(modifyPaczaks);
    try{await this.createPaczkas(addPaczaks, apolloContext);}catch(e){console.log(e)}
    console.log('11111s')
    try{await this.deletePaczkas(deletePaczaks, apolloContext);}catch(e){console.log(e)}
    console.log('222222s')
    try{await this.updatePaczkas(modifyPaczaks, apolloContext);}catch(e){console.log(e)}
    console.log('333333s')
    resolve();
  }); 
  }

  async createPaczkas(paczaks:PaczkaDbObjectForCreation, apolloContext:any): Promise<void> {
    return new Promise<void>(async (resolve,reject)=>{
    if(paczaks?.length>0){
      var result = await apolloContext.executeGraphQL({
        context: apolloContext,
        query: `   mutation MyMutation($newPaczaks: [PaczkasCreateInput]!){
                    createPaczkas( data: $newPaczaks){id}
                }`,
        variables: { newPaczaks: paczaks},
      });
    if(result.errors){reject(result.errors);}
    resolve();
    }
    else resolve();
  });
  }

  async deletePaczkas(paczaks:Array<String>, apolloContext:any): Promise<void>  {
    return new Promise<void>(async (resolve,reject)=>{
    if(paczaks?.length>0){
      var result = await apolloContext.executeGraphQL({
        context: apolloContext,
        query: `   mutation MyMutation($ids: [ID!]){
                    deletePaczkas(
                    ids: $ids
                    ){id}
                }`,
        variables: { ids: paczaks},
      });
    if(result.errors){reject(result.errors);}
    resolve();
    }
    else resolve();
  });
  }

  async updatePaczkas(paczaks:PaczkaDbObjectForUpdate, apolloContext:any): Promise<void>  {
    return new Promise<void>(async (resolve,reject)=>{
    if(paczaks?.length>0){
      const result = await apolloContext.executeGraphQL({
        context: apolloContext,
        query: `   mutation MyMutation($updatedPaczaks: [PaczkasUpdateInput]!){
                    updatePaczkas( data: $updatedPaczaks){id}
                }`,
        variables: { updatedPaczaks: paczaks},
      });
    if(result.errors){reject(result.errors);}
    resolve();
    }
    else resolve();
  });
  }
}

export default new PaczkaTrigger();

export interface keystoneBeforeTriggerData {
  operation?: String;
  existingItem?: any;
  originalInput?: any;
  resolvedData?: any;
  context?: any;
  listKey?: String;
  fieldPath?: String;
}

export interface keystoneAfterTriggerData {
  operation?: String;
  existingItem?: any;
  originalInput?: any;
  updatedItem?: any;
  context?: any;
  listKey?: String;
  fieldPath?: String;
}

export interface PaczkaDb {
  id?: string;
  enumerator?: string;
  name?: string;
  type?: string;
  lPaczek?: number;
  nrPaczki?: number;
  nrSeryjny1?: number;
  nrSeryjny2?: number;
  nrSeryjny3?: number;
  plcId?: number;
  dlugosc?: number;
}


type PaczkaDbObject = { [key: string]: PaczkaDb };
type PaczkaDbObjectForCreation = [{data:PaczkaDb}?];
type PaczkaDbObjectForUpdate = [{id:String,data:PaczkaDb}?];