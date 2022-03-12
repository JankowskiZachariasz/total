import React, {useEffect } from "react";
import "./BigGreenButton.css";
import whiteArrow from "../graphics/white-arrow.svg";

function BigGreenButton({text, click}) {


  return(
    <div onClick={click} className="greenButton">
        <div className="greenButtonGrid">
        <div className="greenButtonDesc">{text}</div>
        <div className="greenButtonPic"><img src={whiteArrow} className="App-logo" alt="logo" height="17" /></div>
    
    </div>
  </div>
    
    );
}

export default BigGreenButton;
