import React, { useRef, useEffect, useState } from "react";
import styles from "./Annotation.module.css";
import Box from "../graphics/Db";
import Info from "../graphics/Info";
import client,{getProducts, getConveyors, createProduct, updateProduct, authClient} from "../apollo-client";
import useUser from "../lib/useUser";

const Anno = (props) => {


  const [data, setdata] = useState({});

  return (

      <FetchData
      packageId={props.packageId}
      setdata={setdata}
        >
    

    <div style={{ top: props.y + "px", left: props.x + "px" }} className={styles.anno}>
    {svgDraw()}
    <div className={styles.annotationText}>
      <div className={styles.itemAnno}>
        <Box></Box>
        <div className={styles.itemCorrection}>{props.nrItemu}</div>
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


  const {token} = useUser();
  React.useEffect(() => {
    fetchDataFunction(props.setdata, props.packageId);
    const interval = setInterval(() => {
      fetchDataFunction(props.setdata);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return props.children;
}

const fetchDataFunction = (setdata, packageId) => {
  return null;
//   authClient(token).query({
//     query:getConveyors, 
//     variables:{
      
//         "name1": "shifter1v1",
//         "name2": "shifter2v1",
//         "name3": "shifter3v1"
      
//     } 
// }).then((res)=>{



// }).catch(e=>{console.log(e);})
}

export default Anno;
