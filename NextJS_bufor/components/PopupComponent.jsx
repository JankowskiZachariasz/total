import React,{useState} from 'react';
import Popup from 'reactjs-popup';
import "./PopupComponent.css";
import 'reactjs-popup/dist/index.css';
import ArrowButton from "./ArrowButton";
import info from "../graphics/info.svg";


    function PopupComponent({setOpen, text, closeModal, open, resetPrevious}){

        
        return(

           
           
              <div>
                <Popup open={open} closeOnDocumentClick onClose={()=>{closeModal(); resetPrevious();}}>
                  <div className="modalPopup">
                    <a className="close" onClick={()=>{closeModal(); }}>
                    </a><div className={"alignator"}><div className={"infoField"}> <img src={info} alt="logo" height="30" /></div><div className={"textFiledInfo"}>{text}</div></div>
                    <div className="windowBottomPopup">
                        <div onClick={()=>setOpen(false)} className="buttonFloatRight"><ArrowButton enabled={open}  text={"OK "}></ArrowButton></div>
                    </div>

                  </div>
                </Popup>
              </div>

        );
    }

  
    export default PopupComponent;