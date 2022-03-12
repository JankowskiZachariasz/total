import React, { useRef, useEffect } from "react";
import styles from "./Annotation.module.css";
import Box from "../graphics/Db";
import Info from "../graphics/Info";

const Anno = (props) => {
  return (
    

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

export default Anno;
