import React, { Component } from "react";
import "./NaviagtionMenu.module.css";
import MenuItem from "./MenuItem";
import MenuSubItem from "./MenuSubItem";
import Db from "../graphics/Db";
import Box from "../graphics/Box_darker";
import Eye  from "../graphics/Eye";
import Gear from "../graphics/Gear";
import Raports from "../graphics/Raports";
const add = "./graphics/add.svg";
import Sub from "../graphics/Sub";
import dynamic from 'next/dynamic'

class NaviagtionMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.updateSection = this.updateSection.bind(this);
      this.updateSubSection = this.updateSubSection.bind(this);
    }

    updateSection = (newSec) => {
      this.props.section.setSection(newSec)
      console.log(this.props);
      switch(newSec){
        case 1:{this.props.updateHistory("/dashboard"); break;}
        case 2:{this.props.updateHistory("/products-on-the-line"); break;}
        case 3:{this.props.updateHistory("/product-base"); break;}
        case 4:{this.props.updateHistory("/diagnostic-logs"); break;}
        case 5:{this.props.updateHistory("/diagnostic-logs"); break;}
      }
      
    };

    updateSubSection = (newSubSec) => {
      this.props.section.setSubSection(newSubSec)
      switch(this.props.section.getSection){
        case 2:{
          if(newSubSec==1){this.props.updateHistory("/products-on-the-line")}
          else if(newSubSec==2){this.props.updateHistory("/products-on-the-line-history")}
           break;}

        case 4:{
          if(newSubSec==1){this.props.updateHistory("/product-base");}
          else if(newSubSec==2){this.props.updateHistory("/zdarzenia");}
          break;}
      }

    };

  
    render() {
      return (
        
      <div className="sidebar">
      {/* <NewJob click={()=>this.props.updateHistory("/dodawaniezlecen")}></NewJob> */}
      <div  className="navigation">
      <MenuItem index={1} click={this.updateSection} enabled={this.props.section.getSection==1?(true):(false)} text="Widok Główny"><Eye></Eye></MenuItem>
      <MenuItem index={2} click={this.updateSection} enabled={this.props.section.getSection==2?(true):(false)} text="Produkty na Buforze"><Box></Box></MenuItem>
      
      <div className={this.props.section.getSection==2?((this.props.section.OLDchosenMenuElement!=-1?("menuExpandable open"):("menuExpandable opened")))
      :(this.props.section.OLDchosenMenuElement==2?
      ("menuExpandable closed"):("menuExpandable"))}>
      <MenuSubItem index={1} click={this.updateSubSection} enabled={this.props.section.getSubSection==1?(true):(false)} text="Teraz"><Sub></Sub></MenuSubItem>
      <MenuSubItem index={2} click={this.updateSubSection} enabled={this.props.section.getSubSection==2?(true):(false)} text="Historia"><Sub></Sub></MenuSubItem>
      </div>

      <MenuItem index={3} click={this.updateSection} enabled={this.props.section.getSection==3?(true):(false)} text="Baza Produktów"><Db></Db></MenuItem>

      <MenuItem index={4} click={this.updateSection} enabled={this.props.section.getSection==4?(true):(false)} text="Logi Diagnostyczne"><Raports></Raports></MenuItem>

      </div>
      </div>);
    }
  }
  
  function NewJob({click}) {
  
    return (

        <div onClick={click} className="newJob">
          <div className="newJobGrid">
          <div className="newJobPic"><img src={add} className="App-logo" alt="logo" height="17" /></div>
          <div className="newJobDesc">NOWE ZLECENIE</div>
          </div>
        </div>
     
    );
  }



  export default NaviagtionMenu;