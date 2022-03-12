import React, { useRef, useEffect } from "react";
import "./CanvasProgress.module.css";



const CanvasProgress = (props) => {
  const canvasWidth = 2200;
  const canvasHeight = 60;
  const canvasRef = useRef();

const drawHour = (ctx,timePoints, hour,divw,multiplier,OFFSET) => {

  if(timePoints)
  timePoints.map((t,i)=>{
    if(t.getHours()==hour){
      var currentM = t.getMinutes() + t.getSeconds()/60;
      ctx.fillRect(
        OFFSET+multiplier*divw-((currentM/60)*divw)-3,
        //multiplier*divw-(currentM/60)*divw-2,
        27,6,6
      );
    }
  })

}

const drawfIRSTHour = (ctx,timePoints, hour,divw,multiplier,OFFSET) => {
  
  if(timePoints)
  timePoints.map((t,i)=>{
    if(t.getHours()==hour){
      var currentM = t.getMinutes() + t.getSeconds()/60;
      
      ctx.fillRect(
        OFFSET-((currentM/60)*divw)-3,
        // multiplier*divw-(currentM/60)*divw-2-(divw-OFFSET),
        27,6,6
      );
    }
  })

}


  const draw = (ctx, frameCount) => {
    ctx.fillStyle = "#2CA502";

        var divw=500+props.Timelinescale*50;
        var t = new Date(Date.now());
        var currentM = t.getMinutes();
        var partialRemainingPortion = divw*currentM/60;


        drawfIRSTHour(ctx,props.timepoints,t.getHours(),divw,0,partialRemainingPortion)
        t.setTime(t- 60*60000);
        drawHour(ctx,props.timepoints,t.getHours(),divw,1,partialRemainingPortion)
        t.setTime(t- 60*60000);
        drawHour(ctx,props.timepoints,t.getHours(),divw,2,partialRemainingPortion)
        t.setTime(t- 60*60000);
        drawHour(ctx,props.timepoints,t.getHours(),divw,3,partialRemainingPortion)
        t.setTime(t- 60*60000);
        drawHour(ctx,props.timepoints,t.getHours(),divw,4,partialRemainingPortion)



    
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
    <div
      className="canvasProgressWrapper"
    >
      {/* <div>{nums.y}</div> */}
      <canvas className="CanvasProgressWidokLinii" ref={canvasRef} {...props} />
    </div>
  );
};


export default CanvasProgress;
