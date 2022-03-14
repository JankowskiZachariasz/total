import React, { useEffect, useState } from "react";
import NaviagtionMenu from "../components/NaviagtionMenu";
import Table from '../tableComponents/Table'
import Layout from "../components/Layout";
import Window from "../components/Window";
import useUser from "../lib/useUser";
import client,{getAllBufforedProducts, authClient} from "../apollo-client";
import styles from "./products-on-the-line.module.css";
import Box from "../graphics/Db";

export default function ProductsOnTheLine(props) {

  const [annotationText, setannotationText] = useState([]);
  const {token} = useUser();

  useEffect(() => {
    props.section.updateBoth(2, 1);
  }, []);

  return (
    <div>
      <Layout>
      <NaviagtionMenu
        section={props.section}
        updateHistory={props.updateHistory}
      ></NaviagtionMenu>
      <div className="dashboardLayout content">
      <Window extraClasses="" gridArea="okno1" text="PRODUKTY NA LINII">
        <div>
        <FetchData
        setdata={setannotationText}
        token={token}>
          <div>
          <div>
          {annotationText?.map((m,i)=>{
          return (
          <div className={styles.card} key={i}>
            <span className={styles.allignOuter}> 
              <span className={styles.allignBox}><Box></Box></span>
              <span className={styles.allignTitle}> {m?.name} </span>
            </span>
            <div>
            <span>
              <span>{(m?.series1)?(m?.series1+'.'):("0.")}</span> 
              <span>{(m?.series2)?(m?.series2+'.'):("0.")}</span> 
              <span>{(m?.series3)?(m?.series3):("0")}</span> 
            </span>
            </div>
            <div className={styles.paczkasContainer}>
            {isNaN(Number.parseInt(m?.buffored1))?(<div></div>):(Number.parseInt(m?.buffored1)>0?(
                <div className={styles.package}>
                <div className={styles.title}>Paczka 1</div>
                <div className={styles.detail}>{"ZBUFOROWANO: "+m?.buffored1}</div>
                <div className={styles.detail}>{"L. PACZEK:  "+m?.buffored1+' × '+m?.count1+' = '+(m?.buffored1*m?.count1)}</div>
              </div>
              ):(<div></div>))}
            {isNaN(Number.parseInt(m?.buffored2))?(<div></div>):(Number.parseInt(m?.buffored2)>0?(
              <div className={styles.package}>
              <div className={styles.title}>Paczka 2</div>
              <div className={styles.detail}>{"ZBUFOROWANO: "+m?.buffored2}</div>
              <div className={styles.detail}>{"L. PACZEK:  "+m?.buffored2+' × '+m?.count2+' = '+(m?.buffored2*m?.count2)}</div>
            </div>
            ):(<div></div>))}
            {isNaN(Number.parseInt(m?.buffored3))?(<div></div>):(Number.parseInt(m?.buffored3)>0?(
              <div className={styles.package}>
              <div className={styles.title}>Paczka 3</div>
              <div className={styles.detail}>{"ZBUFOROWANO: "+m?.buffored3}</div>
              <div className={styles.detail}>{"L. PACZEK:  "+m?.buffored3+' × '+m?.count3+' = '+(m?.buffored3*m?.count3)}</div>
            </div>
            ):(<div></div>))}
            </div>
          </div>);
        })}
          </div>
          <div className={styles.footer} >
            
          </div>
          </div>
        
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
    setdata(res?.data?.allBufforedProducts);
    resolve();
  
  }).catch(e=>{console.log(e);reject(e);})
  })
 
}