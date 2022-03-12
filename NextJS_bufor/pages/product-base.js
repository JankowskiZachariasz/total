import React, { useEffect, useState } from "react";
import NaviagtionMenu from "../components/NaviagtionMenu";
import Table from '../tableComponents/Table'
import Layout from "../components/Layout";
import Window from "../components/Window";
// import Status from "../components/Status";
// import LiveDataManager from "../components/LiveDataManagerPalety";
// import LiveDataManagerZlecenia from "../components/LiveDataManagerZlecenia";
// import LiveDataManagerDostarczenia from "../components/LiveDataManagerDostarczenia";
// import CanvasProgress from "../components/CanvasProgress";
// import TimelineCanvas from "../components/TimelineCanvas";
// import ProgressLine from "../components/ProgressLine";
// import Annotation from "../components/Annotation";
// import dropdownArrow from "../graphics/dropdownArrowDarker.svg";
// import queued from "../graphics/queued.png";
// import "../components/pages/Dashboard.css";
// import hmg from "../graphics/hmg.png";
// import disableScroll from 'disable-scroll';

export default function ProductBase(props) {

  useEffect(() => {
    props.section.updateBoth(3, 1);
  }, []);

  return (
    <div>
      <Layout>
      <NaviagtionMenu
        section={props.section}
        updateHistory={props. updateHistory}
      ></NaviagtionMenu>
      <div className="dashboardLayout content">
      <Window extraClasses="" gridArea="okno1" text="BAZA PRODUKTÓW">
        <div><Table /></div>
        
    
        
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
