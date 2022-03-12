import React, { Component } from "react";
import styles from "./Window.module.css";
const add = "./graphics/add.svg";
const minus = "./graphics/minus.svg";

class Window extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fold:false,
        performed:false,
      };

      this.toggleFold = this.toggleFold.bind(this);
      }
      
      
    toggleFold = () =>{
      this.setState({fold:!this.state.fold});
    };

    render() {

      if(!this.state.performed&&this.props.fold){
        this.setState({fold:true,performed:true})
      }

      return <div style={{gridArea:this.props.gridArea, maxWidth:(this.props.maxsize?(this.props.maxsize):("1200px"))}} className="inliner">

     
         <div className={this.state.fold?("LayoutWindow closing"):("LayoutWindow")}>
         <div className="windowNavBar">
           <div className="middleWindowNav">{this.props.text}</div>
           <div onClick={()=>this.toggleFold()} className="windowFold"><img src={this.state.fold?(add):(minus)} className="App-logo" alt="logo" height="17" /></div>
           </div>
        <div className={this.state.fold?("InnerWindow noneWindow "+this.props.extraClasses):("InnerWindow "+this.props.extraClasses)}>
        {this.props.children}
        </div>
          
        </div>
    


      </div>;
    }
  }
  
  export default Window;
  