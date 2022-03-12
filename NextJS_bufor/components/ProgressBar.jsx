import React, { useRef, useEffect } from "react";
import bck from "../graphics/bck.svg";
import bckGreen from "../graphics/bckGreen.svg";
import "./ProgressBar.css";

function ProgressBar({liczbaA, liczbaB, liczbaC, czasObrobki, status}) {

    var czas = parseFloat(czasObrobki)*(liczbaC-liczbaB);
    var lgodz=Math.floor(czas/60);
    czas-=(lgodz*60);
    var m = Math.floor(czas);
    if(m==0)m="";
    var min = lgodz>0?(m==""?(""):(m+"m")):(m==""?(""):(m+"min"));
    const czasTekst = lgodz>0?(lgodz+"godz. "+min):(min);

    return(
        <div>
            <div className="progressprogress">{liczbaB}/{liczbaC} ({Math.floor((liczbaB/liczbaC)*100)}%)</div>
            {(status!=4&&status!=5)?<div className="timeEstimate">{czasTekst}</div>:<div></div>}
            <TimelineCanvas
                buforowanie = {liczbaA/liczbaC}
                dostarczenia = {liczbaB/liczbaC}
                status={czasObrobki}
            ></TimelineCanvas>
        </div>
    )

  }


  const TimelineCanvas = (props) => {
    const canvasWidth = 330;
    const canvasHeight = 8;
    const canvasRef = useRef();
  
    const draw = (ctx, frameCount) => {

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "#dedede";
      ctx.fillRect(1,1,props.buforowanie*330-2,canvasHeight-2);
      ctx.fillStyle = "#109426";
      ctx.fillRect(1,1,props.dostarczenia*330-2,canvasHeight-2);
      ctx.fillStyle = "#ddd";
      ctx.fillRect(0,0,canvasWidth,1);
      ctx.fillRect(0,canvasHeight-1,canvasWidth,1);
      ctx.fillRect(0,0,1,canvasHeight-1);
      ctx.fillRect(canvasWidth-1,0,1,canvasHeight);
      ctx.fill();
    };
  
  
    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const context = canvas.getContext("2d");
      let frameCount = 0;
      let animationFrameId;
      const render = () => {
        frameCount++;
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
  
      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }, [draw]);
  
    return (
      <div className="canvasProgressBar">
        <canvas className="canvasProgressBar" ref={canvasRef} {...props} />
      </div>
    );
  };





  export default ProgressBar;