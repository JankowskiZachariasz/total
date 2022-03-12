import React, { Component } from "react";
import PopUpWindow from "../PopUpWindow";
import DropDown from "../DropDown";
import InlineForm from "../InlineForm";
import TextInputBox from "../TextInputBox";
import ArrowButton from "../ArrowButton";
import Layout from "../Layout";
import Prompt from "../Prompt";
import styles from "./Login.module.css";
const logo = "./graphics/logo_dark.png";
const cross = "./graphics/cross.svg";



class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        password:"",
        user:"",
        showPrompt:false,
        prompttext:"",
        wybranaLinia:10,
        opt: [{value:10, text: "Automatyczny Bufor Linia Homag"}]
      };
   
      this.zalogujClicked=this.zalogujClicked.bind();
      this.ChangePassword=this.ChangePassword.bind();
      this.ChangeUser=this.ChangeUser.bind();
      this.hidePrompt=this.hidePrompt.bind();
      this.closeWindow=this.closeWindow.bind();

    }

    ChangePassword = (event) => {
      this.setState({ password: event.target.value });
    }
    ChangeUser = (event) => {
      this.setState({ user: event.target.value });
    }

    hidePrompt = () => {
      this.setState({showPrompt:false});
    }

    closeWindow = () => {

      const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", }};
      fetch("http://127.0.0.1:3000/hgyfahds8ho7fds", requestOptions)

    }
    
    zalogujClicked = () =>{

      if(this.state.password==""||this.state.user=="")
      this.setState({prompttext:"Uzupełnij wszystkie pola",showPrompt:true})
      else{
      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", },
      body: JSON.stringify({password:this.state.password, email:this.state.user})};
     try{
      fetch("http://"+process.env.NEXT_PUBLIC_NEXT_SERVER_ADDRESS+"/api/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if(data?.isLoggedIn==true){

         this.setState({showPrompt:false});
         this.props.mutateUser('/api/user');
         this.props.updateHistory('/dashboard');

      }
      else{this.setState({prompttext:"Nieudana proba logowania",showPrompt:true});}
      })
     }
     catch(error){
       console.log(error);
     }

      
      }
    }
  
    render() {
      return <Layout>
       
        <PopUpWindow>
        
            <div className={styles.loginWindowDividor}>
            
            <div className={styles.logoSection}><img src={logo} className={styles.App-logo} alt="logo" height="42" /></div>
            
            
            <div className={styles.formInput}>
            <small style={{color:"#888"}}>UŻYTKOWNIK: 0, HASŁO: 123456</small>
                <Prompt showPrompt={this.state.showPrompt} prompttext={this.state.prompttext} hidePrompt={this.hidePrompt}></Prompt>

                  <InlineForm text="Projekt">
                  <DropDown index={this.state.wybranaLinia} setIndex={(v)=>this.setState({wybranaLinia: v})} opt={this.state.opt} v={this.state.options}></DropDown>
                  </InlineForm>
                  
                  <InlineForm text="Użytkownik">
                  <TextInputBox change={this.ChangeUser} value={this.state.user} type="email" placeholder=""></TextInputBox>
                  </InlineForm>

                  <InlineForm text="Hasło">
                  <TextInputBox change={this.ChangePassword} value={this.state.password} type="password" placeholder=""></TextInputBox>
                  </InlineForm>
            </div>
            

            <div className={styles.buttonSection}>
              <div className={styles.buttonFloatLeft}><ArrowButton noArrow zalogujClicked={this.closeWindow} enabled text="ZAMKNIJ PRZEGLĄDARKĘ"></ArrowButton></div>
              <div className={styles.buttonFloatRight}><ArrowButton zalogujClicked={this.zalogujClicked} enabled text="ZALOGUJ"></ArrowButton></div>
            </div>
            
            </div>
            
        </PopUpWindow>
        </Layout>;
    }
  }
  
 
  






  export default Login;
  


        // const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", },//authorization: "b " + this.state.token
      //   body: JSON.stringify({name:"arotech", surname:"arotech", password:"123456", password2:"123456", id:"0"}),
      // };
      // fetch("http://192.168.0.189:8080/api/register", requestOptions)
      //   .then((res) => res.json())
      //   .then((data) => {console.log(data);})

    //   const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", },//authorization: "b " + this.state.token
    //   body: JSON.stringify({password:this.state.password, id:this}),
    // };
    // fetch("http://192.168.0.189:8080/api/login", requestOptions)
    //   .then((res) => res.json())
    //   .then((data) => {

        
    // const requestOptions = {method: "GET", headers: {"Content-Type": "application/json",Accept: "application/json",authorization: ("b "+ data.token)}};
    // fetch("http://192.168.0.189:8080/api/getData", requestOptions)
    //   .then((res) => res.json()).then((data) => {

    //     console.log(data);

    //   }).catch((error) => {console.log(error);});


    //   })