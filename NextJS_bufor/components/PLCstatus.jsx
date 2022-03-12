import React, { Component } from "react";
const plcok = "./graphics/plcok.png";
const plerror = "./graphics/plerror.png";

class PLCstatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStatus:true
    };

    
    this.setdata = this.setdata.bind(this);
    
  }


  setdata = (x) => {
    this.setState({connectionStatus: x.response})
  };

  


  render() {

    

    return (
      <FetchData
          setdata={this.setdata}
          token={this.props.token}
      >
        {this.state.connectionStatus==true?(
         <img src={plcok} className="plc" alt="logo" height="20" /> 
        ):(
          <img src={plerror} className="plc" alt="logo" height="20" />
        )}
      </FetchData>
    );
  }
}

function FetchData({setdata,token, children}) {

  React.useEffect(() => {
    // const interval = setInterval(() => {
    //   const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    //   };
    //   fetch("http://192.168.0.189:8080/plc/status", requestOptions)
    //     .then((res) => res.json())
    //     .then((d) => {
    //       //console.log(d);
    //       if(d)
    //       setdata(d);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);
  return children;
}

export default PLCstatus;
