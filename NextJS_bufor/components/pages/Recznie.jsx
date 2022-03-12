import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, FormControl } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Window from "../Window";
import InlineForm from "../InlineForm";
import TextInputBox from "../TextInputBox";
import TextField from "@material-ui/core/TextField";
import DropDown from "../DropDown";
import Koncowka from "../functions/Koncowka"
import OnlyDigits from "../functions/OnlyDigits"
import PopupComponent from "../PopupComponent";
import Prompt from "../Prompt";
import ArrowButton from "../ArrowButton";
import "./Recznie.css";
import Box_darker from "../../graphics/Box_darker.jsx";
import excel from "../../graphics/excel.svg";
import error from "../../graphics/error.svg";

function Recznie({ section, token, updateHistory }) {

  const [attempted, setattempted] = React.useState(false);
  const [zlecenie, setzlecenie] = React.useState("");
  const [liczbaSztuk, setliczbaSztuk] = React.useState("");
  const [maszyna, setmaszyna] = React.useState(10);
  const [priorytet, setpriorytet] = React.useState(false);
  const [options, setoptions] = React.useState([]);
  const [value, setValue] = React.useState({item:"",opis:""});
  const [inputValue, setInputValue] = React.useState({item:"",opis:""});
  const [popupText, setpopupText] = React.useState("");
  const [open, setOpen] = useState(false);
  const [sekcja, setsekcja] = useState(1);
  const [finalDane, setfinalDane] = useState({});

  const [showPrompt, setshowPrompt] = useState(true);

  const fetchitems = () => {
    const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) }};
      fetch("http://192.168.0.189:8080/itemy/getData", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setoptions(data.map(m=>{return ({item:m.NR_ITEMU, opis:m.OPIS, L_SZTUK_NA_PALECIE: m.L_SZTUK_NA_PALECIE, PALETA_W_POPRZEK: m.PALETA_W_POPRZEK, CZAS_OBROBKI_PALETY:m.CZAS_OBROBKI_PALETY})}));})
    
  }

  useEffect(() => {
    section.updateBoth(-1, -1);
    fetchitems();
  }, []);


  const resetTabelka = () =>{
      
    window.scrollTo(0, 0)
    setattempted(false);
  }


  const checkerrors = () => {
    
    

      var errorZlecenie=false;
      var errorItem=false;
      var errorLiczbasztuk=false;
      if (zlecenie=="")errorZlecenie=true;
      if (value==null||!value||value.item=="")errorItem=true;
      if (liczbaSztuk==""||!OnlyDigits(liczbaSztuk))errorLiczbasztuk=true;
      return(errorZlecenie||errorItem||errorLiczbasztuk);

  }

  const checkZlecenie = () =>{
    setattempted(true);
    var submitData = {
      nrZlecenia:zlecenie ,
      homag: (maszyna==10?(1):(maszyna==20?(2):(3))),
      NR_ITEMU: value.item,
      priorytet: priorytet,
      liczbasztuk: liczbaSztuk,
    }

    if(!checkerrors()){

      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify([{...submitData}])};
      fetch("http://192.168.0.189:8080/zlecenia/zlecenieIstnieje", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.status){
          if(data.status=="ok"){

            
            var itemFound;
            options.map(m=>{
              if(m.item+" "+m.opis==inputValue)
              itemFound=m;
            })
            var lPalet = Math.ceil(liczbaSztuk/itemFound.L_SZTUK_NA_PALECIE);
            const skladowe = itemFound.CZAS_OBROBKI_PALETY.split(',');
              if(skladowe[0]&&skladowe[1])
              itemFound.CZAS_OBROBKI_PALETY=skladowe[0]+"."+skladowe[1];
              var czas = parseFloat(itemFound.CZAS_OBROBKI_PALETY)*lPalet;
              var lgodz=Math.floor(czas/60);
              console.log(lgodz)
              czas-=(lgodz*60);
              var czasTekst = lgodz>0?(lgodz+" godz. "+Math.floor(czas)+" minut(y)"):(Math.floor(czas)+" minut(y)")



           setfinalDane({
              NAZWA_ZLECENIA:zlecenie,
              ITEM:itemFound.item,
              MASZYNA:(maszyna==10?(1):(maszyna==20?(2):(3))),
              ZLECIŁA:data.user,
              PRIORYTET:(priorytet==true?("TAK"):("NIE")),
              LICZBA_SZTUK:liczbaSztuk,
              LICZBA_PALET:lPalet,
              PALETA_W_POPRZEK:itemFound.PALETA_W_POPRZEK,
              CZAS_PRACY:czasTekst,
              POCZATEK_PRACY:"TO DO"//TODO
            });

            
            
            
            setsekcja(2);}
          else if(data.status=="error"){
            setpopupText("W bazie danych istnieje już zlecenie o tym numerze. Nic nie dodano.");
            setOpen(true);
          }
        }
      })


    }

  }

  const sumbitForm = () =>{

    setattempted(true);

    if(!checkerrors()){
      console.log("no errors")

      var submitData = {
        nrZlecenia:zlecenie ,
        homag: (maszyna==10?(1):(maszyna==20?(2):(3))),
        NR_ITEMU: value.item,
        priorytet: priorytet,
        liczbasztuk: liczbaSztuk,
      }



      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify([{...submitData}])};
      fetch("http://192.168.0.189:8080/zlecenia/dodaj", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log([data]);
        if(data&&data.error==false){
          setattempted(false);
          //updateHistory("/kolejka");
          setpopupText("Dodano "+data.count+Koncowka(data.count).toLowerCase()+".");
          setOpen(true);
          setzlecenie("");
          setValue({item:"",opis:""});
          setliczbaSztuk("");
          setmaszyna(10);
          setpriorytet(false);
          setsekcja(1);
          setfinalDane({});
          fetchitems();

        }
        else{
          setpopupText("W bazie danych istnieje już zlecenie o tym numerze. Nic nie dodano.");
          setOpen(true);
        }
      })



    }
    
  }

  

  return (
    <div>
      <h1 className="alligned-title">
        Dodawanie Zleceń - Wprowadzanie Ręczne{" "}
      </h1>
      <div className="RecznieLayout content">
        {/* <PopupComponent resetPrevious={resetTabelka}  open={open} setOpen={setOpen} text={popupText} closeModal={closeModal}></PopupComponent> */}
        <PopupComponent resetPrevious={resetTabelka}  open={open} setOpen={setOpen} text={popupText} closeModal={()=>setOpen(false)}></PopupComponent>
        <Window maxsize={700} gridArea="okno1" text="STWÓRZ NOWE ZLECENIE">
         
         
          <div className={sekcja==1?("FormBinder"):("FormBinder hideSection")}>
            <div className="formSpacing">
              <InlineForm text="NAZWA ZLECENIA">
                <TextInputBox error={zlecenie==""&&attempted} change={e =>{setzlecenie(e.target.value); }} value={zlecenie} type="text" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacing">
              <InlineForm text="ITEM">
                <FormControl fullWidth>
                  <Autocomplete
                     value={value}
                     onChange={(event, newValue) => {
                       setValue(newValue);
                     }}
                     inputValue={inputValue}
                     onInputChange={(event, newInputValue) => {
                       setInputValue(newInputValue);
                     }}
                     noOptionsText="Nie odnaleziono itemu"
                     id="controllable-states-demo"
                     getOptionLabel={(option) => option.item + " " + option.opis}
                     options={options}
                     label="Combo box"
                     style={{ width: "100%" }}
                     renderInput={(params) => <TextField error={(value==null||!value||value.item=="")&&attempted} {...params}   />}
                  />
                </FormControl>
              </InlineForm>
            </div>

            <div className="formSpacing">
              <InlineForm text="LICZBA SZTUK">
                <TextInputBox error={(liczbaSztuk==""||!OnlyDigits(liczbaSztuk))&&attempted}  change={e=>{setliczbaSztuk(e.target.value);}} value={liczbaSztuk} type="text" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacing">
              <InlineForm text="MASZYNA">
                <DropDown
                index={maszyna}
                setIndex={e =>setmaszyna(e)}
                  opt={[
                    { value: "10", text: "HOMAG 1" },
                    { value: "20", text: "HOMAG 2" },
                    { value: "30", text: "HOMAG 3" },
                  ]}
                ></DropDown>
              </InlineForm>
            </div>

            <div className="formSpacingPriority">
              <InlineForm text="PRIORYTET">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e =>setpriorytet(o=>!o)}
                    checked={priorytet}
                  />
                </div>
              </InlineForm>
            </div>
          </div>

          <div className={sekcja==2?("FormBinder"):("FormBinder hideSection")}>
            <Podsumowanie finalDane={finalDane} zlecenie={zlecenie} showPrompt={showPrompt} setshowPrompt={setshowPrompt}></Podsumowanie>
            </div>

          {sekcja==1?(
            <div className="buttonSectionReczne"><div className="buttonFloatRight"><ArrowButton zalogujClicked={()=>{checkZlecenie(); setshowPrompt(true)}} enabled text="DO PODSUMOWANIA"></ArrowButton></div></div>
          ):(
            <div className="buttonSectionReczne">

              <div className="buttonFloatLeft"><ArrowButton noArrow={true} zalogujClicked={()=>setsekcja(1)} enabled text="POWRÓT"></ArrowButton></div>
              
              <div className="buttonFloatRight"><ArrowButton zalogujClicked={()=>sumbitForm()} enabled text="DODAJ ZLECENIE"></ArrowButton></div>
              
            </div>
          )

          }
         
          
        
        </Window>
      </div>
    </div>
  );
}

