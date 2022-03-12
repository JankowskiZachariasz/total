import React, {useEffect, useRef} from "react";
import { Checkbox, FormControl } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Window from "../Window";
import InlineForm from "../InlineForm";
import TextField from "@material-ui/core/TextField";
import LiveDataManagerHistoria from "../LiveDataManagerHistoria";
import LiveDataManagerZlecenie from "../LiveDataManagerZlecenie";
import Db from "../../graphics/Db";
import itemCancel from "../../graphics/zlecenieCancel.png";
import addItem from "../../graphics/addItem.svg";
import TextInputBox from "../TextInputBox";
import ArrowButton from "../ArrowButton";
import PopupAmend from "../PopupAmend";
import zlecenieRepriotise from "../../graphics/zlecenieRepriotise.png";

import "./BazaItemow.css";
import "./KolejkaZlecen.css";

  
  function BazaItemow({section, token, updateHistory, historyItself}) {

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState([{NR_ITEMU:"",OPIS:""}]);
    const [items, setitems] = React.useState([{NR_ITEMU:"",OPIS:""}]);
    const [wybrany, setwybrany] = React.useState("");
    const [itemWyswietlany, setitemWyswietlany] = React.useState("");
    const [addMode, setaddMode] = React.useState(1);

    const [nrItemu, setnrItemu] = React.useState("");
    const [opis, setopis] = React.useState("");
    const [sztuk, setsztuk] = React.useState("");
    const [czasObr, setczasObr] = React.useState("");
    const [dlugoscPalety, setdlugoscPalety] = React.useState("");
    const [poHomagu, setpoHomagu] = React.useState("");
    const [obrocony, setobrocony] = React.useState(false);

    const [opisEDIT, setopisEDIT] = React.useState("");
    const [sztukEDIT, setsztukEDIT] = React.useState("");
    const [czasObrEDIT, setczasObrEDIT] = React.useState("");
    const [dlugoscPaletyEDIT, setdlugoscPaletyEDIT] = React.useState("");
    const [poHomaguEDIT, setpoHomaguEDIT] = React.useState("");
    const [obroconyEDIT, setobroconyEDIT] = React.useState(false);

    const [popupsun, setpopupsun] = React.useState(false);
    const [attamptedEdit, setattamptedEdit] = React.useState(false);
    const [attamptedCreate, setattamptedCreate] = React.useState(false);


    let scrollRef = useRef();
    let heightRef = useRef();
  
    useEffect(() => {
      section.updateBoth(3,1);
      intervalFunctionItemy(null,(i)=>{onItemyChange(i,historyItself().location.pathname.toString().substring(7,40))},token);

    },[]);

    const emptyCreateData = () => {
    setnrItemu("")
    setopis("")
    setsztuk("")
    setczasObr("")
    setdlugoscPalety("")
    setpoHomagu("")
    setobrocony("")
    }

    const prepareEditData = () => {

      setopisEDIT(itemWyswietlany.OPIS)
      setsztukEDIT(itemWyswietlany.L_SZTUK_NA_PALECIE)
      setczasObrEDIT(itemWyswietlany.CZAS_OBROBKI_PALETY)
      setdlugoscPaletyEDIT(itemWyswietlany.DLUGOSC_PALETY)
      setpoHomaguEDIT(itemWyswietlany.NR_ITEMU_PO_HOMAGU)
      setobroconyEDIT(itemWyswietlany.PALETA_W_POPRZEK)
      }

    const editData = () =>{
      return ({
        opisEDIT,sztukEDIT,czasObrEDIT,dlugoscPaletyEDIT,poHomaguEDIT,obroconyEDIT
      });
    }

    const createData = () =>{
      return ({
        nrItemu,opis,sztuk,czasObr,dlugoscPalety,poHomagu,obrocony:(obrocony==true?(true):(false))
      });
    }

    const onItemyChange = (itemy, pointed) =>{
      setitems(itemy)

      if(pointed&&pointed.toString().length>1){
        setwybrany(pointed.toString());
        var KtoryZkolei=0;
        for(var i=0;i<itemy.length;i++){
          if(pointed==itemy[i]._id)KtoryZkolei=i;
        }
        var calkowitaWysokosc=scrollRef.current.scrollHeight;
        var iloscItemow = itemy.length;
        var yPos=(calkowitaWysokosc/iloscItemow)*KtoryZkolei;
        intervalFunctionItem(()=>{return pointed},setitemWyswietlany,token);
        setaddMode(1)
        scrollRef.current.scrollTo({
          top: yPos,
          left: 0,
          behavior: 'smooth'
        });
        

      }
    }

  
    let attempted = false;

    return(
    <div className="HistoriaLayout content">
{/* POPUP USUWANIE ITEMU */}
<PopupAmend open={popupsun} setopen={(x)=>setpopupsun(x)}  onClose={()=>{ setpopupsun(false);}}>
    <div> 
            <h2>Czy na pewno chcesz usunąć item?</h2>

            {itemWyswietlany._id?(
              <div className="limitSzczegolyWidthBaza">
            <div className="allignChildren">
              <div className="inlineKolej"><Db></Db></div>
              <div className="inlineKolej nazwaItemu">{itemWyswietlany.NR_ITEMU}</div>
                </div>
                <div>
                <div className="inlineKolej nazwaItemu">{itemWyswietlany.OPIS}</div>
                </div>
            </div>):("")}
            <div className="buttonPlacement">
              <div onClick={()=>deleteItem(()=>{ setitemWyswietlany({});setpopupsun(false);intervalFunctionItemy(null,onItemyChange,token);}, itemWyswietlany._id, token)} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={"USUŃ ITEM"}></ArrowButton></div>
            </div>

                  
              
   
    </div>
   </PopupAmend>
   
          <Window  gridArea="okno1" text="BAZA ITEMÓW">
          
          <div className="addItemGrid">

            <div className="addItemButton" onClick={()=>{setaddMode(2); setwybrany(""); setattamptedCreate(false); emptyCreateData();}}><div className="inlineAmmend ammendPhotoAdjust"><img src={addItem} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">DODAJ ITEM</div></div>
            <div className="formSpacingItemy">
         
                <FormControl fullWidth>
                  <Autocomplete
                     value={value}
                     onChange={(event, newValue) => {
                       //console.log(newValue);
                     setValue(newValue);
                     if(newValue!=null){
                      setwybrany(newValue._id);
                     var KtoryZkolei=0;
                     for(var i=0;i<items.length;i++){
                       if(newValue._id==items[i]._id)KtoryZkolei=i;
                     }
                     var calkowitaWysokosc=scrollRef.current.scrollHeight;
                     var iloscItemow = items.length;
                     var yPos=(calkowitaWysokosc/iloscItemow)*KtoryZkolei;
                     intervalFunctionItem(()=>{return newValue._id},setitemWyswietlany,token);
                     setaddMode(1)
                     updateHistory("/itemy/"+newValue._id);
                        scrollRef.current.scrollTo({
                          top: yPos,
                          left: 0,
                          behavior: 'smooth'
                        });
                       
                     }
                     }}
                     inputValue={inputValue}
                     onInputChange={(event, newInputValue) => {
                     setInputValue(newInputValue);  
                     }}
                     noOptionsText="Nie odnaleziono itemu"
                     id="controllable-states-demo"
                     getOptionLabel={(option) => option.OPIS+" "+option.NR_ITEMU}
                     options={items}
                     label="Combo box"
                     style={{ width: "100%" }}
                     renderInput={(params) => <TextField placeholder="Wyszukaj..." error={(value==null||!value||value.item=="")&&attempted} {...params} />}
                  />
                </FormControl>
             
            </div>
  
          </div>
          
          <LiveDataManagerHistoria
          intervalFunction={intervalFunctionItemy}
          token={token}
          date={()=>{return  null;}}
          data={{ data: items, setdata: onItemyChange}}>
           <div ref={scrollRef} className="scrollBaza">
             {items[0]?items.map((m,i)=>{
               return <DrawItem key={i} data={m} 
               click={
                 (w)=>{
                  setwybrany(w);
                  updateHistory("/itemy/"+w);
                  setaddMode(1)
                  intervalFunctionItem(()=>{return w},
                  setitemWyswietlany,
                  token);
                }
                
                } wybrane={wybrany==m._id}></DrawItem>
             }):(null)}
           </div>
           
         </LiveDataManagerHistoria>
          </Window>

          {addMode==1?(
            <Window extraClasses="scrollKolejka2" gridArea="okno2" text="SZCZEGÓŁY ITEMU">


                      <LiveDataManagerZlecenie
                      intervalFunction={intervalFunctionItem}
                      token={token}
                      zlecenie={wybrany}
                      data={{ data: itemWyswietlany, setdata: setitemWyswietlany}}>
                        <div className="scrollZlecenia2">
                        {
                        itemWyswietlany._id?(
                          <div className="limitSzczegolyWidthBaza">
                        <div className="allignChildren">
                          <div className="inlineKolej"><Db></Db></div>
                          <div className="inlineKolej nazwaItemu">{itemWyswietlany.NR_ITEMU}</div>
                            </div>
                            <div>
                            <div className="inlineKolej nazwaItemu">{itemWyswietlany.OPIS}</div>
                            </div>
                            <div>{Dane(itemWyswietlany)}</div>
                      <div className="dostepneAkcjeItemowe">

                        <div className="ammendButton" onClick={()=>setpopupsun(true)}><div className="inlineAmmend ammendPhotoAdjust"><img src={itemCancel} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">USUŃ ITEM</div></div>

                        <div className="ammendButton" onClick={()=>{prepareEditData(); setaddMode(3); setattamptedEdit(false);}}><div className="inlineAmmend ammendPhotoAdjust"><img src={zlecenieRepriotise} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">EDYTUJ ITEM</div></div>

                      </div>
                        </div>):("")}         
                      </div>
                      </LiveDataManagerZlecenie>
            
            
                </Window>
          ):(addMode==2?(
            <Window extraClasses="scrollKolejka2" gridArea="okno2" text="DODAWANIE ITEMU">

            <div className="addingitemForm">

            <div className="formSpacingItemy">
              <InlineForm text="NUMER ITEMU">
                <TextInputBox  error={!(nrItemu.toString().length>0)&&attamptedCreate} change={e =>{setnrItemu(e.target.value); }} value={nrItemu} type="text" placeholder="M9018021"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="OPIS ITEMU">
                <TextInputBox error={!(opis.toString().length>0)&&attamptedCreate} change={e =>{setopis(e.target.value); }} value={opis} type="text" placeholder='czoło szuflady średnie'></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="SZTUK NA PALECIE">
                <TextInputBox error={(isNaN(parseInt(sztuk))||!(parseInt(sztuk)>0))&&attamptedCreate} change={e =>{setsztuk(e.target.value); }} value={sztuk} type="text" placeholder="120"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="CZAS OBRÓBKI PALETY (min)">
                <TextInputBox error={(isNaN(parseFloat(czasObr))||!(parseFloat(czasObr)>0))&&attamptedCreate} change={e =>{setczasObr(e.target.value); }} value={czasObr} type="text" placeholder="1.9 min"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="DŁUGOŚĆ PALETY (mm)">
                <TextInputBox error={(isNaN(parseInt(dlugoscPalety))||!(parseInt(dlugoscPalety)>0))&&attamptedCreate} change={e =>{setdlugoscPalety(e.target.value); }} value={dlugoscPalety} type="text" placeholder="1900 mm"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="ITEM PO HOMAGU">
                <TextInputBox error={!(poHomagu.toString().length>0)&&attamptedCreate} change={e =>{setpoHomagu(e.target.value); }} value={poHomagu} type="text" placeholder="S063SSP005805"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="PALETA OBRÓCONA">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setobrocony(o=>!o)}
                    checked={obrocony}
                  />
                </div>
              </InlineForm>
            </div>
            <div className="buttonFloatRight"><ArrowButton 
            zalogujClicked={()=>
              {setattamptedCreate(true);
                if(checkDataCreateItem(createData())){
                  addItemServer((id)=>{
                    setaddMode(1);
                    setwybrany(id);
                    intervalFunctionItemy(null,(i)=>onItemyChange(i,id),token);
                    intervalFunctionItem(()=>{
                      return itemWyswietlany._id},setitemWyswietlany,token);}
                      ,token,createData())}}}
             enabled text="UTWÓRZ ITEM"></ArrowButton></div>
            </div>
            
      
 
  
  
      </Window>
          ):(
            <Window extraClasses="scrollKolejka2" gridArea="okno2" text="EDYCJA ITEMU">

            <div className="addingitemForm">

            {itemWyswietlany._id?(
              <div className="limitSzczegolyWidthBaza">
            <div className="allignChildren">
              <div className="inlineKolej"><Db></Db></div>
              <div className="inlineKolej nazwaItemu">{itemWyswietlany.NR_ITEMU}</div>
                </div>
                <div>
                <div className="inlineKolej nazwaItemu">{itemWyswietlany.OPIS}</div>
                </div>

          
            </div>):("")}

            <div className="formSpacingItemy">
              <InlineForm text="OPIS ITEMU">
                <TextInputBox error={!(opisEDIT.toString().length>0)&&attamptedEdit} change={e =>{setopisEDIT(e.target.value);}} value={opisEDIT} type="text" placeholder='czoło szuflady średnie'></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="SZTUK NA PALECIE">
                <TextInputBox error={(isNaN(parseInt(sztukEDIT))||!(parseInt(sztukEDIT)>0))&&attamptedEdit} change={e =>{setsztukEDIT(e.target.value); }} value={sztukEDIT} type="text" placeholder="120"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="CZAS OBRÓBKI PALETY (min)">
                <TextInputBox error={(isNaN(parseFloat(czasObrEDIT))||!(parseFloat(czasObrEDIT)>0))&&attamptedEdit} change={e =>{setczasObrEDIT(e.target.value); }} value={czasObrEDIT} type="text" placeholder="1.9 min"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="DŁUGOŚĆ PALETY (mm)">
                <TextInputBox error={(isNaN(parseInt(dlugoscPaletyEDIT))||!(parseInt(dlugoscPaletyEDIT)>0))&&attamptedEdit} change={e =>{setdlugoscPaletyEDIT(e.target.value); }} value={dlugoscPaletyEDIT} type="text" placeholder="1900 mm"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="ITEM PO HOMAGU">
                <TextInputBox error={!(poHomaguEDIT.toString().length>0)&&attamptedEdit} change={e =>{setpoHomaguEDIT(e.target.value); }} value={poHomaguEDIT} type="text" placeholder="S063SSP005805"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="PALETA OBRÓCONA">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setobroconyEDIT(o=>!o)}
                    checked={obroconyEDIT}
                  />
                </div>
              </InlineForm>
            </div>
            <div className="buttonFloatRight"><ArrowButton 
            zalogujClicked={()=>
              {setattamptedEdit(true);
              if(checkDataEditItem(editData())){
                editItem(()=>{
                  setaddMode(1);
                  intervalFunctionItemy(null,onItemyChange,token);
                  intervalFunctionItem(()=>{
                    return itemWyswietlany._id},setitemWyswietlany,token);}
                    ,itemWyswietlany._id,token,editData())}}}
                    
            enabled text="ZAPISZ ZMIANY"></ArrowButton></div>
            </div>
            
      
 
  
  
      </Window>
          ))}

    
    </div>);
  }

  function Dane(data){

    var minuty = parseInt(data.CZAS_OBROBKI_PALETY);
    var sekundy = Math.round((parseFloat(data.CZAS_OBROBKI_PALETY).toFixed(2)%1)*60);
    var czas = minuty.toString()+"m "+(sekundy>0?(sekundy.toString()+"s"):(""));
 
    if(data._id)
    return(
      <div className="Dane">

        {WierszDanych("UŁOŻENIE",data.PALETA_W_POPRZEK!=true?("normalne"):("paleta obrócona"))}
        {WierszDanych("CZAS OBRÓBKI",czas)}
        {WierszDanych("SZTUK NA PALECIE",data.L_SZTUK_NA_PALECIE)}
        {WierszDanych("DŁUGOŚĆ PALETY",data.DLUGOSC_PALETY)}
        {WierszDanych("PLC ID",data.PLC_ID)}
        {WierszDanych("ITEM PO HOMAGU",data.NR_ITEMU_PO_HOMAGU)}

        
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

  function DrawItem({data,click,wybrane}){
  
    if(data.NR_ITEMU&&data.NR_ITEMU!="")
    return(
      <div onClick={()=>click(data._id)} className={wybrane?("archievedWybrane"):("archievedZlecenie")}>
  
      <div className="halfwiseGridItemy">
  
      <div className="allignChildren">
          <div className="inlineArchieved"><Db></Db></div>
          <div className="inlineArchieved nazwaZlecenia">{data.NR_ITEMU.toString().length>20?(data.NR_ITEMU.substring(0,17)+"..."):(data.NR_ITEMU)}</div>
          </div>
  
          <div className="allignChildren">
          <div className=" inlineArchieved czasArchieved">
           {data.OPIS}
          </div>
          </div>
  
  
      </div>
      </div>
    );
    else return null;
  }

  const intervalFunctionItemy = (empty, setdata, token) => {
    const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    };
  
    fetch("http://192.168.0.189:8080/itemy/getData/", requestOptions)
      .then((res) => res.json())
      .then((d) => {
        //console.log(d);
        if(d[0]){
          setdata(d);
        }
       
        else {
          setdata([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const intervalFunctionItem = (zadanyitemID, setdata, token) => {
    const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    };
  
    if(zadanyitemID()!="")
    fetch("http://192.168.0.189:8080/itemy/getItem/"+zadanyitemID(), requestOptions)
      .then((res) => res.json())
      .then((d) => {
        if(d._id)
        setdata(d);
  
        else {
          setdata({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteItem = (ondelete, zadanyitemID, token) => {
    const requestOptions = {method: "DELETE",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    };
  
    if(zadanyitemID!="")
    fetch("http://192.168.0.189:8080/itemy/deleteItem/"+zadanyitemID, requestOptions)
      .then((res) => res.json())
      .then((d) => {
        if(d._id == zadanyitemID)
        ondelete();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const checkDataEditItem = (data) => {
    if(
      data.opisEDIT.toString().length>0&&
      !isNaN(parseInt(data.sztukEDIT))&&(parseInt(data.sztukEDIT)>0)&&
      !isNaN(parseFloat(data.czasObrEDIT))&&(parseFloat(data.czasObrEDIT)>0)&&
      !isNaN(parseInt(data.dlugoscPaletyEDIT))&&(parseInt(data.dlugoscPaletyEDIT)>0)&&
      data.poHomaguEDIT.toString().length>0&&
      (data.obroconyEDIT==true||data.obroconyEDIT==false)
    )return true; else return false;
  }

  const checkDataCreateItem = (data) => {
    if(
      data.nrItemu.toString().length>0&&
      data.opis.toString().length>0&&
      !isNaN(parseInt(data.sztuk))&&(parseInt(data.sztuk)>0)&&
      !isNaN(parseFloat(data.czasObr))&&(parseFloat(data.czasObr)>0)&&
      !isNaN(parseInt(data.dlugoscPalety))&&(parseInt(data.dlugoscPalety)>0)&&
      data.poHomagu.toString().length>0&&
      (data.obrocony==true||data.obrocony==false)
    )return true; else return false;
  }

  const editItem = (onedited, zadanyitemID, token, data) => {
    const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    body: JSON.stringify({...data})};
  
    if(zadanyitemID!="")
    fetch("http://192.168.0.189:8080/itemy/editItem/"+zadanyitemID, requestOptions)
      .then((res) => res.json())
      .then((d) => {
        if(d._id == zadanyitemID)
        onedited();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addItemServer = (onCreated, token, data) => {
    const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    body: JSON.stringify({...data})};
  
    fetch("http://192.168.0.189:8080/itemy/addItem", requestOptions)
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        if(d._id)
        onCreated(d._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  export default BazaItemow;
  