import React, { Component } from "react";
import "./MenuItem_declassed.module.css";

class MenuItem extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      
    }
  
    render() {
      return (

        <div onClick={()=>this.props.click(this.props.index)} className={this.props.enabled ?("menuItemMaster enabled"):("menuItemMaster")}>
            <div className="menuItemImage">{this.props.children}</div>
            <div className="menuItemText">{this.props.text}</div>
        </div>

        );
    }
  }
  
  export default MenuItem;
  