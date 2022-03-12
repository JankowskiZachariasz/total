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
import userIcon from "../../graphics/user.svg";
import itemCancel from "../../graphics/zlecenieCancel.png";
import addItem from "../../graphics/addItem.svg";
import TextInputBox from "../TextInputBox";
import ArrowButton from "../ArrowButton";
import PopupAmend from "../PopupAmend";
import zlecenieRepriotise from "../../graphics/zlecenieRepriotise.png";

import "./BazaItemow.css";
import "./KolejkaZlecen.css";
import "./Uzytkownicy.css";

  
  function Uzytkownicy({section, token, updateHistory, historyItself}) {

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState([{NR_ITEMU:"",OPIS:""}]);
    const [items, setitems] = React.useState([{NR_ITEMU:"",OPIS:""}]);
    const [wybrany, setwybrany] = React.useState("");
    const [itemWyswietlany, setitemWyswietlany] = React.useState("");
    const [addMode, setaddMode] = React.useState(1);

    const [opisEDIT, setopisEDIT] = React.useState("");
    const [sztukEDIT, setsztukEDIT] = React.useState("");
    const [czasObrEDIT, setczasObrEDIT] = React.useState("");
    const [dlugoscPaletyEDIT, setdlugoscPaletyEDIT] = React.useState("");
    const [poHomaguEDIT, setpoHomaguEDIT] = React.useState("");
    const [obroconyEDIT, setobroconyEDIT] = React.useState(false);

    const [name, setname] = React.useState("");
    const [surname, setsurname] = React.useState("");
    const [id, setid] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [repeatPassword, setrepeatPassword] = React.useState("");
    const [permZlecenia, setpermZlecenia] = React.useState("");
    const [permKolejka, setpermKolejka] = React.useState("");
    const [permItemy, setpermItemy] = React.useState("");
    const [permUzytko, setpermUzytko] = React.useState("");


    const [idEDIT, setidEDIT] = React.useState("");
    const [passwordEDIT, setpasswordEDIT] = React.useState("");
    const [repeatPasswordEDIT, setrepeatPasswordEDIT] = React.useState("");
    const [permZleceniaEDIT, setpermZleceniaEDIT] = React.useState("");
    const [permKolejkaEDIT, setpermKolejkaEDIT] = React.useState("");
    const [permItemyEDIT, setpermItemyEDIT] = React.useState("");
    const [permUzytkoEDIT, setpermUzytkoEDIT] = React.useState("");

    const [popupsun, setpopupsun] = React.useState(false);
    const [attamptedEdit, setattamptedEdit] = React.useState(false);
    const [attamptedCreate, setattamptedCreate] = React.useState(false);



    let scrollRef = useRef();
    let heightRef = useRef();
  
    useEffect(() => {
      section.updateBoth(4,1);
      intervalFunctionItemy(null,(i)=>{onItemyChange(i,historyItself().location.pathname.toString().substring(13,40))},token);
    },[]);

    const emptyCreateData = () => {

    setname("");
    setsurname("");
    setid("");
    setpassword("");
    setrepeatPassword("");
    setpermZlecenia("");
    setpermKolejka("");
    setpermItemy("");
    setpermUzytko("");

    }

    const prepareEditData = () => {


      setidEDIT(itemWyswietlany.id);
      setpasswordEDIT("");
      setrepeatPasswordEDIT("");
      setpermZleceniaEDIT(itemWyswietlany.permissions.substring(0,1)=="1"?(true):(false));
      setpermKolejkaEDIT(itemWyswietlany.permissions.substring(1,2)=="1"?(true):(false));
      setpermItemyEDIT(itemWyswietlany.permissions.substring(2,3)=="1"?(true):(false));
      setpermUzytkoEDIT(itemWyswietlany.permissions.substring(3,4)=="1"?(true):(false));

      }

    const editData = () =>{
      return ({
        id: idEDIT,
        password: passwordEDIT,
        repeatPassword: repeatPasswordEDIT,
        permZlecenia: permZleceniaEDIT,
        permKolejka: permKolejkaEDIT,
        permItemy: permItemyEDIT,
        permUzytko: permUzytkoEDIT,
      });
    }

    const createData = () =>{
      return ({
        name,
        surname,
        id,
        password,
        repeatPassword,
        permZlecenia,
        permKolejka,
        permItemy,
        permUzytko,
      });
    }

    const createDataSend = () =>{
      return ({
        name, surname, password, password2:repeatPassword, id, 
        permissions:(
          (permZlecenia==true?("1"):("0"))+
          (permKolejka==true?("1"):("0"))+
          (permItemy==true?("1"):("0"))+
          (permUzytko==true?("1"):("0"))
        )

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
            <h2>Czy na pewno chcesz usunąć użytkownika?</h2>

            {itemWyswietlany._id?(
              <div className="limitSzczegolyWidthBaza">
            <div className="allignChildren">
            <div className="inlineKolej"><img src={userIcon} className="cross" alt="logo" height="20" /></div>
            <div className="inlineKolej nazwaItemu">{itemWyswietlany.name+" "+itemWyswietlany.surname}</div>
                </div>
                <div>
                <div className="inlineKolej nazwaItemu">{itemWyswietlany.OPIS}</div>
                </div>
            </div>):("")}
            <div className="buttonPlacement">
              <div onClick={()=>deleteItem(()=>{ setitemWyswietlany({});setpopupsun(false);intervalFunctionItemy(null,onItemyChange,token);}, itemWyswietlany._id, token)} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={"USUŃ UŻYTKOWNIKA"}></ArrowButton></div>
            </div>

                  
              
   
    </div>
   </PopupAmend>
   
          <Window  gridArea="okno1" text="UŻYTKOWNICY">
          
          <div className="uzytkownicyGrid">

            <div className="addItemButton" onClick={()=>{setaddMode(2); setwybrany(""); setattamptedCreate(false); emptyCreateData();}}><div className="inlineAmmend ammendPhotoAdjust"><img src={addItem} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">DODAJ</div></div>
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
                     updateHistory("/uzytkownicy/"+newValue._id);
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
                     getOptionLabel={(option) => option.name+" "+option.surname}
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
                  updateHistory("/uzytkownicy/"+w);
                  setaddMode(1)
                  intervalFunctionItem(()=>{return w},
                  setitemWyswietlany,
                  token);
                }
                }wybrane={wybrany==m._id}></DrawItem>
             }):(null)}
           </div>
           
         </LiveDataManagerHistoria>
          </Window>

          {addMode==1?(
            <Window extraClasses="scrollKolejka2" gridArea="okno2" text="SZCZEGÓŁY UŻYTKOWNIKA">


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
                          <div className="inlineKolej"><img src={userIcon} className="cross" alt="logo" height="20" /></div>
                          <div className="inlineKolej nazwaItemu">{itemWyswietlany.name+" "+itemWyswietlany.surname}</div>
                            </div>
                            <div>
                            </div>
                            <div>{Dane(itemWyswietlany)}</div>
                      <div className="dostepneAkcjeItemowe">

                        <div className="ammendButton" onClick={()=>setpopupsun(true)}><div className="inlineAmmend ammendPhotoAdjust"><img src={itemCancel} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">USUŃ UŻYTKOWNIKA</div></div>

                        <div className="ammendButton" onClick={()=>{prepareEditData(); setaddMode(3); setattamptedEdit(false);}}><div className="inlineAmmend ammendPhotoAdjust"><img src={zlecenieRepriotise} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">EDYTUJ DANE UŻYTKOWNIKA</div></div>

                      </div>
                        </div>):("")}         
                      </div>
                      </LiveDataManagerZlecenie>
            
            
                </Window>
          ):(addMode==2?(
            <Window extraClasses="scrollKolejka2" gridArea="okno2" text="DODAWANIE UŻYTKOWNIKA">

            <div className="addingitemForm">

            <div className="formSpacingItemy">
              <InlineForm text="IMIĘ">
                <TextInputBox  error={!(name.toString().length>0)&&attamptedCreate} change={e =>{setname(e.target.value); }} value={name} type="text" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="NAZWISKO">
                <TextInputBox  error={!(surname.toString().length>0)&&attamptedCreate} change={e =>{setsurname(e.target.value); }} value={surname} type="text" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="ID">
                <TextInputBox  error={!(id.toString().length>0)&&attamptedCreate} change={e =>{setid(e.target.value); }} value={id} type="text" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="HASŁO">
                <TextInputBox  error={!(password.toString().length>5)&&attamptedCreate} change={e =>{setpassword(e.target.value); }} value={password} type="password" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="POWTÓRZ HASŁO">
                <TextInputBox  error={(!(repeatPassword.toString().length>5)||repeatPassword!=password)&&attamptedCreate} change={e =>{setrepeatPassword(e.target.value); }} value={repeatPassword} type="password" placeholder=""></TextInputBox>
              </InlineForm>
            </div>
            
            <div className="formSpacingItemy">
            <div className="uprawnieniaTitle">UPRAWNIENIA:</div>
              <InlineForm text="ZLECENIA">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermZlecenia(o=>!o)}
                    checked={permZlecenia}
                  />
                </div>
              </InlineForm>
              <InlineForm text="KOLEJKA">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermKolejka(o=>!o)}
                    checked={permKolejka}
                  />
                </div>
              </InlineForm>
              <InlineForm text="ITEMY">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermItemy(o=>!o)}
                    checked={permItemy}
                  />
                </div>
              </InlineForm>
              <InlineForm text="UŻYTKOWNICY">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermUzytko(o=>!o)}
                    checked={permUzytko}
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
                      ,token,createDataSend())}}}
             enabled text="UTWÓRZ UŻYTKOWNIKA"></ArrowButton></div>
            </div>
            
      
 
  
  
      </Window>
          ):(
            <Window extraClasses="scrollKolejka2" gridArea="okno2" text="EDYCJA UŻYTKOWNIKA">

            

            <div className="scrollZlecenia2">
                        {
                        itemWyswietlany._id?(
                          <div className="limitSzczegolyWidthBaza">
                        <div className="allignChildren">
                          <div className="inlineKolej"><img src={userIcon} className="cross" alt="logo" height="20" /></div>
                          <div className="inlineKolej nazwaItemu">{itemWyswietlany.name+" "+itemWyswietlany.surname}</div>
                            </div>
                            <div>
                            </div>
                            <div></div>
              </div>):("")}         
            </div>

            <div className="addingitemForm">

            <div className="formSpacingItemy">
              <InlineForm text="ID">
                <TextInputBox  error={!(idEDIT.toString().length>0)&&attamptedEdit} change={e =>{setidEDIT(e.target.value); }} value={idEDIT} type="text" placeholder=""></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="HASŁO">
                <TextInputBox  error={(!(passwordEDIT.toString().length>5)&&(passwordEDIT.toString()!=""))&&attamptedEdit} change={e =>{setpasswordEDIT(e.target.value); }} value={passwordEDIT} type="password" placeholder="(bez zmian)"></TextInputBox>
              </InlineForm>
            </div>

            <div className="formSpacingItemy">
              <InlineForm text="POWTÓRZ HASŁO">
                <TextInputBox  error={(repeatPasswordEDIT!=password)&&attamptedEdit} change={e =>{setrepeatPasswordEDIT(e.target.value); }} value={repeatPasswordEDIT} type="password" placeholder="(bez zmian)"></TextInputBox>
              </InlineForm>
            </div>
            
            <div className="formSpacingItemy">
            <div className="uprawnieniaTitle">UPRAWNIENIA:</div>
              <InlineForm text="ZLECENIA">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermZleceniaEDIT(o=>!o)}
                    checked={permZleceniaEDIT}
                  />
                </div>
              </InlineForm>
              <InlineForm text="KOLEJKA">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermKolejkaEDIT(o=>!o)}
                    checked={permKolejkaEDIT}
                  />
                </div>
              </InlineForm>
              <InlineForm text="ITEMY">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermItemyEDIT(o=>!o)}
                    checked={permItemyEDIT}
                  />
                </div>
              </InlineForm>
              <InlineForm text="UŻYTKOWNICY">
                <div className="floatcheckbox">
                  <Checkbox
                    color="default"
                    labelPlacement="start"
                    icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                    checkedIcon={<CheckBoxIcon fontSize="normal" />}
                    onChange={e=>setpermUzytkoEDIT(o=>!o)}
                    checked={permUzytkoEDIT}
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

        {WierszDanych("ID",data.id)}

        {WierszDanych("ZLECENIA",data.permissions.substring(0,1)==1?("DOSTĘP"):("BRAK DOSTEPU"))}
        {WierszDanych("KOLEJKA",data.permissions.substring(1,2)==1?("DOSTĘP"):("BRAK DOSTEPU"))}
        {WierszDanych("ITEMY",data.permissions.substring(2,3)==1?("DOSTĘP"):("BRAK DOSTEPU"))}
        {WierszDanych("UŻYTKOWNICY",data.permissions.substring(3,4)==1?("DOSTĘP"):("BRAK DOSTEPU"))}
        
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
  
    if(data.surname&&data.surname!="")
    return(
      <div onClick={()=>click(data._id)} className={wybrane?("archievedWybrane"):("archievedZlecenie")}>
  
      <div className="halfwiseGridItemy">
  
      <div className="allignChildren">
          <div className="inlineArchieved"><img src={userIcon} className="cross" alt="logo" height="20" /></div>
          <div className="inlineArchieved nazwaZlecenia">{data.name+" "+data.surname}</div>
          </div>
  
          <div className="allignChildren">
          <div className=" inlineArchieved czasArchieved">
           {"#"+data.id}
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
  
    fetch("http://192.168.0.189:8080/uzytkownicy/getData/", requestOptions)
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
    fetch("http://192.168.0.189:8080/uzytkownicy/getItem/"+zadanyitemID(), requestOptions)
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
    fetch("http://192.168.0.189:8080/uzytkownicy/deleteItem/"+zadanyitemID, requestOptions)
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
      data.id.toString().length>0&&
      (data.password.toString().length>5||data.password.toString()=="")&&
      data.repeatPassword==data.password&&
      (data.permZlecenia==true||data.permZlecenia==false)&&
      (data.permKolejka==true||data.permKolejka==false)&&
      (data.permItemy==true||data.permItemy==false)&&
      (data.permUzytko==true||data.permUzytko==false)
    )return true; else return false;
  }

  const checkDataCreateItem = (data) => {

    if(
      data.name.toString().length>0&&
      data.surname.toString().length>0&&
      data.id.toString().length>0&&
      data.password.toString().length>5&&
      data.repeatPassword.toString().length>5&&data.repeatPassword==data.password&&

      (data.permZlecenia==true||data.permZlecenia==false)&&
      (data.permKolejka==true||data.permKolejka==false)&&
      (data.permItemy==true||data.permItemy==false)&&
      (data.permUzytko==true||data.permUzytko==false)
    )return true; else return false;
  }

  const editItem = (onedited, zadanyitemID, token, data) => {
    const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    body: JSON.stringify({...data})};
  
    if(zadanyitemID!="")
    fetch("http://192.168.0.189:8080/uzytkownicy/editItem/"+zadanyitemID, requestOptions)
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
  
    fetch("http://192.168.0.189:8080/uzytkownicy/addItem", requestOptions)
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

  export default Uzytkownicy;
  