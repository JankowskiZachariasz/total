import React, {useEffect } from "react";
  import BigGreenButton from "../BigGreenButton";
  import "./DodawanieZlecen.css";
  
  function DodawanieZlecen({section, updateHistory}) {
  
    useEffect(() => {
      section.updateBoth(-1,-1);
    },[]);
  
    return(
      <div>
        <h1 className="alligned-title">Dodawanie Zleceń</h1>
    <div className="dodawaniezlecenLayout content">
  
          <BigGreenButton click={()=>updateHistory("/zpliku")} text="Dodaj z pliku .csv"></BigGreenButton>
          <BigGreenButton click={()=>updateHistory("recznie")} text="Wprowadź ręcznie"></BigGreenButton>
    
    </div>
    </div>);
  }
  
  export default DodawanieZlecen;
  