import React, { Component } from "react";
import "./MenuSubItem.module.css";

class MenuSubItem extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      
    }
  
    render() {
      return (

        <div onClick={()=>this.props.click(this.props.index)} className={this.props.enabled ?("menuSubItemMaster enabled"):("menuSubItemMaster")}>
            <div className="menuSubItemImage">{this.props.children}</div>
            <div className="menuSubItemText">{this.props.text}</div>
        </div>

        );
    }
  }
  
  export default MenuSubItem;
  