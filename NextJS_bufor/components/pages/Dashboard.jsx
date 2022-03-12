import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Window from "../Window";
import Status from "../Status";
import LiveDataManager from "../LiveDataManagerPalety";
import LiveDataManagerZlecenia from "../LiveDataManagerZlecenia";
import LiveDataManagerDostarczenia from "../LiveDataManagerDostarczenia";
import CanvasProgress from "../CanvasProgress";
import TimelineCanvas from "../TimelineCanvas";
import ProgressLine from "../ProgressLine";
import Annotation from "../Annotation";
import dropdownArrow from "../../graphics/dropdownArrowDarker.svg";
import queued from "../../graphics/queued.png";
import "./Dashboard.css";
import hmg from "../../graphics/hmg.png";
import disableScroll from 'disable-scroll';


function preventDefault(e){
  e = e || window.event
  if (e.preventDefault) {
    e.preventDefault()
  }
}


function Dashboard({init, section, zlecenia,dostarczenia,setdostarczenia, token }) {
  let history = useHistory();
  const [idColored, setidColored] = React.useState("!@##$^$#@$^hh");
  const [homagWybrany, sethomagWybrany] = React.useState(0);
  const [kolejkowany, setkolejkowany] = React.useState(0);
  const [data, setdata] = React.useState([]);
  // const [dostarczenia, setdostarczenia] = React.useState([]);
  
  const [scale, setscale] = React.useState(1);
  const [position, setposition] = React.useState({x: -20000, y: -20000, idStolu: -1, strona:-1 });//strona:1-lewa, 2-prawa
  const [Timelinescale, setTimelinescale] = React.useState(10);
  const [OndragTimelinescale, setOndragTimelinescale] = React.useState(0);
  const [touch, settouch] = React.useState({x:-1,y:-1});

  const [h1, seth1] = useState(0);
  const [h2, seth2] = useState(0);
  const [h3, seth3] = useState(0);



  
  if (true) {//__isBrowser__\\
    if(window.__initialData__&&window.__initialData__.zlecenia){
      let initialData=[];
      initialData = window.__initialData__.zlecenia;
      delete window.__initialData__.zlecenia;
      zlecenia.setdata(initialData);
    }
  } 
  
  




  const disableScroll = () => {
    window.addEventListener('wheel', preventDefault, {
      passive: false,
    })
    }

    const enableScroll = () => {
      window.removeEventListener('wheel', preventDefault)
    }

    const handleScroll = (event) => {
        if (event.deltaY > 0) {
          if(Timelinescale>1)
          setTimelinescale(Timelinescale-1)
        } else {
          if(Timelinescale<100)
          setTimelinescale(Timelinescale+1)
        }
    }

    const touchstart = (e) => {
      setOndragTimelinescale(Timelinescale);
      settouch({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    }

    const touchmove = (e) => {
      var newX = OndragTimelinescale-(touch.x-e.touches[0].pageX)*0.19;
      if(Timelinescale>100)setTimelinescale(100)
      if(Timelinescale<-6)setTimelinescale(-5)


      if(!(newX<=-6||newX>=100)&&Math.abs(touch.x-e.touches[0].pageX)>20)
      setTimelinescale(newX)

      if(Timelinescale>100)setTimelinescale(100)
      if(Timelinescale<-6)setTimelinescale(-5)
    }

    const touchend = (e) => {
      setOndragTimelinescale(0);
      if(Timelinescale>100)setTimelinescale(100)
      if(Timelinescale<-6)setTimelinescale(-5)
      
    }

    


  useEffect(() => {
    section.updateBoth(1, 1);
  }, []);

  const przenosnikClick = (x, y, next) => {
    //console.log(data[93].pozycja)
    var chosen=999;
    var strone =0;
    var modifiedData = data;
    data.map((e, i) => {
      if (i < 93&&i!=75) {
        if ((x >= e.x) & (x <= e.x + 160) & (y >= e.y) & (y <= e.y + 60)) {
          chosen = i;
          if ((x >= e.x) & (x <= e.x + 80)) {
            strone=1;
            setposition({ x: e.x + 40, y: e.y + 30, idStolu: i,strona:1 });
            modifiedData[i] = { ...modifiedData[i], lpCh: true, ppCh: false };
          }

          if ((x >= e.x + 80) & (x <= e.x + 160)) {
            strone=2;
            setposition({ x: e.x + 120, y: e.y + 30, idStolu: i,strona:2  });
            modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: true };
          }
        } else
          modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: false };
      } else {
        if (i == 93) {
          if (
            (x >= e.x) &
            (x <= e.x + 138) &
            (y >= e.y + 55) &
            (y <= e.y + 189)
          ) {
            chosen = i;
            if ((y >= e.y + 55) & (y <= e.y + 122)) {
              strone=1;
              setposition({ x: e.x + 69, y: e.y + 89, idStolu: i,strona:1  });
              modifiedData[i] = { ...modifiedData[i], lpCh: true, ppCh: false };
            }

            if ((y >= e.y + 122) & (y <= e.y + 189)) {
              strone=2;
              setposition({ x: e.x + 69, y: e.y + 155, idStolu: i,strona:2  });
              modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: true };
            }
          } else
            modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: false };
        } else if (i == 94) {
          if ((x >= e.x) & (x <= e.x + 138) & (y >= e.y) & (y <= e.y + 134)) {
            chosen = i;
            if ((y >= e.y) & (y <= e.y + 67)) {
              strone=1;
              setposition({ x: e.x + 69, y: e.y + 33, idStolu: i,strona:1  });
              modifiedData[i] = { ...modifiedData[i], lpCh: true, ppCh: false };
            }
            if ((y >= e.y + 67) & (y <= e.y + 134)) {
              strone=2;
              setposition({ x: e.x + 69, y: e.y + 102, idStolu: i,strona:2  });
              modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: true };
            }
          } else
            modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: false };
        } else if ((i >= 95) & (i <= 97)) {
          if ((x >= e.x) & (x <= e.x + 153) & (y >= e.y) & (y <= e.y + 241)) {
            chosen = i;
            if ((y >= e.y) & (y <= e.y + 72)) {
              strone=1;
              setposition({ x: e.x + 76, y: e.y + 36, idStolu: i,strona:1  });
              modifiedData[i] = { ...modifiedData[i], lpCh: true, ppCh: false };
            }
            if ((y >= e.y + 169) & (y <= e.y + 241)) {
              strone=2;
              setposition({ x: e.x + 76, y: e.y + 204, idStolu: i,strona:2  });
              modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: true };
            }
          } else
            modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: false };
        }
        else if(i==75){
          if ((x >= e.x) & (x <= e.x + 72) & (y >= e.y) & (y <= e.y + 60)) {
            chosen = i;
            strone=1;
            setposition({ x: e.x + 36, y: e.y + 30, idStolu: i,strona:1  });
            modifiedData[i] = { ...modifiedData[i], lpCh: true, ppCh: false };
          } else
            modifiedData[i] = { ...modifiedData[i], lpCh: false, ppCh: false };
        }
      }
    });
    
    console.log(chosen)
    setdata([...modifiedData]);
    //przepisanie podswietlanego koloru
    if (chosen != 999&&(strone==1&&data[chosen].lp||strone==2&&data[chosen].pp)) {
      var chosenId = data[chosen].lpCh
        ? data[chosen].lp_id
        : data[chosen].pp_id;
      if ( chosenId != "0000000000"&& chosenId != "" && chosenId != "WEING") setidColored(chosenId);
    } else setposition({ x: -20000, y: -20000, idStolu: -1, strona:-1  });//click pw powietrze

   console.log(zlecenia.data);
    //ktora pozycja na liscie zlecen ma to id
    sethomagWybrany(-1);
    setkolejkowany(-1);
    zlecenia.data.map((e, i) => {
      e.map((f, j) => {
        if (f.PLC_ID == chosenId) {
          sethomagWybrany(i + 1);
          setkolejkowany(j);
          switch (i + 1) {
            case 1: {
              if (j != 0) seth1(true);
              break;
            }
            case 2: {
              if (j != 0) seth2(true);
              break;
            }
            case 3: {
              if (j != 0) seth3(true);
              break;
            }
          }
        }
      });
    });
    setTimeout(
      function () {
        next();
      }.bind(this),
      200
    );
  };

  const setZlecenie = (h, k, id) => {
    setkolejkowany(k);
    sethomagWybrany(h);
    setidColored(id);
    var pos = getFirstPosition(id);
    setposition(pos);
    leaveOutOneMark(pos.idStolu,pos.strona)



  };

  const getZlecenie = (id) =>{
    var r ={id};
    // zlecenia.data.map((e, i) => {
    //   e.map((f, j) => {
    //     if (f.zlecenie == id) {
    //       r=f;
    //     }
    //   });
    // });
    return r;
  }

  const getFirstPosition = (zlecenie) =>{
    var z = { x: -20000, y: -20000, idStolu: -1, strona:-1 };
    for(var i=0;i<data.length;i++){
      var e = data[i];
      
      //przenosniki
      if (i < 93&&i!=75) {
        if(e.lp_id==zlecenie){z={ x: e.x + 40, y: e.y + 30, idStolu: i,strona:1 };return z;}
        else if(e.pp_id==zlecenie){z={ x: e.x + 120, y: e.y + 30, idStolu: i,strona:2 };return z;}

      } else {
        //lewa przesuwnica
        if (i == 93) {
          if(e.lp_id==zlecenie){z={ x: e.x + 69, y: e.y + 89, idStolu: i,strona:1 };return z;}
          else if(e.pp_id==zlecenie){z={ x: e.x + 69, y: e.y + 155, idStolu: i,strona:2 };return z;}
        //prawa przesuwnica
        } else if (i == 94) {
          if(e.lp_id==zlecenie){z={ x: e.x + 69, y: e.y + 33, idStolu: i,strona:1 };return z;}
          else if(e.pp_id==zlecenie){z={ x: e.x + 69, y: e.y + 102, idStolu: i,strona:2 };return z;}
          //homagi
        } else if ((i >= 95) & (i <= 97)) {
          if(e.lp_id==zlecenie){z={ x: e.x + 76, y: e.y + 36, idStolu: i,strona:1 };return z;}
          else if(e.pp_id==zlecenie){z={ x: e.x + 76, y: e.y + 204, idStolu: i,strona:2 };return z;}
          //mały przenosnik
        } else if (i == 75) {
          if(e.lp_id==zlecenie){z={ x: e.x + 36, y: e.y + 30, idStolu: i,strona:1 };return z;}
   
        }
      }

    }
    return z;
  }

  const leaveOutOneMark = (stol, strona) =>{
    if(stol!=-1&strona!=-1){
    var modifiedData = data;
    modifiedData.map((e, i) => {e.lpCh=false; e.ppCh=false;});
    modifiedData[stol].lpCh=(strona==1?(true):(false));
    modifiedData[stol].ppCh=(strona==2?(true):(false));
    }
  }

  const touuch={touchstart,touchmove,touchend};

  var nrZlecenia = position.strona==1?(data[position.idStolu].lp_id):(position.strona==2?(data[position.idStolu].pp_id):(""));
  var zlecenie = getZlecenie(nrZlecenia);
  var y = 0;
  //przesuwanie adnotacji przesuwnicy

      if(position.idStolu==93){
        if(position.strona==1)
        y=data[93].y+ 89;
        
        if(position.strona==2)
        y=data[93].y+ 155;
       
      }
      
      

  return (
    <div className="dashboardLayout content">
      <Window extraClasses="" gridArea="okno1" text="ZLECENIA">
        <LiveDataManagerZlecenia
        token={token}
          data={{ data: zlecenia.data, setdata: zlecenia.setdata }}>
          <Zlecenia
            goto={(path)=>history.push(path)}
            h1={h1}
            seth1={seth1}
            h2={h2}
            seth2={seth2}
            h3={h3}
            seth3={seth3}
            data={zlecenia.data[0]?(zlecenia.data):(init?(init.zlecenia):(zlecenia.data))}
            homag={homagWybrany}
            kolejka={kolejkowany}
            setZlecenie={setZlecenie}
          ></Zlecenia>
        </LiveDataManagerZlecenia>
      </Window>   


      <Window fold extraClasses="danePaczki" gridArea="okno2" text="PRACA MASZYN">
      <Timeline {...({handleScroll,disableScroll,enableScroll,dostarczenia,setdostarczenia,Timelinescale,touuch, token})}></Timeline>
      </Window>
      <Window extraClasses="maxHeight90" gridArea="okno3" text="PODGLĄD LINII">
        <div>
          {(position.strona==1&&data[position.idStolu].lp)||(position.strona==2&&data[position.idStolu].pp)?(

                  <div className="annotation">
                  {/* potrzebne są: nrItemu, status, i opis, te dane są na liście zleceń*/}
                  <Annotation
                    weing={nrZlecenia=="999999"?(true):(false)}
                    scale={scale}
                    x={(position.x - 90 / scale) * scale}
                    y={
                      position.idStolu!=93&&position.idStolu!=94?((position.y - 158 / scale) * scale):(
                        position.idStolu==93?(
                          position.strona==1?(data[93].pozycja/10+ 89- 158 / scale) * scale:(data[93].pozycja/10+ 155- 158 / scale) * scale
                        ):(
                          position.strona==1?(data[94].pozycja/10+ 33- 158 / scale) * scale:(data[94].pozycja/10+ 102- 158 / scale) * scale
                        )

                      )
                    }
                    nrItemu={zlecenie.item}
                  >
                    <div>
                      {Status(zlecenie.status, parseFloat(zlecenie.postep))}
                      <div className="annotationHelp">
                      {zlecenie.opis}
                      </div>
                    </div>
                  </Annotation>
                  </div>

          ):("")}
          <LiveDataManager
          token={token}
            position={position}
            setposition={setposition}
            scale={scale}
            setscale={setscale}
            idColored={idColored}
            przenosnikClick={przenosnikClick}
            data={{ data, setdata }}
          ></LiveDataManager>
        </div>
      </Window>
    </div>
  );
}

