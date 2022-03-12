import React, { useRef, useEffect } from "react";
import "./CanvasKolejka.css";



const CanvasKolejka = (props) => {
  const canvasWidth = 250;
  const canvasHeight = props.height;
  const canvasRef = useRef();




  const draw = (ctx, frameCount) => {
    //console.log(props.oneHourDiv)
    //drawZlecenie(0,props.oneHourDiv,"Wieniec górny H8*1594x497,5x22,3*obr^06","785454/21",ctx,1)
    // drawZlecenie(0,props.oneHourDiv*1.5,"Wieniec górny H8*1594x497,5x22,3*obr^06","785454/21",ctx,1,19,20)
    // drawZlecenie(props.oneHourDiv*1.5,props.oneHourDiv*2.75,"Wieniec górny H8*1594x497,5x22,3*obr^06","785454/21",ctx,2,43,50)
    // drawZlecenie(props.oneHourDiv*2.75,props.oneHourDiv*4,"Wieniec górny H8*1594x497,5x22,3*obr^06","785454/21",ctx,3,3,100)
    // ctx.fillRect(2,2+o,198,198+o);
    // ctx.fillRect(2,202,198,100);
    // ctx.fillStyle = "#C7ECDA";
    // ctx.fillRect(2,304,198,100);
    // ctx.fillRect(2,406,198,100);
    // ctx.fillRect(2,508,198,100);

    props.zlecenia.map((m,i)=>{
      // console.log(m.PRIORYTET)
      drawZlecenie((m.yStart/60)*props.oneHourDiv, (m.yEnd/60)*props.oneHourDiv, m.item, m.zlecenie, ctx, m.status ,m.paletyDostarczone, m.paletyWymagane ,props.chosenZlecenie==m.zlecenie?(true):(false),m.PRIORYTET);
    })
    
    ctx.fill();
  };

  const drawZlecenie = (yStart, yEnd, item, zlecenie, ctx, status ,paletyDostarczone, paletyWymagane, chosen, prio) =>{
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,yStart,canvasWidth,yStart+2);
    switch(status){
      case(1):{ctx.fillStyle = "#1A9142";break;}
      case(2):{ctx.fillStyle = "#A4B8C4";break;}
      case(3):{ctx.fillStyle = "#C8D3D5";break;}
    }
    
    var addition = yEnd-yStart<45/60*props.oneHourDiv?(45/60*props.oneHourDiv):(yEnd-yStart);
    ctx.fillRect(2,yStart+2,canvasWidth-2,addition-2);





    ctx.strokeStyle = "#111";
    ctx.fillStyle = "#111";
    if(status==1){ctx.fillStyle = "#fff"; ctx.strokeStyle = "#fff";}
    ctx.font = '25px serif';
    drawBox(ctx,13,yStart+18);
    ctx.fillText(zlecenie, 50, yStart+45);
    ctx.font = '20px serif';
    ctx.fillText(item, 15, yStart+73);
    ctx.fillText(paletyDostarczone+"/"+paletyWymagane+" palet", 15, yStart+101);




    switch(status){
      case(1):{ctx.fillStyle = "#1A9142";break;}
      case(2):{ctx.fillStyle = "#A4B8C4";break;}
      case(3):{ctx.fillStyle = "#C8D3D5";break;}
    }
    
    
    for(var i =canvasWidth-40;i<canvasWidth;i++){
      ctx.globalAlpha = Math.abs(i-(canvasWidth-40))/40
      ctx.fillRect(i,yStart+2,1,yEnd-yStart-4);
    }
    ctx.globalAlpha = 1;
    if(prio=="true")
    priority(ctx,210,yStart+18)

    if(chosen){//frame that is drawn if the tile i chosen
      ctx.fillStyle = "#FFC504";
      ctx.fillRect(2,yStart+2,canvasWidth-2,4+(status==1?(3):(0)));//top
      ctx.fillRect(canvasWidth-4,yStart+2,4,addition-2);//right
      ctx.fillRect(2,yStart+addition-4,canvasWidth-2,4);//bottom
      ctx.fillRect(2,yStart+2,4,addition-2);//left
    }
  }

  const priority =(ctx, x, y) => {
    var path = new Path2D("M"+(18+x)+","+(25.905+y)+"l9.27,5.595l-2.46,-10.545l8.19,-7.095l-10.785,-0.915l-4.215,-9.945l-4.215,9.945l-10.785,0.915l8.19,7.1l-2.46,10.54z");
    ctx.beginPath();
    ctx.stroke(path);
    ctx.fill();
  }

  const drawBox =(ctx, x, y) => {
    var path = new Path2D("M"+(28.735+x)+","+(23+y)+"v-11.43a2.892,2.892,0,0,0,-1.346,-2.47l-9.425,-5.714a2.56,2.56,0,0,0,-2.693,0l-9.425,5.714a2.892,2.892,0,0,0,-1.346,2.47v11.43a2.892,2.892,0,0,0,1.346,2.471l9.425,5.713a2.56,2.56,0,0,0,2.693,0l9.425,-5.713a2.892,2.892,0,0,0,1.346,-2.471z");
    var path2 = new Path2D("M"+(4.905+x)+","+(10.44+y)+"l11.713,7.575l11.712,-7.575");
    var path3 = new Path2D("M"+(17+x)+","+(32+y)+"v-15.12");
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.stroke(path);
    ctx.stroke(path2);
    ctx.stroke(path3);
    ctx.fill();
  }

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
      <canvas className="canvasKolejka" ref={canvasRef} {...props} />
    </div>
  );
};


export default CanvasKolejka;
