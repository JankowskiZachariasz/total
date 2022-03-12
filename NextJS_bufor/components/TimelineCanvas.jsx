import React, { useRef, useEffect } from "react";
import "./TimelineCanvas.css";



const TimelineCanvas = (props) => {
  const canvasWidth = 2200;
  const canvasHeight = 60;
  const canvasRef = useRef();
  





  const marker = (ctx, x,h,text)=>{
    ctx.fillText(text, x, h-24);
    ctx.fillRect(x, h-12, 2, 12);
  }


  const hour = (ctx,divw,h,i,text, partialRemainingPortion,granulity) =>{
    
    marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)/4,h,text+":45");
    marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)/2,h,text+":30");
    marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)*3/4,h,text+":15");
    marker(ctx,(divw)*i+partialRemainingPortion,h,text+":00");
        
    ctx.fillRect((divw)*(i-1)+partialRemainingPortion, h-6, divw, 2);
  
  }

  const Partialhour = (ctx,divw,h,i,text, drawRemaining, partialRemainingPortion,granulity) =>{
    
    switch(drawRemaining){
      case(4):{
        marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)/4,h,text+":45");
        marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)/2,h,text+":30");
        marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)*3/4,h,text+":15");
        marker(ctx,(divw)*(i)+partialRemainingPortion,h,text+":00");
        break;}
      case(3):{

   
        marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)/2,h,text+":30");
        marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)*3/4,h,text+":15");
        marker(ctx,(divw)*(i)+partialRemainingPortion,h,text+":00");
        break;}
      case(2):{



        marker(ctx,(divw)*(i-1)+partialRemainingPortion+(divw)*3/4,h,text+":15");
        marker(ctx,(divw)*(i)+partialRemainingPortion,h,text+":00");
        break;}
      case(1):{

        marker(ctx,(divw)*(i)+partialRemainingPortion,h,text+":00");
        break;}
    }
        
    ctx.fillRect((divw)*(i-1)+partialRemainingPortion, h-6, divw, 2);
  
  }

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "grey";
    var divw=500+props.Timelinescale*50;
    var h = 60;
      
        ctx.fillStyle = "#555";
        ctx.font = "30px serif";

        var t = new Date(Date.now());
        var currentH = t.getHours();
        var currentM = t.getMinutes();
        var draw = 1;
        var partialRemainingPortion = divw*currentM/60;
        if(currentM>15) draw = 2;
        if(currentM>30) draw = 3;
        if(currentM>45) draw = 4;

        Partialhour(ctx,divw,h,0,currentH,draw,partialRemainingPortion);
        t.setTime(t- 60*60000)
        hour(ctx,divw,h,1,t.getHours(),partialRemainingPortion);
        t.setTime(t- 60*60000)
        hour(ctx,divw,h,2,t.getHours(),partialRemainingPortion);
        t.setTime(t- 60*60000)
        hour(ctx,divw,h,3,t.getHours(),partialRemainingPortion);
        t.setTime(t- 60*60000)
        hour(ctx,divw,h,4,t.getHours(),partialRemainingPortion);
        

      
    
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
    <div className="canvasTimelineWrapper">
      {/* <div>{nums.y}</div> */}
      <canvas className="CanvasTimelineWidokLinii" ref={canvasRef} {...props} />
      
    </div>
  );
};



export default TimelineCanvas;
