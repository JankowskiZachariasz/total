import React,{useState} from 'react';
import Popup from 'reactjs-popup';
import "./PopupAmend.css";
import 'reactjs-popup/dist/index.css';
import ArrowButton from "./ArrowButton";
import info from "../graphics/info.svg";


    function PopupAmend(props){

        
        return(
           
           
              <div>
                <Popup open={props.open} closeOnDocumentClick onClose={()=>props.onClose()}>
                  <div className="modalPopupAmmend">
                  {props.children}
                  </div>

                </Popup>
              </div>

        );
    }

  
    export default PopupAmend;