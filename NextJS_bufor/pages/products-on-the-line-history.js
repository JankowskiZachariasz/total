import React, { useEffect, useState } from "react";
import NaviagtionMenu from "../components/NaviagtionMenu";
import Table from '../tableComponents/Table'
import Layout from "../components/Layout";
import Window from "../components/Window";
import useUser from "../lib/useUser";
import client,{getAllBufforedProducts, authClient} from "../apollo-client";
import { StylesContext } from "@material-ui/styles";
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

export default function ProductsOnTheLineHistory(props) {

  const [annotationText, setannotationText] = useState([]);
  const {token} = useUser();

  useEffect(() => {
    props.section.updateBoth(2, 2);
  }, []);

  return (
    <div>
      <Layout>
      <NaviagtionMenu
        section={props.section}
        updateHistory={props. updateHistory}
      ></NaviagtionMenu>
      <div className="dashboardLayout content">
      <Window extraClasses="" gridArea="okno1" text="HISTORIA PRODUKTÓW NA LINII">
        <div>
        <FetchData
        setdata={setannotationText}
        token={token}>
          Ta sekcja jest w budowie.
        {/* {annotationText?.map((m,i)=>{
          return (
          <div key={i}>
            
          </div>);
        })} */}
        </FetchData>
        </div>
        
      </Window>
      
      </div>
      </Layout>
    </div>
  );
}

function FetchData(props) {


  
  React.useEffect(() => {
    fetchDataFunction( props.token, props.setdata);
    const interval = setInterval(() => {
      fetchDataFunction(props.token, props.setdata);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return props.children;
}

export const fetchDataFunction = (token, setdata) => {
  return new Promise((resolve,reject)=>{
    authClient(token).query({
      query:getAllBufforedProducts, 
      variables:{
        name1: "Current"
      } 
  }).then((res)=>{
    console.log(res);
    setdata(res?.data?.allBufforedProducts);
    resolve();
  
  }).catch(e=>{console.log(e);reject(e);})
  })
 
}