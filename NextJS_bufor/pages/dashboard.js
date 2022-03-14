import React, { useEffect, useState } from "react";
import NaviagtionMenu from "../components/NaviagtionMenu";
import Table from '../tableComponents/Table'
import Layout from "../components/Layout";
import Window from "../components/Window";
import LiveDataManager from "../components/LiveDataManagerPalety";
import Annotation, {fetchDataFunction} from "../components/Annotation";
import useUser from "../lib/useUser";


export default function Dashboard(props) {

  const {token} = useUser();
  const przenosnikClick = (x, y, next) => {
  
    var chosen = null;
    data.map((e, i) => {
      
      var boxX=0;
      var boxY=0;
      switch(e.type){
        case(1):{boxX=65;boxY=325; break;}
        case(2):{boxX=65;boxY=310;break;}
        case(3):{boxX=96;boxY=225;break;}
        case(4):{boxX=65;boxY=159;break;}
        case(5):{boxX=67;boxY=247;break;}
        case(6):{boxX=94;boxY=214;break;}
        case(7):{boxX=71;boxY=121;break;}
        case(8):{boxX=64;boxY=172;break;}
        case(9):{boxX=90;boxY=228;break;}
        case(10):{boxX=110;boxY=173;break;}
        case(11):{boxX=327;boxY=171;break;}
      }
      if ((x >= e.x) & (x <= e.x + boxX) & (y >= e.y) & (y <= e.y + boxY)) {
        console.log(e);
        if(e.type==11){
          if((x >= e.x) & (x <= e.x + boxX/3)){
            chosen=e.packageId;
            if(e.pozycja[0]||e.pozycja[1]||e.pozycja[2]||e.pozycja[3])
            setposition({ x, y , packageId: e.packageId});
            else  setposition({ x: -20000, y: -20000, packageId: 0});
          }
          else if(((x + boxX/3) >= e.x) & (x <= e.x + (boxX*2/3))){
            chosen=e.packageId1;
            if(e.pozycja1[0]||e.pozycja1[1]||e.pozycja1[2]||e.pozycja1[3])
            setposition({ x, y , packageId: e.packageId1 });
            else  setposition({ x: -20000, y: -20000, packageId: 0});
          }
          else if(((x + (boxX*2/3)) >= e.x) & (x <= e.x + boxX)){
            chosen=e.packageId2;
            if(e.pozycja2[0]||e.pozycja2[1]||e.pozycja2[2]||e.pozycja2[3])
            setposition({ x, y ,  packageId: e.packageId2 });
            else  setposition({ x: -20000, y: -20000, packageId: 0});
          }
        }
        else{
          
          chosen=e.packageId;
          if(e.pozycja[0]||e.pozycja[1]||e.pozycja[2]||e.pozycja[3])
          setposition({ x, y , packageId: e.packageId });
          else  setposition({ x: -20000, y: -20000, packageId: 0});

        }
        
      }
    });
  
    
    data.forEach(element => {
      if(element.packageId == chosen) element.chosenPackageColor1 = '#'+element.pockageColor2;
      else element.chosenPackageColor1 = '#'+element.pockageColor1;
   

      if(element.chosenPackageColor3!=null){
        if(element.packageId1 == chosen) element.chosenPackageColor2 = '#'+element.pockageColor4;
        else element.chosenPackageColor2 = '#'+element.pockageColor3;
        if(element.packageId2 == chosen) element.chosenPackageColor3 = '#'+element.pockageColor6;
        else element.chosenPackageColor3 = '#'+element.pockageColor5
      }
    });

    if(chosen==null) setposition({ x: -20000, y: -20000, packageId: 0});
    else{
      fetchDataFunction(token, setannotationText, position?.packageId);//token, setdata, packageId
    }
    next();
 
  };

  const [data, setdata] = useState([]);
  const [scale, setscale] = useState(1);
  const [position, setposition] = useState({x: -20000, y: -20000});//strona:1-lewa, 2-prawa
  const [annotationText, setannotationText] = useState({});

  useEffect(() => {
    props.section.updateBoth(1, 1);
  }, []);

  return (
    <div>
      <Layout>
      <NaviagtionMenu
        section={props.section}
        updateHistory={props. updateHistory}
      ></NaviagtionMenu>
      <div className="dashboardLayout content">
      <Window extraClasses="maxHeight90" gridArea="okno1" text="WIDOK LINII">
        <div>
                      
              {(position.x != -20000 && position.y != -20000)?(
              <div className="annotation">
              <Annotation
              token={token}
                scale={scale}
                packageId={position.packageId}
                annotationText={annotationText}
                setannotationText={setannotationText}
                x={(position.x - 90/ scale) * scale}
                y={(position.y - 158/ scale) * scale}>
                  <div></div>
              </Annotation>
              </div>

              ):("")}

          <LiveDataManager
            position={position}
            setposition={setposition}
            scale={scale}
            setscale={setscale}
            //idColored={false}
            przenosnikClick={przenosnikClick}
            data={{ data, setdata }}
          ></LiveDataManager>
        </div>
      </Window>
      
      </div>
      </Layout>
    </div>
  );
}

//export async function getServerSideProps() {
//   let { data } = await client.query({
//     query: gql`
//       query AllTasks{
//       allTasks: tasks (where:{ label:{contains:"ask"}}  ){
//         id,
//         label,
//         priority,
//         isComplete,
//         assignedTo{
//           name
//         }
//       }}
//     `,

//   });

//   data = {allTasks:[
//     {id: '1',label:'1'},
//     {id: '2',label:'2'},
//     {id: '3',label:'3'}
//   ]};

//   return {
//     props: {
//       countries: data.allTasks.slice(0, 4),
//     },
//  };
//}
