import React, { Component } from "react";

class LiveDataManagerZlecenia extends Component {
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
          token={this.props.token}
      >
        {this.props.children}
      </FetchData>
    );
  }
}

function FetchData({getdata,setdata,token, children}) {

  React.useEffect(() => {
    const interval = setInterval(() => {
      const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      };


      fetch("http://192.168.0.189:8080/zlecenia/getdata/", requestOptions)
        .then((res) => res.json())
        .then((d) => {

          if(d)
          setdata(d);

        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return children;
}

export default LiveDataManagerZlecenia;
