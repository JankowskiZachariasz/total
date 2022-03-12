import React, { useRef, useEffect } from "react";
import "./CanvasCzasuKolejka.css";



const CanvasCzasuKolejka = (props) => {
  const canvasWidth = 100;
  const canvasHeight = props.height;
  const canvasRef = useRef();




  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '30px serif';
    ctx.fillStyle = "#000";


    var t = new Date(Date.now());
    var currentH = t.getHours();
    if(currentH<10)currentH='0'+currentH;
    var currentM = t.getMinutes();
    var nudge = Math.ceil((currentM/60)*props.hourInPixels);

    //one hour gap
    var keepFirst = (parseInt(currentM)<20);
    if(parseInt(currentM)<30)
    currentM='0'+currentM;
    //ctx.fillRect(2,yStart,198,yEnd-yStart);
    //ctx.fillText(currentH+':'+currentM, 5, props.hourInPixels);
    
    
    var h =2;
    var carryOn=true;
    for(var y=0;y<50;y++){
      //console.log(t.getHours());
      t.setHours(t.getHours()+ 1);//add an hour
      carryOn=(h*props.hourInPixels<=props.height);
      
      if(carryOn){
        ctx.fillStyle = "#333";
        var hh = t.getHours();
        if(hh<10)hh='0'+hh;

        if(h==2){
          if(keepFirst){

            ctx.font = '30px serif';
            ctx.fillText(currentH+":00", 5, (.75)*props.hourInPixels-nudge);

          }
          if(t.getHours()!=0){
            ctx.font = '30px serif';
            ctx.fillText(hh+":00", 5, (h-.25)*props.hourInPixels-nudge);
          }
          else{
              ctx.font = '25px serif';
              ctx.fillText(t.getDate()+" "+parseMonth(t.getMonth()), 0, (h-.25)*props.hourInPixels-nudge);
          }
          
        }
        else if(t.getHours()==0){
          ctx.font = '25px serif';
          ctx.fillText(t.getDate()+" "+parseMonth(t.getMonth()), 0, (h-.25)*props.hourInPixels-nudge);
        }
        else{
          ctx.font = '30px serif';
          ctx.fillText(hh+":00", 5, (h-.25)*props.hourInPixels-nudge);
        }
        h++;
      }

      if(!carryOn)y=50;
     
      
    }
    // ctx.fillText('15:00', 0, 50+props.hourInPixels);
    // ctx.fillText('16:00', 0, 250);
    // ctx.fillText('17:00', 0, 350);
    // ctx.fillText('18:00', 0, 450);
    // ctx.fillText('19:00', 0, 550);
    // ctx.fillText('20:00', 0, 650);
    // ctx.fillText('21:00', 0, 750);
    // ctx.fillText('22:00', 0, 850);
    // ctx.fillText('23:00', 0, 950);
    // ctx.fillStyle = "#000";
    // ctx.fillText('25 LUT', 0, 1050);
    // ctx.fillStyle = "#666";
    // ctx.fillText('01:00', 0, 1150);

  };


  const parseMonth = (m) =>{

    switch(m){
      case(0):{return "STY";}
      case(1):{return "LUT";}
      case(2):{return "MAR";}
      case(3):{return "KWI";}
      case(4):{return "MAJ";}
      case(5):{return "CZE";}
      case(6):{return "LIP";}
      case(7):{return "SIE";}
      case(8):{return "WRZ";}
      case(9):{return "PAŹ";}
      case(10):{return "LIS";}
      case(11):{return "GRU";}
    }
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
      <canvas className="canvasKolejkaCzas" ref={canvasRef} {...props} />
    </div>
  );
};


export default CanvasCzasuKolejka;