function Podsumowanie({zlecenie, finalDane, showPrompt, setshowPrompt}){

return(
<div>
<div className="inlineZlecenie">
<div className="inlineZlecenieObrazek"><Box_darker></Box_darker></div>
<div className="inlineZlecenieText">{"Zlecenie #"+zlecenie}</div>
</div>

<div className="zlecenieDaneMargin">
<Prompt showPrompt={showPrompt&&finalDane.PALETA_W_POPRZEK} prompttext={"Dodajesz zlecenie z itemem na obróconych paletach. Upewnij się czy jest to poprawne."} hidePrompt={()=>setshowPrompt(false)}></Prompt>
<InlineForm text="NAZWA ZLECENIA">
  <div className="daneZlecenia">{finalDane. NAZWA_ZLECENIA}</div>
</InlineForm>

<InlineForm text="ITEM">
<div className="daneZlecenia">{finalDane.ITEM}</div>
</InlineForm>

<InlineForm text="MASZYNA">
<div className="daneZlecenia">{finalDane.MASZYNA==1?("HOMAG 1"):(finalDane.MASZYNA==2?("HOMAG 2"):("HOMAG 3"))}</div>
</InlineForm>

<InlineForm text="ZLECIŁ/A">
  <div className="daneZlecenia">{finalDane.ZLECIŁA}</div>
</InlineForm>

<InlineForm text="PRIORYTET">
  <div className="daneZlecenia">{finalDane.PRIORYTET}</div>
</InlineForm>

<InlineForm text="LICZBA SZTUK">
  <div className="daneZlecenia">{finalDane.LICZBA_SZTUK}</div>
</InlineForm>

<InlineForm text="LICZBA PALET">
  <div className="daneZlecenia">{finalDane.LICZBA_PALET}</div>
</InlineForm>

<InlineForm red={finalDane.PALETA_W_POPRZEK} text="PALETA W POPRZEK">
  <div style={finalDane.PALETA_W_POPRZEK?({color:"red", fontWeight:"bold"}):({})} className="daneZlecenia">{finalDane.PALETA_W_POPRZEK?("TAK"):("NIE")}</div>
</InlineForm>

<InlineForm text="CZAS PRACY">
  <div className="daneZlecenia">{finalDane.CZAS_PRACY}</div>
</InlineForm>

<InlineForm text="POCZĄTEK PRACY">
  <div className="daneZlecenia">{finalDane.POCZATEK_PRACY}</div>
</InlineForm>
</div>



</div>


);

}


export  default   Recznie;

