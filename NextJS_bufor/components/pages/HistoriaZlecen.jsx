import React, {useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Window from "../Window";
import LiveDataManagerHistoria from "../LiveDataManagerHistoria";
import LiveDataManagerZlecenie from "../LiveDataManagerZlecenie";
import timeZdarzenie from "../../graphics/timeZdarzenie.svg";
import InlineForm from "../InlineForm";
import DropDown from "../DropDown";
import Status from "../Status";
import Box from "../../graphics/Box_darker";
import Db from "../../graphics/Db";
import ProgressBar from "../ProgressBar";

import "./HistoriaZlecen.css";
import "./KolejkaZlecen.css";
import "./react-datepicker.css";



function HistoriaZlecen({section,historyZlecenia, token, updateHistory, historyItself}) {

  const [startDate, setStartDate] = useState(new Date());
  const [maszyna, setmaszyna] = React.useState(4);
  const [wybrane, setwybrane] = React.useState("");
  const [zlecenieWyswietlane, setzlecenieWyswietlane] = React.useState({});

  const changeDate = (newDate) =>{
    setStartDate(newDate);
    intervalFunction((()=>{return newDate}),historyZlecenia.setdata,token);
  }


  const chooseZlecenie = (id) => {
    setwybrane(id);
    intervalFunctionArchievedZlecenie(()=>{return id}, setzlecenieWyswietlane, token);
    updateHistory("/historia/"+id);
  }

  useEffect(() => {

    section.updateBoth(2,2);
    intervalFunction((function(){return startDate}),historyZlecenia.setdata,token)
    var id = historyItself().location.pathname.toString().substring(10,50);
    setwybrane(id);
    intervalFunctionArchievedZlecenie(()=>{return id},setzlecenieWyswietlane,token);

  },[]);

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
 
    
        <Window extraClasses="scrollHistoria" gridArea="okno1" text="HISTORIA ZLECEŃ">
        <div>Wybierz datę i maszynę</div>
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
                  { value: "4", text: "Wszystkie Maszyny"},
                  { value: "1", text: "HOMAG 1" },
                  { value: "2", text: "HOMAG 2" },
                  { value: "3", text: "HOMAG 3" },
                  
                ]}
              ></DropDown>
          </div>
          </div>

         <LiveDataManagerHistoria
          intervalFunction={intervalFunction}
          token={token}
          date={startDate}
          data={{ data: historyZlecenia.data, setdata: historyZlecenia.setdata}}>

           <div className="scrollArchieve">
             {historyZlecenia.data.zlecenia?historyZlecenia.data.zlecenia.map((m,i)=>{
               if(m.HOMAG == maszyna||maszyna==4)
               return <DrawArchievedZlecenie click={chooseZlecenie} data={m} items={historyZlecenia.data.items} wybrane={m._id==wybrane}></DrawArchievedZlecenie>
             }):(null)}
           </div>

         </LiveDataManagerHistoria>
        </Window>

        <Window extraClasses="scrollKolejka2" gridArea="okno2" text="SZCZEGÓŁY ZLECENIA" >

        <LiveDataManagerZlecenie
          intervalFunction={intervalFunctionArchievedZlecenie}
          token={token}
          zlecenie={wybrane}
          data={{ data: zlecenieWyswietlane, setdata: setzlecenieWyswietlane}}>
            <div className="scrollZlecenia2">
            {
            
            zlecenieWyswietlane.zlecenie&&zlecenieWyswietlane.item?(
              <div className="limitSzczegolyWidth">
            <div className="allignChildren">
              <div className="inlineKolej"><Box></Box></div>
              <div className="inlineKolej nazwaZlecenia">{zlecenieWyswietlane.zlecenie.NUMER_ZLECENIA}</div>
              <div className="inlineKolej statusKolejka">{Status(zlecenieWyswietlane.zlecenie.STATUS, //zlecenieWyswietlane.zlecenie.STATUS
                parseFloat( zlecenieWyswietlane.zlecenie.DOSTARCZONA_L_PALET/zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET*100))}</div>
                </div>
                <div>
                <ProgressBar
                  liczbaA={zlecenieWyswietlane.zlecenie.ZBUFOROWANA_L_PALET} 
                  liczbaB={zlecenieWyswietlane.zlecenie.DOSTARCZONA_L_PALET} 
                  liczbaC={zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET} 
                  czasObrobki={zlecenieWyswietlane.item.CZAS_OBROBKI_PALETY} 
                  status = {zlecenieWyswietlane.zlecenie.STATUS}
                ></ProgressBar>
            <div>{Dane(zlecenieWyswietlane)}</div>
            {Zdarzenia({zlecenieWyswietlane:zlecenieWyswietlane})}  
                </div>
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
  fetch("http://192.168.0.189:8080/zlecenia/getarchiveforaday/"+t, requestOptions)
    .then((res) => res.json())
    .then((d) => {
      if(d&&d.zlecenia&&d.zlecenia[0])
      setdata(d);
    
      else setdata({zlecenia:[],items:[]});
      
    })
    .catch((error) => {
      console.log(error);
    });
}

const intervalFunctionArchievedZlecenie = (zlecenie, setdata, token) => {
  const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
  };

  if(zlecenie()!="")
  fetch("http://192.168.0.189:8080/zlecenia/getZlecenieArchieved/"+zlecenie(), requestOptions)
    .then((res) => res.json())
    .then((d) => {
      //console.log(d);
      if(d.zlecenie)
      setdata(d);

      else {
        setdata({});
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function DrawArchievedZlecenie({data,items,click,wybrane}){
  var t = new Date(parseInt(data.ZAKONCZONO));
  var q = t.getDate()+"."+
  ((t.getMonth()+1)<10?("0"+(t.getMonth()+1)):(t.getMonth()+1))
  +"."+t.getFullYear()+", "
  +(t.getHours()<10?("0"+(t.getHours())):(t.getHours()))
  +":"+(t.getMinutes()<10?("0"+(t.getMinutes())):(t.getMinutes()))

  var item="NIEZNANY ITEM";
  var opisItemu = "";
  items.map(m=>{if(m._id==data.ITEM) {item=m.NR_ITEMU; opisItemu=m.OPIS;}})
  opisItemu=opisItemu.length>18?(opisItemu.substring(0,18)+"..."):(opisItemu);

  return(
    <div onClick={()=>click(data._id)} className={wybrane?("archievedWybrane"):("archievedZlecenie")}>

    <div className="halfwiseGrid">

    <div className="allignChildren">
        <div className="inlineArchieved"><Box></Box></div>
        <div className="inlineArchieved nazwaZlecenia">{data.NUMER_ZLECENIA.length>20?(data.NUMER_ZLECENIA.substring(0,17)+"..."):(data.NUMER_ZLECENIA)}</div>
        <div className="inlineArchieved statusKolejka">{Status(data.STATUS, //zlecenieWyswietlane.zlecenie.STATUS
          parseFloat((data.DOSTARCZONA_L_PALET)/data.WYMAGANA_L_PALET*100))}</div>
          <div className="inlineArchieved floatRightArchieved multiplicityArchieved hidePhone">{data.WYMAGANA_L_SZTUK+" ×"}</div>
        <div className="inlineArchieved dbColor hidePhone"><Db></Db></div>
        <div className="inlineArchieved itemname hidePhone">{item}</div>
        </div>

        <div className="allignChildren">
        <div className=" inlineArchieved czasArchieved">
          {"UKOŃCZONO: "}
          <span className={"czasArchievedBold"}>{q}</span>
        </div>
        <div className="inlineArchieved floatRightArchieved hidePhone">{opisItemu}</div>
        </div>

        <div className="onlyPhone">
          <div className="allignChildren">
          <div className="inlineArchieved floatRightArchieved multiplicityArchieved">{data.WYMAGANA_L_SZTUK+" ×"}</div>
          <div className="inlineArchieved dbColor"><Db></Db></div>
          <div className="inlineArchieved itemname">{item}</div>
          </div>
        </div>

    </div>
    </div>
  );
}

function Dane(data){

  //ustalenie zlecającego
  var zlecajacy = {name: "SYSTEM", surname: ""}
  data.users.map((m,i)=>{
    if(m.id == data.zlecenie.ZLECAJĄCY){
      zlecajacy.name = m.name;
      zlecajacy.surname = m.surname;
    }
  });
  var linie =""
  for(var n=0;n<5;n++){
    linie += (data.zlecenie[("Linia"+(+n+1))]==0?(""):(data.zlecenie[("Linia"+(+n+1))]+", "));
  }
  if(linie == "")linie="BRAK"
  //console.log(data)

  var firstBuf = data.zlecenie.ZMAGAZYNOWANIA[0];
  var lastBuf = data.zlecenie.ZMAGAZYNOWANIA[data.zlecenie.ZMAGAZYNOWANIA.length-1];
  var t = new Date(lastBuf-firstBuf);
  var timeBuforowanie = 
  t.getUTCHours()>0?((t.getUTCHours()<10?("0"+(t.getUTCHours())):(t.getHours()))+"h "):("")+
  +(t.getMinutes()<10?("0"+(t.getMinutes())):(t.getMinutes()))+"m "+
  +(t.getSeconds()<10?("0"+(t.getSeconds())):(t.getSeconds()))+"s"

  if(data.zlecenie&&data.item)
  return(
    <div className="Dane">
      {WierszDanych("NUMER ZLECENIA",data.zlecenie.NUMER_ZLECENIA)}
      {WierszDanych("ITEM",data.item.NR_ITEMU)}
      {WierszDanych("HOMAG",data.zlecenie.HOMAG)}
      {WierszDanych("ZLECIŁ(A)",zlecajacy.name+" "+zlecajacy.surname)}
      {data.zlecenie.PRIORYTET?(WierszDanych("PRIORYTET",data.zlecenie.PRIORYTET=="true"?("TAK"):("NIE"))):("")}
      {WierszDanych("PRZYPISANE LINIE", linie)}
      {WierszDanych("LICZBA SZTUK",data.zlecenie.WYMAGANA_L_SZTUK)}
      {WierszDanych("PALETY WYMAGANE",data.zlecenie.WYMAGANA_L_PALET)}
      {WierszDanych("PALETY ZBUFOROWANE",data.zlecenie.ZBUFOROWANA_L_PALET)}
      {WierszDanych("PALETY DOSTARCZONE",data.zlecenie.DOSTARCZONA_L_PALET)}
      {!isNaN(t.getMinutes())?(WierszDanych("CZAS BUFOROWANIA",timeBuforowanie)):("")}
      
    </div>);
  else return(<div></div>)
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

function Zdarzenia({zlecenieWyswietlane}){

  zlecenieWyswietlane.zdarzenie.sort((a, b)=> {
    return a.CZAS - b.CZAS
 })

  //console.log(zlecenieWyswietlane)
  return (
    <div className="zdarzeniKolejka">
      Zarejestrowano{" "+(zlecenieWyswietlane.zdarzenie.length)+" zdarzeń(nia):"}
      {/* {Zdarzenie({
        RODZAJ_DZIALANIA:"1",
        UZYTKOWNIK:zlecenieWyswietlane.zlecenie.ZLECAJĄCY,
        CZAS:zlecenieWyswietlane.zlecenie.CZAS_UTWORZENIA,
      },zlecenieWyswietlane.users
      )//startowe
      } */}
      {
        zlecenieWyswietlane?(
          
          zlecenieWyswietlane.zdarzenie.map((m,i)=>{
          return(
            <div key={i}>
              {Zdarzenie(m, zlecenieWyswietlane.users)}
            </div>
          );
        })):(
            <div></div>
        )
      }
    </div>
  )
}

function Zdarzenie(m, users){

  var zlecajacy = {name: "SYSTEM", surname: ""}
  users.map((n,i)=>{
    if(n.id == m.UZYTKOWNIK){
      zlecajacy.name = n.name;
      zlecajacy.surname = n.surname;
    }
  });


  var t = new Date(parseInt(m.CZAS));
  var q = t.getDate()+"."+
  ((t.getMonth()+1)<10?("0"+(t.getMonth()+1)):(t.getMonth()+1))
  +"."+t.getFullYear()+", "
  +(t.getHours()<10?("0"+(t.getHours())):(t.getHours()))
  +":"+(t.getMinutes()<10?("0"+(t.getMinutes())):(t.getMinutes()))

  var description = "";
  switch(m.RODZAJ_DZIALANIA){
    case("1"):{description="Dodanie zlecenia, "+zlecajacy.name+" "+zlecajacy.surname; ;break;}
    case("2"):{description="";break;}
    case("3"):{description="Zmiana priorytetu, "+zlecajacy.name+" "+zlecajacy.surname; ;break;}
    case("4"):{description="Anulowanie zlecenia "+zlecajacy.name+" "+zlecajacy.surname; ;break;}
    case("5"):{description="Przeniesienie zlecenia na inną maszynę, "+zlecajacy.name+" "+zlecajacy.surname; ;break;}
    case("6"):{description="Ukończenie zlecenia";break;}
    case("7"):{description="Rozpoczęcie buforowania ";break;}
    case("8"):{description="Rozpoczęcie wykonywania ";break;}
    case("9"):{description="Korekta liczby wymaganych palet, "+zlecajacy.name+" "+zlecajacy.surname; break;}
    case("10"):{description="Ręcznie zmiana zezwolenia na buforowanie, "+zlecajacy.name+" "+zlecajacy.surname; ;break;}
  }
  return(
    <div className="zdarzenie">
      <img src={timeZdarzenie} className="timeZdarzenie" alt="logo" height="15" /><div className="inlineTime">{q}</div>
      <div className="zdrazenieDesc">{description}</div>
    </div>
  )
}

export default HistoriaZlecen;
