import React, { Component, useState } from "react";
import Canvas from "./CanvasWidokLinii";
import client,{getProducts, getConveyors, createProduct, updateProduct, authClient} from "../apollo-client";
import useUser from "../lib/useUser";

class LiveDataManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shifter:[],
      ids:[],
      colors:["#4E5166","#7c90a0","#B5AA9D","#747274","#7c90a0","#1A1423","#B5AA9D"],
    };

    
    this.setdata = this.setdata.bind(this);
    this.getdata = this.getdata.bind(this);
  }


  setdata = (x) => {
    this.props.data.setdata(x);
  };
  getdata = () => {
    return this.props.data.data
  };
  setids = (x) => {
    this.setState({ ids: x });
  };
  setShifter = (x) => {
    this.setState({ shifter: x });
  };


  render() {
    return (
      <FetchData
          setShifter={this.setShifter}
          setids={this.setids}
          getdata={this.getdata}
          setdata={this.setdata}
          przenosnikClick={this.props.przenosnikClick}
      >
        <Canvas
          shifters={this.state.shifter}
          scale={this.props.scale} setscale={this.props.setscale} 
          idColored={this.props.idColored}
          przenosnikClick={this.props.przenosnikClick}
          colors={this.state.colors}
          ids={this.state.ids}
          data={this.props.data.data}
          setdata={this.setdata}
          paczka={this.props.paczka}
        ></Canvas>
      </FetchData>
    );
  }
}

function FetchData(props) {


  const {token} = useUser();
  React.useEffect(() => {
    const interval = setInterval(() => {
      authClient(token).query({
        query:getConveyors, 
        variables:{
          
            "name1": "shifter1v1",
            "name2": "shifter2v1",
            "name3": "shifter3v1"
          
        } 
    }).then((res)=>{
   
      var shifters = [0,0,0];
      res.data.allVariables.forEach(element => {
        switch(element.name){
          case('shifter1v1'):{shifters[0] = isNaN(Number.parseInt(element.value))?(0):(Number.parseInt(element.value)); break;}
          case('shifter2v1'):{shifters[1] = isNaN(Number.parseInt(element.value))?(0):(Number.parseInt(element.value)); break;}
          case('shifter3v1'):{shifters[2] = isNaN(Number.parseInt(element.value))?(0):(Number.parseInt(element.value)); break;}
        }
      });

      props.setShifter(shifters);
      przepiszDaneSerwerowe(res.data.allConveyors, props.getdata, props.setdata, props.setids);
   
    }).catch(e=>{console.log(e);})
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return props.children;
}

const przepiszDaneSerwerowe = (data_in,data_out_init,setdata,setids,colorsSet) =>{
  var ids = new Array()
  var inputDataByPlcId = {};
  data_in.forEach(element => {
    inputDataByPlcId[element.plcId]=element;
  });
  setdata(data_out_init().map((e,i)=>{
 

  

    e.pockageColor1 = inputDataByPlcId[i].colorRegular;
    e.pockageColor2 = inputDataByPlcId[i].colorClicked;
    if(e.pockageColor3!=null){
      e.pockageColor3 = inputDataByPlcId[i+1].colorRegular;
      e.pockageColor4 = inputDataByPlcId[i+1].colorClicked;
      e.pockageColor5 = inputDataByPlcId[i+2].colorRegular;
      e.pockageColor6 = inputDataByPlcId[i+2].colorClicked;
    }

    
    
    if(e.pozycja && inputDataByPlcId.hasOwnProperty(i.toString()))
    {e.pozycja = [
      inputDataByPlcId[i].position0,
      inputDataByPlcId[i].position1,
      inputDataByPlcId[i].position2,
      inputDataByPlcId[i].position3];
      e.packageId = inputDataByPlcId[i].packageId;
    }
    

    if(e.pozycja1 && inputDataByPlcId.hasOwnProperty((i+1).toString()))
    {e.pozycja1 = [
      inputDataByPlcId[i+1].position0,
      inputDataByPlcId[i+1].position1,
      inputDataByPlcId[i+1].position2,
      inputDataByPlcId[i+1].position3];
      e.packageId1 = inputDataByPlcId[i+1].packageId;
    }
    

    if(e.pozycja2 && inputDataByPlcId.hasOwnProperty((i+2).toString()))
    {e.pozycja2 = [
      inputDataByPlcId[i+2].position0,
      inputDataByPlcId[i+2].position1,
      inputDataByPlcId[i+2].position2,
      inputDataByPlcId[i+2].position3];
      e.packageId2 = inputDataByPlcId[i+2].packageId;
    }
    
    if(e.pockageColor3 && inputDataByPlcId.hasOwnProperty(i.toString())){
      e.pockageColor3 = inputDataByPlcId[i+1].colorRegular;
      e.pockageColor4 = inputDataByPlcId[i+1].colorClicked;
      e.pockageColor5 = inputDataByPlcId[i+2].colorRegular;
      e.pockageColor6 = inputDataByPlcId[i+2].colorClicked;
    }


    //init colors

    if(e.chosenPackageColor1!='#'+inputDataByPlcId[i].colorRegular
    && e.chosenPackageColor1!='#'+inputDataByPlcId[i].colorClicked)
      e.chosenPackageColor1 = '#'+inputDataByPlcId[i].colorRegular;

    if(e.chosenPackageColor3!=null){
       
        if(e.chosenPackageColor2!='#'+inputDataByPlcId[i+1].colorRegular
        && e.chosenPackageColor2!='#'+inputDataByPlcId[i+1].colorClicked)
        e.chosenPackageColor2 = '#'+inputDataByPlcId[i+1].colorRegular;
      
  
        if(e.chosenPackageColor3!='#'+inputDataByPlcId[i+2].colorRegular
        && e.chosenPackageColor3!='#'+inputDataByPlcId[i+2].colorClicked)
        e.chosenPackageColor3 = '#'+inputDataByPlcId[i+2].colorRegular;
    }

      
    

    return e;
  }));
  setids(ids);
}

export default LiveDataManager;
