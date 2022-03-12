  import React, {useEffect,useRef } from "react";
  import Window from "../Window";
  import "./KolejkaZlecen.css";
  import hmg from "../../graphics/hmg.png";
  import CanvasKolejka from "../CanvasKolejka";
  import CanvasCzasuKolejka from "../CanvasCzasuKolejka";
  import LiveDataManagerZlecenia from "../LiveDataManagerZlecenia";
  import LiveDataManagerZlecenie from "../LiveDataManagerZlecenie";
  import Status from "../Status";
  import Box from "../../graphics/Box_darker";
  import ProgressBar from "../ProgressBar";
  import zlecenieCancel from "../../graphics/zlecenieCancel.png";
  import zlecenieMove from "../../graphics/zlecenieMove.png";
  import priorityStar from "../../graphics/priorityStar.png";
  import timeZdarzenie from "../../graphics/timeZdarzenie.svg";
  import zlecenieRepriotise from "../../graphics/zlecenieRepriotise.png";
  import bufforowanie from "../../graphics/bufforowanie.png";
  import PopupAmend from "../PopupAmend";
  import InlineForm from "../InlineForm";
  import { Checkbox, FormControl } from "@material-ui/core";
  import CheckBoxIcon from "@material-ui/icons/CheckBox";
  import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
  import TextInputBox from "../TextInputBox";
  import ArrowButton from "../ArrowButton";
  import Prompt from "../Prompt";
  import cross from "../../graphics/cross.svg";

  const TIME_COLUMN_HOUR_HEIGHT = 200;
  const TIME_COLUMN_CANVAS_WIDTH = 100;
  const HOMAG_COLUMN_CANVAS_WIDTH = 250;
  const TIME_COLUMN_PIXEL_WIDTH = 60;
  //const HOMAG_COLUMN_PIXEL_WIDTH = 200;//->varies, is stored in the "zleceniaWidth" variable
  

  
  function KolejkaZlecen({section, updateHistory, kolejkaZlecen, token, historyItself}) {
  
    const [canvasPos,setcanvasPos] = React.useState({x:0,y:0});//says where the div is, taking its scroll into account
    const [mouseClickPosition,setmouseClickPosition] = React.useState({x:0,y:0});
    const [oneHourDiv,setoneHourDiv] = React.useState(0);

    const [pixelHeightTime,setpixelHeightTime] = React.useState(0);
    const [pixelHeightHomag,setpixelHeightHomag] = React.useState(0);
    const [chosenZlecenie,setchosenZlecenie] = React.useState("");
    const [zlecenieWyswietlane,setzlecenieWyswietlane] = React.useState({});
    const [pointedZlecenie,setpointedZlecenie] = React.useState("");
    
    const [openPopup, setopenPopup] = React.useState({a:false,b:false,c:false,d:false});
    const [openPrompt, setopenPrompt] = React.useState({a:true,b:true,c:true,d:true});
    const [komentarz, setkomentarz] = React.useState("");
    const [maszyna, setmaszyna] = React.useState(1);
    const [maszynaDocelowa, setmaszynaDocelowa] = React.useState(0);
    const [nowyPriorytet, setnowyPriorytet] = React.useState(1);
    const [zmianaHomagaEkran, setzmianaHomagaEkran] = React.useState(1);
    const [noweLinie, setnoweLinie] = React.useState("");

    var canvasRef = useRef();
    var scrollRef = useRef();

    useEffect(() => {
      
      section.updateBoth(2,1);
      window.addEventListener("scroll", () => handleScroll());
      window.addEventListener("resize", () => handleresize());
      handleresize();
      setpointedZlecenie(historyItself().location.pathname.toString().substring(9,20));
      pickPointedZlecenie();

    },[]);


    const onZleceniaChange = (data) => {

      // drawZlecenie(0,props.oneHourDiv*1.5,"Wieniec górny H8*1594x497,5x22,3*obr^06","785454/21",ctx,1,19,20)
      //yStart, yEnd, item, zlecenie, ctx, status ,paletyDostarczone, paletyWymagane
      var zleceniaBufor = [[],[],[]];
      var minutes = [0,0,0];
      var biggestQueue =0;
      //1.count minutes
      for(let h=0;h<3;h++){
        if(data[h])
        data[h].map((m,i)=>{
          var minnutesAdd = parseFloat(m.minuty);
          if(i==0)minnutesAdd = 45+minnutesAdd;
          if(i!=0&&minnutesAdd<30)minnutesAdd = 30;

          zleceniaBufor[h].push({
          
             yStart:i==0?(0):(minutes[h]),
             yEnd:minutes[h]+minnutesAdd, 
             item:m.opis, 
             PRIORYTET:m.PRIORYTET,
             zlecenie:m.zlecenie,  
             status:m.status,
             paletyDostarczone:m.dostarczona, 
             paletyWymagane:m.wymagana});

          minutes[h]+=minnutesAdd;
      
        });
        //2.pick the biggest count
        if(minutes[h]>biggestQueue)
        biggestQueue=minutes[h];
      }
      //4. add an hour for the initial span
      biggestQueue+=30;
      //3.convert to hours math.ceil
      var hours = Math.round(biggestQueue/60);
      //5.compute the heights
      setpixelHeightTime(Math.round(hours*TIME_COLUMN_HOUR_HEIGHT));
      setpixelHeightHomag(Math.round(hours*oneHourDiv));


      //console.log(biggestQueue);
      //console.log(data);

      //setzlecenia(zleceniaBufor);
      kolejkaZlecen.setdata(zleceniaBufor);
      pickPointedZlecenie();
    };

    const pickPointedZlecenie = () => {

      for(var homag=0;homag<3;homag++)
      kolejkaZlecen.data[homag].map((m,i)=>{
        if(m.zlecenie == pointedZlecenie){
          setpointedZlecenie(-1)
          setmaszyna(homag+1);
          setchosenZlecenie(m);
          var homagColumnRatio = canvasRef.current.clientWidth/HOMAG_COLUMN_CANVAS_WIDTH;
          var y1 = (m.yStart/60)*oneHourDiv*homagColumnRatio;
          scrollRef.current.scrollTo({
            top: y1-5,
            left: 0,
            behavior: 'smooth'
          });
          intervalFunction(()=>{return m.zlecenie}, setzlecenieWyswietlane, token);

        }

      })
    }

    const handleresize = () => {
      if (canvasRef.current != null) {
        setcanvasPos({
          x: canvasRef.current.getBoundingClientRect().x,
          y: canvasRef.current.getBoundingClientRect().y,
        });

        console.log()
        var timeColumnRatio = TIME_COLUMN_PIXEL_WIDTH/TIME_COLUMN_CANVAS_WIDTH;
        var pixelHourHeight = timeColumnRatio * TIME_COLUMN_HOUR_HEIGHT;
        var newHourDiv = Math.floor((HOMAG_COLUMN_CANVAS_WIDTH*pixelHourHeight)/canvasRef.current.clientWidth);
        if(newHourDiv!=oneHourDiv)
        setoneHourDiv(newHourDiv);
        //onZleceniaChange(zlecenia);

      }else console.log("no access")
    };

    const mouseClick = (ev) => {
      var x = Math.floor((ev.clientX - canvasPos.x));
      var y = Math.floor((ev.clientY - canvasPos.y ));

      var x1 = 0;
      var x2 = x1+canvasRef.current.clientWidth;
      var x3 = x2+canvasRef.current.clientWidth;
      var x4 = x3+canvasRef.current.clientWidth;


      var homag = x>x1&&x<x2?(0):(x>x2&&x<x3?(1):(x>x3&&x<x4?(2):(null)))

      var homagColumnRatio = canvasRef.current.clientWidth/HOMAG_COLUMN_CANVAS_WIDTH;

      

      if(homag!=null)
      kolejkaZlecen.data[homag].map((m,i)=>{
        var y1 = (m.yStart/60)*oneHourDiv*homagColumnRatio;
        var y2 = (m.yEnd/60)*oneHourDiv*homagColumnRatio;

        if(y>y1&&y<y2){

          setmaszyna(homag+1);
          setchosenZlecenie(m);
          intervalFunction(()=>{return m.zlecenie}, setzlecenieWyswietlane, token);
          updateHistory("/kolejka/"+m.zlecenie);

        }

      })

      console.log(x+", "+y)
      
    };
  
    const handleScroll = () => {
      if (canvasRef.current != null)
      setcanvasPos({
          x: canvasRef.current.getBoundingClientRect().x,
          y: canvasRef.current.getBoundingClientRect().y,
        });


    };

    const anulujZlecenie = (comment) => {

      

      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify({id: chosenZlecenie.zlecenie, comment: comment})};
      fetch("http://192.168.0.189:8080/zlecenia/usun", requestOptions)
      .then((res) => res.json())
      .then((data) => {console.log(data); 
      });

      setkomentarz("");


    }

    const zmianaBuforowania = ({Buforowanie}) => {

      var comment =komentarz;
     
      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify({id: chosenZlecenie.zlecenie,comment , BUFOROWANIE:(Buforowanie?(false):(true))})};
      fetch("http://192.168.0.189:8080/zlecenia/zmienbuforowanie", requestOptions)
      .then((res) => res.json())
      .then((data) => {console.log(data); 
      });

      setkomentarz("");

    }

    const zmianaPriorytetu = ({PRIORYTET}) => {

      console.log("attampting to change priority")
      var comment =komentarz;
     
      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify({id: chosenZlecenie.zlecenie,comment , PRIORYTET:PRIORYTET=="true"?("false"):("true")})};
      fetch("http://192.168.0.189:8080/zlecenia/zmianapriorytetu", requestOptions)
      .then((res) => res.json())
      .then((data) => {console.log(data); 
      });

      setkomentarz("");

    }

    const zmienHomaga = () => {

      var Oldhomag =zlecenieWyswietlane.zlecenie.HOMAG;
      var Newhomag  =maszynaDocelowa;
      var comment =komentarz;
     
      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify({id: chosenZlecenie.zlecenie,comment,Newhomag,Oldhomag,nowyPriorytet:(nowyPriorytet==1?(true):(false))})};
      fetch("http://192.168.0.189:8080/zlecenia/zmienhomaga", requestOptions)
      .then((res) => res.json())
      .then((data) => {console.log(data); 
      });

      setkomentarz("");
    }

    const ustawLinieBuforowania = (text) => {

      
      //console.log(numsSorted);

      var comment =komentarz;
      const requestOptions = {method: "POST",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
      body: JSON.stringify({id: chosenZlecenie.zlecenie,comment ,numsSorted: parseInt(text)})};
      fetch("http://192.168.0.189:8080/zlecenia/zmienlinie", requestOptions)
      .then((res) => res.json())
      .then((data) => {console.log(data); 
      });

      setkomentarz("");


    }

    var anulujwarning = 'Próbujesz wycofać zlecenie, którego buforowanie już się zaczęło. Palety powrócą do magazynu. Jeżeli zlecenie ma zostać wykonane przez inną maszynę, użyj opcji "ZMIEŃ HOMAGA".'
    var anuluj = 'Zlecenie zostanie usunięte.';
    var zmianaLinii = 'Wpisz nową liczbę wymaganych palet zlecenia. Nie może być ona niższa niż liczba palet, które zostały już zbuforowane.'


    const transition1 =  ()=>{console.log(maszynaDocelowa);setzmianaHomagaEkran(2); setopenPrompt({a:true, b:true, c:true,d:true})};

    return(
    <div className="kolejkaLayout content">

    {/* popupy usun zlecenie*/}
    <PopupAmend open={openPopup.a} setopen={(x)=>setopenPopup({a:x})} onClose={()=>{setopenPrompt({a:true, b:true, c:true,d:true}); setopenPopup({a:false})}}>
    <div>
            <h2>Anulowanie zlecenia</h2>
            <WybraneSummary zlecenieWyswietlane={zlecenieWyswietlane}></WybraneSummary>
  
            <div className="promptSection">
            {openPrompt.a&&zlecenieWyswietlane.zlecenie?(   
                (zlecenieWyswietlane.zlecenie.STATUS==1||zlecenieWyswietlane.zlecenie.STATUS==2)?(
                  <div className={"AnulujPromptOrange"}>
                  <div className="inline-prompt">{anulujwarning}</div>
                  <div className="inline-prompt"><img onClick={()=>setopenPrompt({a:false, b:false, c:false})} src={cross} className="cross" alt="logo" height="15" /></div>
                  </div>
                ):(
                  <div className={"AnulujPromptGreen"}>
                  <div className="inline-prompt">{anuluj}</div>
                  <div className="inline-prompt"><img onClick={()=>setopenPrompt({a:false, b:false, c:false})} src={cross} className="cross" alt="logo" height="15" /></div>
                  </div>
                )
            ):("")}
            </div>
            <div className="komentarzdiv"><TextInputBox change={e=>setkomentarz(e.target.value)} value={komentarz} type="text" placeholder="Dlaczego zmiana jest potrzebna?"></TextInputBox></div>
            <div className="buttonPlacement">
            <div onClick={()=>{anulujZlecenie(komentarz); setopenPopup({a:false}); setopenPrompt({a:true, b:true, c:true,d:true})}} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={"ANULUJ ZLECENIE"}></ArrowButton></div>
            </div>
          
    </div>
   </PopupAmend>

    {/* popupy zmiana homaga*/}
    <PopupAmend open={openPopup.b} setopen={(x)=>setopenPopup({b:x})} onClose={()=>{setopenPrompt({a:true, b:true, c:true,d:true}); setmaszynaDocelowa(0); setzmianaHomagaEkran(1); setopenPopup({b:false})}}>
    
    {zmianaHomagaEkran==1?(
    <div>

    <h2>Przenieś zlecenie na inną maszynę</h2>
    <WybraneSummary zlecenieWyswietlane={zlecenieWyswietlane}></WybraneSummary>

   
    {zlecenieWyswietlane.zlecenie?(   
                  <div className="formSpacing">
                    <HomagOption whichOne={1} maszyna={maszynaDocelowa} setmaszyna={setmaszynaDocelowa} original={zlecenieWyswietlane.zlecenie.HOMAG==1}></HomagOption>
                    <HomagOption whichOne={2} maszyna={maszynaDocelowa} setmaszyna={setmaszynaDocelowa} original={zlecenieWyswietlane.zlecenie.HOMAG==2}></HomagOption>
                    <HomagOption whichOne={3} maszyna={maszynaDocelowa} setmaszyna={setmaszynaDocelowa} original={zlecenieWyswietlane.zlecenie.HOMAG==3}></HomagOption>
                  </div>

                
    ):("")}
    


    <div className="komentarzdiv"><TextInputBox change={e=>setkomentarz(e.target.value)} value={komentarz} type="text" placeholder="Dlaczego zmiana jest potrzebna?"></TextInputBox></div>
    <div className="buttonPlacement">
    <div onClick={maszynaDocelowa>0?(()=>transition1()):(()=>{return ""})} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={"DALEJ"}></ArrowButton></div>
    </div>
  
</div>
    ):(
      <div>
         <h2>Wybierz nowy priorytet zlecenia</h2>
    <WybraneSummary zlecenieWyswietlane={zlecenieWyswietlane}></WybraneSummary>
    {/* (determineAvailability({kolejkaZlecen,maszynaDocelowa,priorytet = nowyPriorytet}) */}
    <div className="promptSection">
    {zlecenieWyswietlane.zlecenie&&openPrompt.b==true?( 
      <div>{determineAvailability({kolejkaZlecen,maszynaDocelowa,priorytet: nowyPriorytet, setopenPrompt})}</div>     
     ):("")}
     
    </div>

    <div className="formSpacing">
      <PriorityOption nazwa="Wysoki" checked={nowyPriorytet==1} setl={()=>setnowyPriorytet(1)}></PriorityOption>
      <PriorityOption nazwa="Niski" checked={nowyPriorytet==2} setl={()=>setnowyPriorytet(2)}></PriorityOption>
    </div>


    <div className="komentarzdiv"><TextInputBox change={e=>setkomentarz(e.target.value)} value={komentarz} type="text" placeholder="Dlaczego zmiana jest potrzebna?"></TextInputBox></div>
    <div className="buttonPlacement">
    <div onClick={()=>{setzmianaHomagaEkran(1); setopenPrompt({a:true, b:true, c:true,d:true})}} className=" popupInline"><ArrowButton enabled={true}  noArrow={true} text={"POWRÓT"}></ArrowButton></div>
    <div onClick={()=>{zmienHomaga(); setopenPrompt({a:true, b:true, c:true,d:true}); setopenPopup({b:false});}} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={"PRZENIEŚ ZLECENIE"}></ArrowButton></div>
    </div>
      </div>

    )}

   </PopupAmend>

    {/* popupy  zmiana priorytetu*/}
    <PopupAmend open={openPopup.c} setopen={(x)=>setopenPopup({c:x})}  onClose={()=>{ setopenPopup({c:false});}}>
    <div> 
            <h2>Zmień priorytet zlecenia</h2>
            <WybraneSummary zlecenieWyswietlane={zlecenieWyswietlane}></WybraneSummary>


              {typeof zlecenieWyswietlane.zlecenie != "undefined"?(
                 <div>
                  <div className="komentarzdiv"><TextInputBox change={e=>setkomentarz(e.target.value)} value={komentarz} type="text" placeholder="Dlaczego zmiana jest potrzebna?"></TextInputBox></div>
            <div className="buttonPlacement">
            <div onClick={()=>{zmianaPriorytetu({PRIORYTET:zlecenieWyswietlane.zlecenie.PRIORYTET}); setopenPrompt({a:true, b:true, c:true,d:true}); setopenPopup({c:false});}} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={zlecenieWyswietlane.zlecenie.PRIORYTET=="true"?("USTAW NISKI PRIORYTET"):("USTAW WYSOKI PRIORYTET")}></ArrowButton></div>
            </div>
                  </div>
              ):("")}
   
    </div>
   </PopupAmend>

    {/* steruj buforowaniem*/}
    <PopupAmend open={openPopup.d} setopen={(x)=>setopenPopup({d:x})}  onClose={()=>{ setopenPopup({d:false});}}>
    <div> 
            <h2>Steruj zezwoleniem na buforowanie</h2>
            <WybraneSummary zlecenieWyswietlane={zlecenieWyswietlane}></WybraneSummary>

              {typeof zlecenieWyswietlane.zlecenie != "undefined"?(
                 <div>

                  <div className="komentarzdiv"><TextInputBox change={e=>setkomentarz(e.target.value)} value={komentarz} type="text" placeholder="Dlaczego zmiana jest potrzebna?"></TextInputBox></div>
            <div className="buttonPlacement">
            <div onClick={()=>{zmianaBuforowania({Buforowanie:zlecenieWyswietlane.zlecenie.STATUS==2}); setopenPrompt({a:true, b:true, c:true,d:true}); setopenPopup({d:false});}} className="buttonFloatRight popupInline"><ArrowButton enabled={true} text={zlecenieWyswietlane.zlecenie.STATUS==2?("PRZERWIJ BUFOROWANIE"):("ZEZWÓL NA BUFOROWANIE")}></ArrowButton></div>
            </div>
                  </div>
              ):("")}
   
    </div>
   </PopupAmend>

   {/* ustaw nitki  */}
   <PopupAmend open={openPopup.e} setopen={(x)=>setopenPopup({e:x})}  onClose={()=>{ setopenPopup({e:false});}}>
    <div> 
            <h2>Zmień liczbę wymaganych palet.</h2>
            <WybraneSummary zlecenieWyswietlane={zlecenieWyswietlane}></WybraneSummary>

              {typeof zlecenieWyswietlane.zlecenie != "undefined"?(
                 <div>

            <div className="promptSection">
        
                  <div className={"AnulujPromptGreen"}>
                  <div className="inline-prompt">{zmianaLinii}</div>
                  <div className="inline-prompt"><img onClick={()=>setopenPrompt({a:false, b:false, c:false})} src={cross} className="cross" alt="logo" height="15" /></div>
                  </div>
          
            </div>

                  <div className="komentarzdiv"><TextInputBox error={!areLinieCorrect(noweLinie, zlecenieWyswietlane)} change={e=>setnoweLinie(e.target.value)} value={noweLinie} type="text" placeholder="wymagana liczba palet (np. 25)"></TextInputBox></div>
                  <div className="komentarzdiv"><TextInputBox change={e=>setkomentarz(e.target.value)} value={komentarz} type="text" placeholder="Dlaczego zmiana jest potrzebna?"></TextInputBox></div>
            <div className="buttonPlacement">
            <div onClick={()=>{setopenPrompt({a:true, b:true, c:true,d:true,e:true}); if(areLinieCorrect(noweLinie, zlecenieWyswietlane)){setopenPopup({e:false});ustawLinieBuforowania(noweLinie);}}} className="buttonFloatRight popupInline"><ArrowButton enabled={noweLinie!=""} text={"USTAW WYMAGANE PALETY"}></ArrowButton></div>
            </div>
                  </div>
              ):("")}
   
    </div>
   </PopupAmend>
  
    <Window extraClasses="scrollKolejka" gridArea="okno1" text="KOLEJKA ZLECEŃ">
     
    <div className="zleceniaGrid">
        <div className="kolumna">
          <div className="timeAligner"></div>
        </div>
        <div className="kolumna">
        <div className="kolumnaTop">
          <div>
            <div><Homag></Homag></div>
            <div className="homagCaption">{"Homag 1"}</div>
          </div>
        </div>
      </div>
      <div className="kolumna">
        <div className="kolumnaTop">
          <div>
            <div><Homag></Homag></div>
            <div className="homagCaption">{"Homag 2"}</div>
          </div>
        </div>
      </div>
      <div className="kolumna">
        <div className="kolumnaTop">
          <div>
            <div><Homag></Homag></div>
            <div className="homagCaption">{"Homag 3"}</div>
          </div>
        </div>
      </div>
      </div>
      <div className="outerScroll">
        <div className="innerScroll"></div>
        <div className="innerScrollBottom"></div>

        <React.Fragment>
      <div 
      ref = {scrollRef}
      onScroll={() => handleScroll()}
      onMouseDown={(env) => mouseClick(env)}
      className="zleceniaGrid scrollZlecenia">
        
        <LiveDataManagerZlecenia
        token={token}
          data={{ data: kolejkaZlecen.data, setdata: onZleceniaChange }}>
          <KolumnaCzasu hourInPixels={TIME_COLUMN_HOUR_HEIGHT} height={pixelHeightTime}></KolumnaCzasu>
          <KolumnaZlecen chosenZlecenie={chosenZlecenie} zlecenia={kolejkaZlecen.data[0]} height={pixelHeightHomag} canvasRef={canvasRef} oneHourDiv={oneHourDiv} homag={"Homag 1"}></KolumnaZlecen>
          <KolumnaZlecen chosenZlecenie={chosenZlecenie} zlecenia={kolejkaZlecen.data[1]} height={pixelHeightHomag} oneHourDiv={oneHourDiv} homag={"Homag 2"}></KolumnaZlecen>
          <KolumnaZlecen chosenZlecenie={chosenZlecenie} zlecenia={kolejkaZlecen.data[2]} height={pixelHeightHomag} oneHourDiv={oneHourDiv} homag={"Homag 3"}></KolumnaZlecen>
        </LiveDataManagerZlecenia>
      </div>
      </React.Fragment>
      </div>  
    </Window>
    <Window extraClasses="scrollKolejka2" gridArea="okno2" text="SZCZEGÓŁY ZLECENIA" >
      
    <LiveDataManagerZlecenie
    intervalFunction={intervalFunction}
    token={token}
    zlecenie={chosenZlecenie.zlecenie}
    data={{ data: zlecenieWyswietlane, setdata: setzlecenieWyswietlane}}>
      <div className="scrollZlecenia2">
      {zlecenieWyswietlane.zlecenie?(
        <div className="limitSzczegolyWidth">
      <div className="allignChildren">
        <div className="inlineKolej"><Box></Box></div>
        <div className="inlineKolej nazwaZlecenia">{zlecenieWyswietlane.zlecenie.NUMER_ZLECENIA}</div>
        <div className="inlineKolej statusKolejka">{Status(zlecenieWyswietlane.zlecenie.STATUS, //zlecenieWyswietlane.zlecenie.STATUS
          parseFloat(
            zlecenieWyswietlane.zlecenie.STATUS==1?
            (zlecenieWyswietlane.zlecenie.DOSTARCZONA_L_PALET/zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET*100):
            (zlecenieWyswietlane.zlecenie.ZBUFOROWANA_L_PALET/zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET*100)
          ))}</div>
          </div>
          <div>
            {(zlecenieWyswietlane.zlecenie&&zlecenieWyswietlane.item)?
          <ProgressBar
            liczbaA={zlecenieWyswietlane.zlecenie.ZBUFOROWANA_L_PALET} 
            liczbaB={zlecenieWyswietlane.zlecenie.DOSTARCZONA_L_PALET} 
            liczbaC={zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET} 
            czasObrobki={zlecenieWyswietlane.item.CZAS_OBROBKI_PALETY} 
            status = {zlecenieWyswietlane.zlecenie.STATUS}
          ></ProgressBar>:<div></div>}
      <div>{Dane(zlecenieWyswietlane)}</div>


      <div className="dostepneAkcje">
          <div className="ammendButton" onClick={()=>setopenPopup({a:true})}><div className="inlineAmmend ammendPhotoAdjust"><img src={zlecenieCancel} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">USUŃ ZLECENIE</div></div>
          <div className="ammendButton" onClick={()=>setopenPopup({b:true})}><div className="inlineAmmend ammendPhotoAdjust"><img src={zlecenieMove} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">ZMIEŃ HOMAGA</div></div>
          <div className="ammendButton" onClick={()=>setopenPopup({c:true})}><div className="inlineAmmend ammendPhotoAdjust"><img src={priorityStar} className="plc" alt="logo" height="22" /></div><div className="inlineAmmend">ZMIEŃ PRIORYTET</div></div>
          {zlecenieWyswietlane.zlecenie.STATUS==1?(""):(
            <div className="ammendButton" onClick={()=>setopenPopup({d:true})}><div className="inlineAmmend ammendPhotoAdjust"><img src={bufforowanie} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">STERUJ BUFOROWANIEM</div></div>
          )}
          {
            <div className="ammendButton" onClick={()=>setopenPopup({e:true})}><div className="inlineAmmend ammendPhotoAdjust"><img src={zlecenieRepriotise} className="plc" alt="logo" height="20" /></div><div className="inlineAmmend">KOREKTA LICZBY WYMAGANYCH PALET</div></div>
          }
          
       </div> 
       {Zdarzenia({zlecenieWyswietlane:zlecenieWyswietlane})}  
          </div>
      </div>):("")
     }
        
      </div>
    </LiveDataManagerZlecenie>
    

      
     

    </Window>
    
    </div>);
  }

  function areLinieCorrect(text, wybrane){
     if(!isNaN(parseInt(text))&&wybrane&&wybrane.zlecenie&&(parseInt(text)>=parseInt(wybrane.zlecenie.ZBUFOROWANA_L_PALET))&&parseInt(text)<500){
      return true;
     } else return false;
   
    
  }

  function determineAvailability({kolejkaZlecen,maszynaDocelowa,priorytet,setopenPrompt}){


    var nrHomaga = maszynaDocelowa;
    var prioczek = 0;
    var poz = 0;
    if(maszynaDocelowa>0&&maszynaDocelowa<4&&kolejkaZlecen.data){
    kolejkaZlecen.data[nrHomaga-1].map((m,i)=>{
      if((m.PRIORYTET=="true"||m.PRIORYTET==true)&&m.status==3)prioczek++;
    });
    poz = priorytet==1?(1):(1+prioczek);
    }

    return (
      <div className={"AnulujPromptGreen"}>
        <div className="inline-prompt">
          Zlecenie trafi na kolejkę zleceń oczekujących Homaga{" "+nrHomaga+" "}
          na pozycję {poz}.

        </div>
      <div className="inline-prompt"><img onClick={()=>setopenPrompt({a:false, b:false, c:false})} src={cross} className="cross" alt="logo" height="15" /></div>
      </div>
    );
  }

  function PriorityOption({nazwa, original, checked, setl}){

    return(
      <div className="row-InlineFormKolejka">
         <div className="formDescriptorKolejka">{nazwa}</div>
       <div className="limitWidthKolejka"><div></div>


      <div className="floatcheckbox">


{
               !original?(
                <Checkbox
                color="default"
                labelPlacement="start"
                icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                checkedIcon={<CheckBoxIcon fontSize="normal" />}
                onChange={e =>setl()}
                checked={checked}
              />
              ):(<div className="infoAlignmentOptions">(OBECNY PRIORYTET)</div>)
       }


      </div>
      </div>
       </div>
     
  
    
    
    );

  }

  function BuforowanieOption({nazwa, original, checked, setl}){

    return(
      <div className="row-InlineFormKolejka">
         <div className="formDescriptorKolejka">{nazwa}</div>
       <div className="limitWidthKolejka"><div></div>


      <div className="floatcheckboxBuforowanie">


{
               !original?(
                <Checkbox
                color="default"
                labelPlacement="start"
                icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                checkedIcon={<CheckBoxIcon fontSize="normal" />}
                onChange={e =>setl()}
                checked={checked}
              />
              ):(<div className="infoAlignmentOptionsBuforowanie">(OBECNIE USTAWIONE)</div>)
       }


      </div>
      </div>
       </div>
     
  
    
    
    );

  }

  function HomagOption({whichOne, maszyna, setmaszyna, original}){
    
    return(
      
      <div className="row-InlineFormKolejka">
         <div className="formDescriptorKolejka">{"HOMAG "+whichOne}</div>
       <div className="limitWidthKolejka"><div>
         {
               !original?(
                <Checkbox
                color="default"
                labelPlacement="start"
                icon={<CheckBoxOutlineBlankIcon fontSize="normal"/>}
                checkedIcon={<CheckBoxIcon fontSize="normal" />}
                onChange={e =>setmaszyna(whichOne)}
                checked={maszyna==whichOne}
              />
              ):(<div className="infoAlignmentOptions">(OBECNIE USTAWIONY)</div>)
       }
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
    
    if(data.zlecenie&&data.item)
    return(
      <div className="Dane">
        {WierszDanych("NUMER ZLECENIA",data.zlecenie.NUMER_ZLECENIA)}
        {WierszDanych("PLC ID",data.zlecenie.PLC_ID)}
        {WierszDanych("ITEM",data.item.NR_ITEMU)}
        {WierszDanych("HOMAG",data.zlecenie.HOMAG)}
        {WierszDanych("ZLECIŁ(A)",zlecajacy.name+" "+zlecajacy.surname)}
        {data.zlecenie.PRIORYTET?(WierszDanych("PRIORYTET",data.zlecenie.PRIORYTET=="true"?("TAK"):("NIE"))):("")}
        {WierszDanych("PRZYPISANE LINIE", linie)}
        {WierszDanych("LICZBA SZTUK",data.zlecenie.WYMAGANA_L_SZTUK)}
        {WierszDanych("PALETY WYMAGANE",data.zlecenie.WYMAGANA_L_PALET)}
        {WierszDanych("PALETY ZBUFOROWANE",data.zlecenie.ZBUFOROWANA_L_PALET)}
        {WierszDanych("PALETY DOSTARCZONE",data.zlecenie.DOSTARCZONA_L_PALET)}
        
        
      </div>);
    else return(<div></div>)
  }

  function WierszDanych(n, d){
    if(d!=null)
    return(
      <div>
      <div className="row-InlineFormM">
      <div className="formDescriptorM">{n}</div>
    <div className="limitWidthM infoAlignment">{d.toString().toUpperCase()}</div>
   </div>
   </div>
    );else return(<div></div>);
  }

 // eslint-disable-next-line react/display-name
 const KolumnaCzasu = React.memo(({height,hourInPixels}) => {
    return (
      <div className="kolumna">
        <CanvasCzasuKolejka hourInPixels={hourInPixels} height={height} lastHour></CanvasCzasuKolejka>
      </div>
    );
  });

  // eslint-disable-next-line react/display-name
  const KolumnaZlecen = React.memo(({homag, canvasRef, oneHourDiv, height, zlecenia, chosenZlecenie}) => {
    return (
      <div  ref={canvasRef}  className="kolumna">
        <CanvasKolejka chosenZlecenie={chosenZlecenie.zlecenie} zlecenia={zlecenia} height={height} oneHourDiv={oneHourDiv}></CanvasKolejka>
      </div>
    );
  });

  function Homag() {
    return (
      <div>
        <img style={{transform: "rotate(90deg)"}} src={hmg} className="Homag_picture_" alt="logo" height="40" />
      </div>
    );
  }

  function WybraneSummary({zlecenieWyswietlane}){

    if(zlecenieWyswietlane.zlecenie)
    return (
      <div className="allignChildren">
      <div className="inlineKolej"><Box></Box></div>
      <div className="inlineKolej nazwaZlecenia">{zlecenieWyswietlane.zlecenie.NUMER_ZLECENIA}</div>
      <div className="inlineKolej statusKolejka">{Status(zlecenieWyswietlane.zlecenie.STATUS, //zlecenieWyswietlane.zlecenie.STATUS
        parseFloat(
          zlecenieWyswietlane.zlecenie.STATUS==1?
          (zlecenieWyswietlane.zlecenie.DOSTARCZONA_L_PALET/zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET*100):
          (zlecenieWyswietlane.zlecenie.ZBUFOROWANA_L_PALET/zlecenieWyswietlane.zlecenie.WYMAGANA_L_PALET*100)
        ))}</div>
      </div>
    );
    else return(<div></div>);
  }

  const intervalFunction = (zlecenie, setdata, token) => {
    const requestOptions = {method: "GET",headers: {"Content-Type": "application/json",Accept: "application/json", authorization: ("b " + token.data) },
    };
  
    if(zlecenie()!="")
    fetch("http://192.168.0.189:8080/zlecenia/getZlecenie/"+zlecenie(), requestOptions)
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
    console.log(users)
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
  
  export default KolejkaZlecen;
  