require('dotenv').config()
module.exports = async keystone => {
  
    //rekordy ba danych muszą już być gotowe w systemie
    var PRODUKTY_DB_ID = '6219f528ca6c951cf48f0b02';//paczki w istocie
    var API_DB_ID = '6219f509ca6c951cf48f0afa';
    var CONVEYORS_DB_ID = '622c4f4cc93fab17d0a2868f';
    

    var VariableCreateInput = new Array();

    var startingOffset = 3640;
    if(process.env.INIT_PACZKA == 'true'){
      for(var i = 1;i<=400;i++){

        var produkt=[

            {"data": {"name": "paczka"+i+"v1","offset": startingOffset+(i-1)*30+0,"offsetDecimal": 15,"type": "S", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v2","offset": startingOffset+(i-1)*30+17,"offsetDecimal": 1,"type": "B", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v3","offset": startingOffset+(i-1)*30+18,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v4","offset": startingOffset+(i-1)*30+20,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v5","offset": startingOffset+(i-1)*30+22,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v6","offset": startingOffset+(i-1)*30+24,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v7","offset": startingOffset+(i-1)*30+26,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}},
            {"data": {"name": "paczka"+i+"v8","offset": startingOffset+(i-1)*30+28,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": PRODUKTY_DB_ID}}}}
        ]

        VariableCreateInput.push(...produkt);
    }
  }

  if(process.env.INIT_CONTROLL == 'true'){
    

    let i=1;
      var api=[

          {"data": {"name": "api"+i+"v1","offset": 0,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v2","offset": 2,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v3","offset": 4,"offsetDecimal": 15,"type": "S", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v4","offset": 21,"offsetDecimal": 1,"type": "B", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v5","offset": 22,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v6","offset": 24,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v7","offset": 26,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v8","offset": 28,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v9","offset": 30,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v10","offset": 32,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v11","offset": 34,"offsetDecimal": 15,"type": "S", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v12","offset": 52,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v13","offset": 54,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v14","offset": 56,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v15","offset": 58,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},
          {"data": {"name": "api"+i+"v16","offset": 60,"offsetDecimal": 2,"type": "INT", "rwMode": "ReadWrite", "datablock": {"connect":  {"id": API_DB_ID}}}},

      ]

      VariableCreateInput.push(...api);
  
  }

  if(process.env.INIT_CONVEYOR_VARIABLES == 'true'){
    for(var i = 0;i<=96;i++){

      var produkt=[
          {"data": {"name": "conveyor"+i+"v1","offset": (i)*4,"offsetDecimal": 2,"type": "INT", "rwMode": "Read", "datablock": {"connect":  {"id": CONVEYORS_DB_ID}}}},
          {"data": {"name": "conveyor"+i+"v2","offset": (i)*4+2,"offsetDecimal": 1,"type": "B", "rwMode": "Read", "datablock": {"connect":  {"id": CONVEYORS_DB_ID}}}},
          
      ]

      VariableCreateInput.push(...produkt);
  }
  
  }
  if(process.env.INIT_SHIFTERS == 'true'){
    for(var i = 1;i<=2;i++){

      var produkt=[
          {"data": {"name": "shifter"+i+"v1","offset": 392+(i-1)*4,"offsetDecimal": 4,"type": "DI", "rwMode": "Read", "datablock": {"connect":  {"id": CONVEYORS_DB_ID}}}},
          
      ]

      VariableCreateInput.push(...produkt);
  }
  
  }
  

    const { errors, data} = await keystone.executeGraphQL({
      context: keystone.createContext().sudo(),
      query: 
      ` mutation MyMutation($VariableCreateInput: [VariablesCreateInput]!){
        createVariables(data: $VariableCreateInput){
          id
        }}
          `
          ,
      variables: { VariableCreateInput },
    });

    if (errors) {
      console.log('failed to add all variables:');
      console.log(errors);
    } else {}
  
};
