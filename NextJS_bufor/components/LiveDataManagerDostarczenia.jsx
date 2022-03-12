import React, { Component } from "react";
import Canvas from "./CanvasWidokLinii";

class LiveDataManagerDostarczenia extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setdata = this.setdata.bind(this);
    this.getdata = this.getdata.bind(this);
  }


  setdata = (x) => {
    this.props.data.setdata(x);
  };
  getdata = () => {
    return this.props.data.data
  };


  render() {
    return (
      <FetchData
          getdata={this.getdata}
          setdata={this.setdata}
      >
        {this.props.children}
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


      fetch("http://192.168.0.189:8080/dostarczenia/getdata/", requestOptions)
        .then((res) => res.json())
        .then((d) => {
            var rewrite=[[],[],[]];
            d.map((t,i)=>{
                t.map((f,j)=>{

                    rewrite[i][j] = (new Date(parseInt(f)));
                    
                });
            });
            //console.log(rewrite[0]);
           
          props.setdata([...rewrite]);

        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return props.children;
}

export default LiveDataManagerDostarczenia;
