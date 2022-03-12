import React, { useRef, useEffect } from "react";
import "./ProgressLine.module.css";
import hmg from "../graphics/hmg.png";
import CanvasProgress from "./CanvasProgress";
import Box from "../graphics/Db";

const ProgressLine = (props) => {
  return (
    <div className="homagGroup">
      <div className="Homag_inline">{"HOMAG "+props.num}</div>
      <div className="hmgPic"><img src={hmg} className="Homag_picture" alt="logo" height="50" /></div>
      <CanvasProgress timepoints={props.timepoints} interval={props.interval} Timelinescale={props.Timelinescale}></CanvasProgress>
    </div>
  );
};

const svgDraw = () => {
  return <div></div>;
};

export default ProgressLine;
