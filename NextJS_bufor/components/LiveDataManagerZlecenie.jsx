import React, { Component } from "react";
import Canvas from "./CanvasWidokLinii";

class LiveDataManagerZlecenie extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  getZlecenie = () => {
    return this.props.zlecenie
  };





  render() {
    return (
      <FetchData
          intervalFunction={this.props.intervalFunction}
          getdata={this.getdata}
          setdata={this.setdata}
          zlecenieToFetch={this.getZlecenie}
          token={this.props.token}
      >
        {this.props.children}
      </FetchData>
    );
  }
}

function FetchData(props) {

  React.useEffect(() => {
    
    const interval = setInterval(() => {
      props.intervalFunction(props.zlecenieToFetch, props.setdata, props.token);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  

  return props.children;
}



export default LiveDataManagerZlecenie;
