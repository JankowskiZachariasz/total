import React, {useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Window from "../Window";
import LiveDataManagerHistoria from "../LiveDataManagerHistoria";
import LiveDataManagerZlecenie from "../LiveDataManagerZlecenie";
import timeZdarzenie from "../../graphics/timeZdarzenie.svg";
import activity from "../../graphics/activity.svg";
import boxmanip from "../../graphics/boxmanip.svg";
import InlineForm from "../InlineForm";
import DropDown from "../DropDown";
import Status from "../Status";
import Box from "../../graphics/Box_darker";
import Db from "../../graphics/Db";
import ProgressBar from "../ProgressBar";

import "./HistoriaZlecen.css";
import "./KolejkaZlecen.css";
import "./react-datepicker.css";
import "./Zdarzenia.css";


function ZdarzeniaPage({section, token, updateHistory, historyItself}) {

  const [startDate, setStartDate] = useState(new Date());
  const [maszyna, setmaszyna] = React.useState(4);
  const [wybrane, setwybrane] = React.useState("");
  const [zlecenieWyswietlane, setzlecenieWyswietlane] = React.useState({});
  const [historyZleceniaHOOK, sethistoryZleceniaHOOK] = React.useState({});

  const historyZlecenia = {
    setdata:sethistoryZleceniaHOOK,
    data:historyZleceniaHOOK
  }

  const changeDate = (newDate) =>{
    setStartDate(newDate);
    intervalFunction((()=>{return newDate}),historyZlecenia.setdata,token);
  }

  const chooseZlecenie = (id) => {
    setwybrane(id);
    intervalFunctionArchievedZlecenie(()=>{return id}, (data)=>{setzlecenieWyswietlane(data); console.log(data)}, token);
    updateHistory("/zdarzenia/"+id);
  }

  useEffect(() => {

    section.updateBoth(4,2);
    intervalFunction((function(){return startDate}),historyZlecenia.setdata,token)
    var id = historyItself().location.pathname.toString().substring(10,50);
    setwybrane(id);
    intervalFunctionArchievedZlecenie(()=>{return id},setzlecenieWyswietlane,token);

  },[]);

  const opisZdarzenie = (status) =>{

    switch(status.toString()){
        case("1"):{return("Dodanie zlecenia");}
        case("3"):{return("Zmiana priorytetu");}
        case("4"):{return("Anulowanie zlecenia");}
        case("5"):{return("Przeniesienie zlecenia");}
        case("9"):{return("Ręczny wybór linii buforowania");}
        case("10"):{return("Sterowanie buforowaniem");}
    }

}

  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(
    ({ value, onClick }, ref) => (
      <button className="customInput" onClick={onClick} ref={ref}>
        {value}
      </button>
    ),
  );


  return(
  <div className="HistoriaLayout content">
 
    
        <Window extraClasses="scrollHistoria" gridArea="okno1" text="ZAREJESTROWANE ZDARZENIA">
        <div>Wybierz datę i rodzaj zdarzenia</div>
          <div className="historiaPickerGRID">
          <div className="dataPicker">
          
         <DatePicker
          selected={startDate} 
          onChange={date => changeDate(date)}
           dateFormat="dd/MM/yyyy" 
           customInput={<CustomInput />}/>
         </div>

          <div className="inlineHistoria">
              <DropDown
              index={maszyna}
              setIndex={ e => setmaszyna(e) }
                opt={[
                  { value: "4", text: "Wszystkie zdarzenia"},
                  { value: "1", text: "Dodawanie zleceń" },
                  { value: "2", text: "Zmienianie zleceń" },
                  { value: "3", text: "Anulowanie zleceń" },  
                ]}
              ></DropDown>
          </div>
          </div>
                {historyZlecenia.data.length}
         <LiveDataManagerHistoria
          intervalFunction={intervalFunction}
          token={token}
          date={startDate}
          data={{ data: historyZlecenia.data, setdata: historyZlecenia.setdata}}>

           <div className="scrollArchieve">
             {(historyZlecenia.data&&historyZlecenia.data.zdarzenia)?historyZlecenia.data.zdarzenia.map((m,i)=>{
               if(
                   (m.RODZAJ_DZIALANIA==1&&(maszyna=="1"||maszyna=="4"))||
                   ((m.RODZAJ_DZIALANIA=="3"||m.RODZAJ_DZIALANIA=="10"||m.RODZAJ_DZIALANIA=="5"||m.RODZAJ_DZIALANIA=="9")&&(maszyna=="2"||maszyna=="4"))||
                   (m.RODZAJ_DZIALANIA=="4"&&(maszyna=="3"||maszyna=="4")))
               return <DrawArchievedZlecenie click={chooseZlecenie} data={m} wybrane={m._id==wybrane}></DrawArchievedZlecenie>
             }):(null)}
           </div>

         </LiveDataManagerHistoria>
        </Window>

        <Window extraClasses="scrollKolejka2" gridArea="okno2" text="SZCZEGÓŁY ZDARZENIA" >

        <LiveDataManagerZlecenie
          intervalFunction={intervalFunctionArchievedZlecenie}
          token={token}
          zlecenie={wybrane}
          data={{ data: zlecenieWyswietlane, setdata: setzlecenieWyswietlane}}>
            <div className="scrollZlecenia2">
            {
            zlecenieWyswietlane.zdarzenie&&zlecenieWyswietlane.zdarzenie.RODZAJ_DZIALANIA?(
              <div className="limitSzczegolyWidth">
            <div className="allignChildren">
              <div className="inlineKolej"><img src={activity} alt="no alt" height="25px"></img></div>
              <div className="inlineKolej nazwaZlecenia">{opisZdarzenie(zlecenieWyswietlane.zdarzenie.RODZAJ_DZIALANIA)}</div>
              <div className="inlineKolej statusKolejka"></div>
              <br></br>
            {/* zlecenieWyswietlane.zdarzenie.RODZAJ_DZIALANIA */}
                </div>
                <div>{Dane(zlecenieWyswietlane)}</div>
            </div>):("")
              
          }
              
            </div>
    </LiveDataManagerZlecenie>

        </Window>
  
  </div>);
}

const intervalFunction = (date, setdata, token) => {

  var t = new Date(date()).getTime();
  const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
  };

  if(date()!="")
  fetch("http://192.168.0.189:8080/zdarzenia/getarchiveforaday/"+t, requestOptions)
    .then((res) => res.json())
    .then((d) => {
      if(d&&d.zdarzenia){
          //console.log(d)
        setdata(d);
      }
      
      else setdata([]);
    })
    .catch((error) => {
      console.log(error);
    });
}