// eslint-disable-next-line react/display-name
const Timeline = React.memo(({handleScroll,disableScroll,enableScroll,dostarczenia,setdostarczenia,Timelinescale,touuch, token}) =>{

  return(
    <div
    onTouchStart={touuch.touchstart}
    onTouchMove={touuch.touchmove}
    onTouchEnd={touuch.touchend}
    onWheel={handleScroll}
    onMouseEnter={disableScroll}
    onMouseLeave={enableScroll}
    >
    <LiveDataManagerDostarczenia token={token} data={{ data:dostarczenia, setdata:setdostarczenia }}>
        <ProgressLine timepoints={dostarczenia[0]} interval={3} num={1} Timelinescale={Timelinescale}></ProgressLine>
        <ProgressLine timepoints={dostarczenia[1]} interval={5} num={2} Timelinescale={Timelinescale}></ProgressLine>
        <ProgressLine timepoints={dostarczenia[2]} interval={4} num={3} Timelinescale={Timelinescale}></ProgressLine>
        <div className="TimelineGroup">
          <div></div>
          <div></div>
          <TimelineCanvas Timelinescale={Timelinescale}></TimelineCanvas>
        </div>

    </LiveDataManagerDostarczenia>
    </div>
  );
});


function Zlecenia({
  goto,
  data,
  homag,
  kolejka,
  setZlecenie,
  h1,
  seth1,
  h2,
  seth2,
  h3,
  seth3,
}) {

  return (
    <div className="tabelkaZlecenia">
      {Header(
        "HOMAG",
        "ZLECENIE",
        "ITEM",
        "OPIS ITEMU",
        "POSTĘP",
        "CZAS",
        "STATUS",
        "KOLEJKA"
      )}

      <React.Fragment>
     
        
        {data?(data.map((e, i) => {
          if(e[0])return (
            <div key={i}>
              {Wiersz(
                goto,h1,
                i == 0 ? "HOMAG 1" : i == 1 ? "HOMAG 2" : "HOMAG 3",
                "#" + e[0].zlecenie,
                e[0].item,
                e[0].opis,
                parseInt(parseFloat(e[0].postep).toFixed(2)*100) + "%",
                e[0].czas,
                Status(e[0].status, (parseFloat(e[0].postep).toFixed(2)*100)),
                Queue(
                  e.length - 1,
                  i == 0 ? seth1 : i == 2 ? seth2 : seth3,
                  i == 0 ? h1 : i == 2 ? h2 : h3
                ),
                (homag == i + 1) & (kolejka == 0),
                () => setZlecenie(i + 1, 0, e[0].zlecenie)
              )}
              <div
                className={
                  (i == 0 ? h1 : i == 2 ? h2 : h3) == 1
                    ? "tableExpandable opened"
                    : (i == 0 ? h1 : i == 2 ? h2 : h3) == 2
                    ? "tableExpandable closed"
                    : "tableExpandable"
                }
              >
                {e.map((j, k) => {
                  return (
                    <div key={k}>
                      {k == 0
                        ? ""
                        : Kolejkowane(
                            goto,
                            ("#"+j.zlecenie),
                            j.item,
                            j.opis,
                            parseInt(parseFloat(j.postep).toFixed(2)*100) + "%",
                            j.czas,
                            Status(j.status, (parseFloat(j.postep).toFixed(2)*100)),
                            (homag == i + 1) & (kolejka == k),
                            () => setZlecenie(i + 1, k, j.zlecenie)
                          )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })):("")}
      </React.Fragment>
    </div>
  );
  }

function Kolejkowane(goto, t2, i, d, t3, t4, t5, marked, click) {
  return (
    <div onClick={click} className={"kolejkowane " + (marked ? "marked" : "")}>
      <div className="gridLimit kolejkaStrzalka">
        <img src={queued} className="App-logo" alt="logo" height="12" />
      </div>
      <div onClick={()=>goto("/kolejka/"+t2.substring(1,20))} className="phoneDelete gridLimit description pseudoA">
        {t2}
        <div className="descriptionOnTop"></div>
      </div>
      <div className="phoneDelete gridLimit">{i}</div>
      <div className="gridLimit description">
      {d.length>2?( d.charAt(0).toUpperCase() + d.substring(1, d.length) ):( d )}
        <div className="descriptionOnTop"></div>
      </div>
      <div className="phoneDelete gridLimit progress">{t3}</div>
      <div className="phoneDelete gridLimit">{t4}</div>
      <div>
        <div>{t5}</div>
      </div>
    </div>
  );
}

function Wiersz(goto,opened, t1, t2, i, d, t3, t4, t5, t6, marked, click) {
  return (
    <div onClick={click} className={"wierszGrid " + (marked ? "marked" : "")}>
      <div className="gridLimit">{t1}</div>
      <div onClick={()=>goto("/kolejka/"+t2.substring(1,20))} className="phoneDelete gridLimit description pseudoA">
        {t2}
        <div className="descriptionOnTop"></div>
      </div>
      <div className="phoneDelete gridLimit">{i}</div>
      <div className="gridLimit description">
        {d.length>2?( d.charAt(0).toUpperCase() + d.substring(1, d.length) ):( d )}
        <div className="descriptionOnTop"></div>
      </div>
      <div className="phoneDelete gridLimit progress">{t3}</div>
      <div className="phoneDelete gridLimit">{t4}</div>
      <div>
        <div>{t5}</div>
      </div>
      <div className="gridLimit kolejka">{t6}</div>
    </div>
  );
}

function Header(t1, t2, i, d, t3, t4, t5, t6) {
  return (
    <div className="Header">
      <div className="gridLimit">{t1}</div>
      <div className="phoneDelete gridLimit">{t2}</div>
      <div className="phoneDelete gridLimit">{i}</div>
      <div className="gridLimit description">{d}</div>
      <div className="phoneDelete gridLimit">{t3}</div>
      <div className="phoneDelete gridLimit">{t4}</div>
      <div className="gridLimit">{t5}</div>
      <div className="gridLimit">{t6}</div>
    </div>
  );
}

function Queue(elements, click, rotation) {
  return (
    <div onClick={() => click(rotation == 1 ? 2 : 1)} className="queueArrow">
      <div className="surnameQueue">{elements}</div>
      <div
        className={
          rotation == 1
            ? "arrowQueue rotated"
            : rotation == 2
            ? "arrowQueue close"
            : "arrowQueue"
        }
      >
        <img src={dropdownArrow} className="App-logo" alt="logo" height="8" />
      </div>
    </div>
  );
}

export default Dashboard;
