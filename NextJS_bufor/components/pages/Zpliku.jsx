import React, {useEffect, useState } from "react";
import axios from 'axios';
import {Checkbox} from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Window from "../Window";
import PopupComponent from "../PopupComponent";
import Prompt from "../Prompt";
import ArrowButton from "../ArrowButton";
import "./Zpliku.css";
import upload from "../../graphics/upload.svg";
import excel from "../../graphics/excel.svg";
import error from "../../graphics/error.svg";
import Koncowka from "../functions/Koncowka"

  
  function Zpliku({section, token, updateHistory}) {
    const [file, setfile] = React.useState({name: ""});
    const [tabelka, settabelka] = React.useState([]);
    const [liczbadodawanych, setliczbadodawanych] = React.useState(0);
    const [koncowka, setkoncowka] = React.useState("ZLECEŃ");
    const [showPrompt, setshowPrompt] = React.useState(false);
    const [promptText, setpromptText] = React.useState("");
    const [popupText, setpopupText] = React.useState("");

    const hideprompt = () =>{setshowPrompt(false)};
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(() => {

        section.updateBoth(-1,-1);
        
      },[]);

      

      const showError = (id) =>{
        if(tabelka[id].error){
        var m1 = "Wprowadzono niekompletne dane. Popraw podświetlone na czerwono zlecenie w pliku .csv"
        var m2 = "Wprowadzono niepoprawne dane. Popraw podświetlone na czerwono zlecenie w pliku .csv"
        var m3 = "Nie ustalono itemu. Upewnij się, że znajduje się on w bazie danych, lub uzupełnij wszystkie pola w pliku .csv"
        var m4 = "W bazie danych istnieje już zlecenie o tym numerze."
        setpromptText(tabelka[id].errorKompletnosc?(m1):(tabelka[id].errorPoprawnosc?(m2):(tabelka[id].errorJuzJest?(m4):(m3))))
        setshowPrompt(true)}
      }
      

    const dodajZlecenia = () =>{
      
      
        var wysylka=new Array();
        tabelka.map((m,i)=>{
          if(m.checked&&!m.error)wysylka.push({...m,PREFERRED_POZYCJA: i});
        });
        console.log(wysylka);

      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify(wysylka)};
      if(wysylka.length>0)
      fetch("http://192.168.0.189:8080/zlecenia/dodaj", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data&&data.error==false){
          //updateHistory("/kolejka");
          setpopupText("Dodano "+data.count+Koncowka(data.count).toLowerCase()+".");
          setOpen(true);
          setfile({name:""});

        }
      })
        
      }

      const resetTabelka = () =>{
      

        settabelka(new Array());
        window.scrollTo(0, 0)
        setliczbadodawanych(0);

      }
  
  

    const flipCheckbox = (idflip) =>{
      
      var rewrite = tabelka;
      rewrite[idflip].checked=!tabelka[idflip].checked;
      settabelka(rewrite);
      var licz=0;
      tabelka.map((k,i)=>{if(k.checked&&!k.error)licz++;})
      setliczbadodawanych(licz);
    }

    const handleChange = (event) =>{

      
        setfile({name:event.target.files[0].name});

        const formData = new FormData() 
        formData.append('file', event.target.files[0])  
        let config = {headers: {authorization: ("b " + token.data),}}
          axios.post("http://192.168.0.189:8080/upload", formData, config)
          .then(res => { // then print response status
            var r = new Array();
            
            var liczbaOk=0;
            res.data.data.map((m,i)=>{

              var t = new Date(60000*m[6]);
              var czas = t.getHours()+"godz, "+t.getMinutes()+"min";
              if(!(m[8]||m[9]||m[10]||m[13]))liczbaOk++;
              
              r.push({

                nrZlecenia:m[0],//nr zlecenia
                priorytet:m[1],//priorytet
                homag:m[2],//homag
                NR_ITEMU:m[3],//item
                OPIS:m[4],//item
                liczbaPalet:m[5],//liczba palet
                czaspracy:czas,//czas pracy w minutach
                starting:m[7],//początek pracy
                errorPoprawnosc:m[8],//niepoprawne dane
                errorKompletnosc:m[9],//błąd dane niekompletne
                errorItem:m[10],//błąd nie odnaleziono itemu
                sukcesDodano:m[11],//sukces: dodano item
                error:m[8]||m[9]||m[10]||m[13],
                checked:true,
                liczbasztuk:m[12],
                errorJuzJest:m[13],

              })

            })
    
            settabelka(r);
            setliczbadodawanych(liczbaOk);
    
          })
          .catch(err => {console.log(err)})
          event.target.value = null;
    
    }





  
    useEffect(() => {
      section.updateBoth(-1,-1);
    },[]);
  
    return(
        <div>
    <h1 className="alligned-title">Dodawanie Zleceń z Pliku .csv</h1>
    <div className="zPlikuLayout content">
   
          <PopupComponent resetPrevious={resetTabelka}  open={open} setOpen={setOpen} text={popupText} closeModal={closeModal}></PopupComponent>
          <Window maxsize={1000}  gridArea="okno1" text="WCZYTAJ ZLECENIA">
            Załaduj plik .csv z dysku. 
            <Uploadbutton name={file.name} uploadAction={(event)=>handleChange(event)}></Uploadbutton>
            <div className="promptPlaceDodawanie"><Prompt showPrompt={showPrompt} prompttext={promptText} hidePrompt={hideprompt}></Prompt></div>
            {tabelka.length>0?(<Tabelka showError={showError} flipCheckbox={flipCheckbox} tabelka={tabelka}></Tabelka>):("")}
            <div className="windowBottom">
            <div onClick={dodajZlecenia} className="buttonFloatRight"><ArrowButton enabled={liczbadodawanych>0}  text={"DODAJ "+liczbadodawanych+Koncowka(liczbadodawanych)}></ArrowButton></div>
            </div>
          </Window>
    
    </div>
    </div>);
  }




  function Uploadbutton({dane, uploadAction,name, value}) {
    return(
        <div className="outerUploadButton">
            
        <div>
            <input
            
            
              accept=".csv"
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={(event)=>uploadAction(event)}
            />
            <label style={{ width: "100%", height: "100%" }} htmlFor="file">
            <div className="inneruploadButton"><img src={upload} className="App-logo" alt="logo" height="70" /> </div>
            {name==""||!name?(""):(<div className="caption"><div className="captionExcel"><img src={excel}  alt="logo" height="25"/></div><div className="inlineCaption">{name}</div></div>)}
            
            </label>

        </div>

        </div>
    )

  }

  function Tabelka({tabelka, flipCheckbox, showError}){

    return(
      <div className="tabelkaDodawanie">
      {Header("ZLECENIE","PRIORYTET","HOMAG","PALETY","ITEM","OPIS ITEMU","CZAS", )}
      
      
     
        {tabelka.map((e, i) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
             {Wiersz(e.nrZlecenia,e.priorytet,e.homag,e.liczbaPalet,e.NR_ITEMU,e.OPIS,e.czaspracy,e.error,flipCheckbox,e.checked,i,showError)}
            </div>
          );
        })}
      
    </div>);

  }

  function Wiersz(zlecenie, priorytet, homag,lsztuk, item, opisItemu, czas, Zlecenierror, click,checked,id, showError) {
    return (
      <div onClick={()=>showError(id)} className={Zlecenierror?("wierszGridDodawanie wierszGridDodawanieError"):(checked?("wierszGridDodawanieChecked wierszGridDodawanie"):("wierszGridDodawanie"))}>
        <div className="checkboxDodawanie">
          {Zlecenierror?(<div className="errorCorrection"><img src={error}  alt="logo" height="20"/></div>):(
            <div className="checkBoxDodawanie">
            <Checkbox
            color="default"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            // defaultChecked={checked}
            onChange={()=>click(id)}
            checked={checked}
            
          />
          </div>
            // <input onChange={()=>click(id)} defaultChecked={checked} type="checkbox"></input>
          )}

        
        </div>
        <div className="gridLimit">{zlecenie}</div>
        <div className="gridLimit phoneDeleteDodawanie">{priorytet?("TAK"):("NIE")}</div>
        <div className="gridLimit">{homag}</div>
        <div className="gridLimit">{lsztuk}</div>
        <div className="gridLimit">{item}</div>
        <div className="phoneDeleteDodawanie gridLimit description">
           {opisItemu}
         <div className=" phoneDeleteDodawanie descriptionOnTop"></div>
         </div>
        <div className="gridLimit">{czas}</div>
      </div>



      // <div onClick={click} className={"wierszGrid " + (marked ? "marked" : "")}>
      //   <div className="gridLimit">{t1}</div>
      //   <div className="phoneDelete gridLimit description">
      //     {t2}
      //     <div className="descriptionOnTop"></div>
      //   </div>
      //   <div className="phoneDelete gridLimit">{i}</div>
      //   <div className="gridLimit description">
      //     {d.charAt(0).toUpperCase() + d.substring(1, d.length)}
      //     <div className="descriptionOnTop"></div>
      //   </div>
      //   <div className="phoneDelete gridLimit progress">{t3}</div>
      //   <div className="phoneDelete gridLimit">{t4}</div>
      //   <div>
      //     <div>{t5}</div>
      //   </div>
      //   <div className="gridLimit kolejka">{t6}</div>
      // </div>
    );
  }
  
  function Header(zlecenie, priorytet, homag, lsztuk, item, opisItemu, czas) {
    return (
      <div className="HeaderDodawanie">
        <div></div>
        <div className="gridLimit">{zlecenie}</div>
        <div className="gridLimit phoneDeleteDodawanie">{priorytet}</div>
        <div className="gridLimit">{homag}</div>
        <div className="gridLimit">{lsztuk}</div>
        <div className="gridLimit">{item}</div>
        <div className="gridLimit phoneDeleteDodawanie">{opisItemu}</div>
        <div className="gridLimit">{czas}</div>

      </div>
    );
  }





  export default Zpliku;
  