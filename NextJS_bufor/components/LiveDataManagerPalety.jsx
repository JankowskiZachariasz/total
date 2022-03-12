import React, { Component } from "react";
import Canvas from "./CanvasWidokLinii";

class LiveDataManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
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


  render() {
    return (
      <FetchData
          setids={this.setids}
          getdata={this.getdata}
          setdata={this.setdata}
      >
        <Canvas
          position={this.props.position}
          setposition={this.props.setposition}
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };


      fetch("http://192.168.0.189:8080/plc/getdata/", requestOptions)
        .then((res) => res.json())
        .then((d) => {

          przepiszDaneSerwerowe(d[0], props.getdata, props.setdata, props.setids);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return props.children;
}

const przepiszDaneSerwerowe = (data_in,data_out_init,setdata,setids) =>{
  var ids = new Array()
  setdata(data_out_init().map((e,i)=>{

    if(i>=89&&i<=92){

      var palety = data_in["m"+(i-89)+"v1"];
      if (palety==1){e.lp=false; e.pp=true;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-89)+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }
    else if(i>=85&&i<=88){

      var palety = data_in["m"+(i-81)+"v1"];
      if (palety==1){e.lp=false; e.pp=true;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-81)+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }
    else if(i>=80&&i<=84){

      var palety = data_in["m"+(i-72)+"v1"];
      if (palety==1){e.lp=false; e.pp=true;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-72)+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }
    else if(i>=75&&i<=79){

      var palety = data_in["m"+(i-63)+"v1"];
      if (palety==1){e.lp=false; e.pp=true;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-63)+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }

    else if(i>=72&&i<=74){

      var palety = data_in["m"+(i-54)+"v1"];
      if (palety==1){e.lp=false; e.pp=true;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-54)+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }

    else if(i>=69&&i<=71){

      var palety = data_in["m"+(i-48)+"v1"];
      if (palety==1){e.lp=false; e.pp=true;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-48)+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }

    else if(i>=0&&i<=67){

      var a = ((i-(i%4))/4)-16;
      var palety = data_in["m"+(i-35-(a*8))+"v1"];
      if (palety==1){e.lp=true; e.pp=false;}
      else if (palety==2){e.lp=true; e.pp=true;}
      else{e.lp=false; e.pp=false;}
      e.lp_id=data_in["m"+(i-35-(a*8))+"v2"];//m0v3
      e.pp_id=e.lp_id;

    }



    // if(i<=92||i==95||i==96||i==97){
    //   e.lp=data_in["m"+i+"v1"];//m0v1
    //   e.pp=data_in["m"+i+"v2"];//m0v2
    //   e.lp_id=data_in["m"+i+"v3"];//m0v3
    //   e.pp_id=data_in["m"+i+"v4"];//m0v4
    //   if(e.lp!==true&&e.lp!==false)e.lp=false;
    //   if(e.pp!==true&&e.pp!==false)e.pp=false;

    // }
    // else if(i==93||i==94){
    //   e.lp=data_in["m"+i+"v1"];//m0v1
    //   e.pp=data_in["m"+i+"v2"];//m0v2
    //   e.lp_id=data_in["m"+i+"v3"];//m0v3
    //   e.pp_id=data_in["m"+i+"v4"];//m0v4
    //   e.pozycja=data_in["m"+i+"v6"];//m0v6
    //   e.punktDocelowy=data_in["m"+i+"v7"];//m0v7
      

    //   if(e.lp!==true&&e.lp!==false)e.lp=false;
    //   if(e.pp!==true&&e.pp!==false)e.pp=false;

    // }
    if(!ids.includes(e.lp_id)&e.lp&e.lp_id!="0000000000"&e.lp_id!="999999"&e.lp_id!="")ids.push(e.lp_id)
    if(!ids.includes(e.pp_id)&e.lp&e.pp_id!="0000000000"&e.pp_id!="999999"&e.pp_id!="")ids.push(e.pp_id)
    return e;
  }))
  setids(ids);
  //console.log(ids);
}

export default LiveDataManager;