const intervalFunctionArchievedZlecenie = (zlecenie, setdata, token) => {
  const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
  };
  if(zlecenie()!="")
  fetch("http://192.168.0.189:8080/zdarzenia/getZdarzenie/"+zlecenie(), requestOptions)
    .then((res) => res.json())
    .then((d) => {
      //console.log(d);
      if(d)
      setdata(d);

      else {
        setdata({});
      }
    })
    .catch((error) => {
      //console.log(error);
    });
}

function DrawArchievedZlecenie({data,click,wybrane}){
  var t = new Date(parseInt(data.CZAS));
  var q = t.getDate()+"."+
  ((t.getMonth()+1)<10?("0"+(t.getMonth()+1)):(t.getMonth()+1))
  +"."+t.getFullYear()+", "
  +(t.getHours()<10?("0"+(t.getHours())):(t.getHours()))
  +":"+(t.getMinutes()<10?("0"+(t.getMinutes())):(t.getMinutes()))

  var item="NIEZNANY ITEM";

  return(
    <div onClick={()=>click(data._id)} className={wybrane?("archievedWybrane"):("archievedZlecenie")}>

    <div className="halfwiseGrid">

    <div className="allignChildren">
        <div className="inlineArchieved"><img src={activity} className="cross" alt="logo" height="20" /></div>
        <div className="inlineArchieved nazwaZdarzenia">{descriptionZdarzenie(data.RODZAJ_DZIALANIA)}</div>
        
        <div className="inlineArchieved floatRightArchieved multiplicityArchieved zlecenieposition hidePhone"><img src={boxmanip} className="cross" alt="logo" height="20" /></div>
        <div className="inlineArchieved itemname hidePhone">{data.zlecenie?(data.zlecenie.NUMER_ZLECENIA):("NIEZNANE ZLECENIE")}</div>
        </div>

        <div className="allignChildren">
        <div className=" inlineArchieved czasArchieved">
        {data.user?(data.user.name+" "+data.user.surname):("")}
        </div>
        <div className="inlineArchieved floatRightArchieved multiplicityArchieved zlecenieposition hidePhone">  <span className={"czasArchievedBold"}>{q}</span></div>
        </div>

        <div className="onlyPhone">
          <div className="allignChildren">
          <div className="inlineArchieved floatRightArchieved multiplicityArchieved zlecenieposition"><img src={boxmanip} className="cross" alt="logo" height="20" /></div>
        <div className="inlineArchieved itemname">{"21322123"}</div>
          </div>
        </div>

    </div>
    </div>
  );
}

