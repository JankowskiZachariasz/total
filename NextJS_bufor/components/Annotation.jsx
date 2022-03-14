import React, { useRef, useEffect, useState } from "react";
import styles from "./Annotation.module.css";
import Box from "../graphics/Db";
import Info from "../graphics/Info";
import client,{getBufforedProducts, authClient} from "../apollo-client";


const Anno = (props) => {


  

  return (

      <FetchData
      packageId={props.packageId}
      setdata={props.setannotationText}
      token={props.token}
        >
    

    <div style={{ top: props.y + "px", left: props.x + "px" }} className={styles.anno}>
    {svgDraw()}
    <div className={styles.annotationText}>
      <div className={styles.itemAnno}>
        <div className={styles.productname}>
        <span className={styles.positionBox}><Box></Box></span>
          <span className={styles.productnameInner}>{(props.annotationText?.name)?(props.annotationText?.name):('Ładowanie...')}</span>
          </div>
      </div>

      <div>
        <span>
          <span>{(props.annotationText?.series1)?(props.annotationText?.series1+'.'):("0.")}</span> 
          <span>{(props.annotationText?.series2)?(props.annotationText?.series2+'.'):("0.")}</span> 
          <span>{(props.annotationText?.series3)?(props.annotationText?.series3):("0")}</span> 
        </span>
        
      </div>


      {props?.packageId!=398?(
        <div>
      <div className={styles.ktoraPaczka}>
        <b>{(props.annotationText?.plcId1==props.packageId)?('Paczka 1'):
        ((props.annotationText?.plcId2==props.packageId)?('Paczka 2'):
        ((props.annotationText?.plcId3==props.packageId)?('Paczka 3'):
        ('')))}</b>
      </div>
      </div>
      ):('')}

      <div className={styles.evenOut}>
        <span>Na buforze:</span>
        <span>{(props.annotationText?.plcId1==props.packageId)?((props.annotationText?.buffored1)?(props.annotationText?.buffored1):('0')):('')}</span>
        <span>{(props.annotationText?.plcId2==props.packageId)?((props.annotationText?.buffored2)?(props.annotationText?.buffored2):('0')):('')}</span>
        <span>{(props.annotationText?.plcId3==props.packageId)?((props.annotationText?.buffored3)?(props.annotationText?.buffored3):('0')):('')}</span>
      </div>
      
      

      <div className="annotationCD">{props.children}</div>
    </div>
  </div>

    </FetchData>

    
 
  );
};


const svgDraw =()=>{
  return(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="158"
        viewBox="0 0 180 158"
      >
        <g
          id="Group_294"
          data-name="Group 294"
          transform="translate(-1418 -505)"
        >
          <rect
            id="Rectangle_159"
            data-name="Rectangle 159"
            width="180"
            height="130"
            transform="translate(1418 505)"
            fill="#fff"
          />
          <path
            id="Polygon_4"
            data-name="Polygon 4"
            d="M20,0,40,28H0Z"
            transform="translate(1528 663) rotate(180)"
            fill="#fff"
          />
        </g>
      </svg>

  );
}

function FetchData(props) {


  
  React.useEffect(() => {
    fetchDataFunction( props.token, props.setdata, props.packageId);
    const interval = setInterval(() => {
      fetchDataFunction(props.token, props.setdata, props.packageId);
    }, 5000);
    return () => clearInterval(interval);
  }, [props.packageId]);
  return props.children;
}

export const fetchDataFunction = (token, setdata, packageId) => {
  return new Promise((resolve,reject)=>{
    authClient(token).query({
      query:getBufforedProducts, 
      variables:{
        
          "name1": isNaN(Number.parseInt(packageId))?(0):(Number.parseInt(packageId)),
        
      } 
  }).then((res)=>{
    console.log(res);
    setdata(res?.data?.allBufforedProducts[0]);
    resolve();
  
  }).catch(e=>{console.log(e);reject(e);})
  })
 
}

export default Anno;
