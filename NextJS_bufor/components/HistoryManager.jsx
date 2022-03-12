import { useHistory, useLocation } from "react-router-dom";
import React, { Component } from "react";
import NaviagtionMenu from "./NaviagtionMenu";
import TopNavbar from "./TopNavbar";
import Login from "./pages/Login";
import DodawanieZlecen from "./pages/DodawanieZlecen";
import KolejkaZlecen from "./pages/KolejkaZlecen";
import Zpliku from "./pages/Zpliku";
import Recznie from "./pages/Recznie";
import HistoriaZlecen from "./pages/HistoriaZlecen";
import BazaItemow from "./pages/BazaItemow";
import Uzytkownicy from "./pages/Uzytkownicy";
import Zdarzenia from "./pages/Zdarzenia";

function HistoryManager({section, form, login,token,name, dodawanie, zpliku,kolejka, recznie, kolejkaZlecen, historiaZlecen, historyZlecenia, itemySection, uzytkownicy, zdarzenia}) {
  let history = useHistory();

  const Updatehistory = (path)=> {
    history.push(path);
  }

  const historyItself = ()=> {
    return history;
  }


  const location = useLocation();

  return (
    zdarzenia==true? <Zdarzenia token={token} updateHistory={Updatehistory} section={section} historyItself={historyItself}></Zdarzenia>:
    uzytkownicy==true? <Uzytkownicy token={token} updateHistory={Updatehistory} section={section} historyItself={historyItself}></Uzytkownicy>:
    itemySection==true? <BazaItemow token={token} updateHistory={Updatehistory} section={section} historyItself={historyItself}></BazaItemow>:
    historiaZlecen==true? <HistoriaZlecen historyZlecenia={historyZlecenia} token={token} updateHistory={Updatehistory} section={section} historyItself={historyItself}></HistoriaZlecen>:
    recznie==true? <Recznie token={token} updateHistory={Updatehistory} section={section} ></Recznie>:
    kolejka==true? <KolejkaZlecen token={token} kolejkaZlecen={kolejkaZlecen} updateHistory={Updatehistory} section={section} historyItself={historyItself}></KolejkaZlecen>:
    zpliku==true? <Zpliku updateHistory={Updatehistory} token={token} section={section}></Zpliku>:
    dodawanie==true?<DodawanieZlecen updateHistory={Updatehistory} section={section} ></DodawanieZlecen>:
    login==true?(<Login updateHistory={Updatehistory} token={token}></Login>):
    (form==true?(location.pathname=="/login"?(<div></div>):(<NaviagtionMenu section={section} updateHistory={Updatehistory}></NaviagtionMenu>))
    :(<TopNavbar token={token} name={name} login={location.pathname=="/login"} section={section} updateHistory={Updatehistory}></TopNavbar>))
    
  );
}

export default HistoryManager;