function descriptionZdarzenie(status){

    switch(status.toString()){
        case("1"):{return("Dodanie zlecenia");}
        case("3"):{return("Zmiana priorytetu");}
        case("4"):{return("Anulowanie zlecenia");}
        case("5"):{return("Przeniesienie zlecenia");}
        case("9"):{return("Ręczny wybór linii buforowania");}
        case("10"):{return("Sterowanie buforowaniem");}
    }

}

function Dane(data){

  //ustalenie zlecającego
  var zlecajacy = {name: "SYSTEM", surname: ""}
  if(data.users!=null)
  data.users.map((m,i)=>{
    if(m.id == data.zdarzenie.UZYTKOWNIK){
      zlecajacy.name = m.name;
      zlecajacy.surname = m.surname;
    }
  });
  var t = new Date(parseInt(data.zdarzenie.CZAS));
  var q = t.getDate()+"."+
  ((t.getMonth()+1)<10?("0"+(t.getMonth()+1)):(t.getMonth()+1))
  +"."+t.getFullYear()+", "
  +(t.getHours()<10?("0"+(t.getHours())):(t.getHours()))
  +":"+(t.getMinutes()<10?("0"+(t.getMinutes())):(t.getMinutes()))



 
  return(
    <div className="Dane">

      {data.zdarzenie&&data.zdarzenie.PLC_ID?(WierszDanych("PLC_ID",data.zdarzenie.PLC_ID)):("")}
      {data.zlecenie&&data.zlecenie.PLC_ID?(WierszDanych("PLC_ID",data.zlecenie.PLC_ID)):("")}
      {data.zlecenie?(WierszDanych("NUMER ZLECENIA",data.zlecenie.NUMER_ZLECENIA)):("")}
      {data.zdarzenie&&data.zdarzenie.CZAS?(WierszDanych("CZAS",q)):("")}
      {zlecajacy.name&&zlecajacy.surname?(WierszDanych("UŻYTKOWNIK",(zlecajacy.name+" "+zlecajacy.surname))):("")}
      {data.zdarzenie&&data.zdarzenie.KOMENTARZ?(WierszDanych("KOMENTARZ",data.zdarzenie.KOMENTARZ)):("")}
    
      
      
      
    </div>);
 
}

function WierszDanych(n, d){
  if(d!=null)
  return(
    <div>
    <div className="row-InlineFormM">
    <div className="formDescriptorM">{n}</div>
  <div className="limitWidthM infoAlignment">{d.toString()}</div>
 </div>
 </div>
  );else return(<div></div>);
}


export default ZdarzeniaPage;
