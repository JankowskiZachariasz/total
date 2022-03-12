import React, { Component } from "react";
import PLCstatus from "./PLCstatus";

const logo = "./graphics/logo.png";
const dropdownArrow = "./graphics/dropdownArrow.svg";
const hamburger = "./graphics/hamburger.svg";

class TopNavbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open:0,
        usermenuOpen:0,
      };
      this.toggleCollapse = this.toggleCollapse.bind(this);
      this.updateSection = this.updateSection.bind(this);
      this.toggleCollapseUserMenu = this.toggleCollapseUserMenu.bind(this);
      this.logout = this.logout.bind(this);
      this.login = this.login.bind(this);
    }

    logout = () => {
      const requestOptions = {method: "GET",headers: {Accept: "application/json", }};
     try{
      fetch("http://"+process.env.NEXT_PUBLIC_NEXT_SERVER_ADDRESS+"/api/logout", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if(data?.isLoggedIn==false){

         this.props.mutateUser('/api/user');
         this.props.updateHistory("/login");
         this.toggleCollapseUserMenu();

      }
      else{this.setState({prompttext:"Nieudana proba logowania",showPrompt:true});}
      })
     }
     catch(error){
       console.log(error);
     }
    }

    login = () => {
      this.props.updateHistory("/login");
      this.toggleCollapseUserMenu();
    }
  
    toggleCollapse = () => {
      let r =1;
      if(this.state.open==1){
        r=2;
      }
      this.setState({
        open: r,
      })
    };

    toggleCollapseUserMenu = () => {
      let r =1;
      if(this.state.usermenuOpen==1){
        r=2;
      }
      this.setState({
        usermenuOpen: r,
      })
    };

    updateSection = (newSec,newSub) => {
      this.setState({
        open: 2,
      })

      var newSubChecked = 1;
      if(newSub)newSubChecked = newSub;

      this.props.section.updateBoth(newSec, newSubChecked)

      console.log(this.props);
      switch(newSec){
        
       case 1:{this.props.updateHistory("/dashboard"); break;}
        case 2:{
          if(newSubChecked==1)
          this.props.updateHistory("/products-on-the-line");
          else this.props.updateHistory("/products-on-the-line-history");
          break;}
        case 3:{this.props.updateHistory("/product-base"); break;}
        case 4:{this.props.updateHistory("/diagnostic-logs"); break;}
        case 5:{this.props.updateHistory("/diagnostic-logs"); break;}
      }
      
    };

    render() {
      return <div>
         <div className="navbar">

          <div onClick={()=>this.props.updateHistory("/dashboard")} className="LogoText">
            <div className="logoPicture"><img src={logo} className="App-logo" alt="logo" height="22" /></div>
            <div className="textLogo"><PLCstatus token={this.props.token}></PLCstatus></div>
            
          </div>

          {
            
          <div className="loginStatus">
            
          <div onClick={()=>this.toggleCollapseUserMenu()} className="userMenu">
          
          {/* {this.props.isLoggedIn?('TAK'):('NIE')} */}
            <div className="surname">{this.props.name}</div>
            <div className="arrow"><img src={dropdownArrow} className="App-logo" alt="logo" height="6" /></div>
          </div>
          <div onClick={()=>this.toggleCollapse()} className="hamburger"><img src={hamburger} className="App-logo" alt="logo" height="17" /></div>
        </div>
        }
          

          <div className={this.state.usermenuOpen==1?("ExpandableUserMenu expand"):(this.state.open==2?("ExpandableUserMenu destroyIt"):("ExpandableUserMenu"))}>
          {this.props.isLoggedIn?(
            <div onClick={()=>this.logout()} className="expandableUserMenuItem">WYLOGUJ</div>
          ):(
            <div onClick={()=>this.login()} className="expandableUserMenuItem">ZALOGUJ</div>
          )}
          
          </div>
          
         
        </div>
        {
          <div className={this.state.open==1?("ExpandableNavbar expand"):(this.state.open==2?("ExpandableNavbar destroyIt"):("ExpandableNavbar"))}>
          <div onClick={()=>this.updateSection(1)} className={this.props.section.getSection==1?("expandableItem chosen"):("expandableItem")}>WIDOK GŁÓWNY</div>
          <div onClick={()=>this.updateSection(2)} className={(this.props.section.getSection==2)&&(this.props.section.getSubSection==1)?("expandableItem chosen"):("expandableItem")}>PRODUKTY NA BUFORZE</div>
          <div onClick={()=>this.updateSection(2,2)} className={(this.props.section.getSection==2)&&(this.props.section.getSubSection==2)?("expandableItem chosen"):("expandableItem")}>PRODUKTY NA BUFORZE HISTORIA</div>
          <div onClick={()=>this.updateSection(3)} className={this.props.section.getSection==3?("expandableItem chosen"):("expandableItem")}>BAZA PRODUKTÓW</div>
          <div onClick={()=>this.updateSection(4)} className={this.props.section.getSection==4&&(this.props.section.getSubSection==1)?("expandableItem chosen"):("expandableItem")}>LOGI DIAGNOSTYCZNE</div>
          <div onClick={()=>this.logout()} className={this.props.section.getSection==6?("expandableItem chosen"):("expandableItem")}>WYLOGUJ</div>
      </div>

        }
        




      </div>;
    }
  }
  
  export default TopNavbar;
  