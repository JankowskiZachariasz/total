import React, { useRef, useEffect } from "react";
import "./CanvasWidokLinii.module.css";
import hmg from "../graphics/hmg.svg";

const Canvas = (props) => {
  const canvasWidth = 1100;
  const canvasHeight = 3000;
  const scale = props.scale;
  const setscale = props.setscale;
  // const [scale, setscale] = React.useState(1);
  //const [data, setdata] = React.useState([]);
  
  const data = props.data;
  const setdata = props.setdata;
  const [canvaspos, setcanvaspos] = React.useState({ x: 0, y: 0 });
  const [nums, setnums] = React.useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });

  const updateMousePosition = (ev) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  const mouseClick = () => {
    //console.log(data);
    var x = Math.floor((mousePosition.x - canvaspos.x) / scale);
    var y = Math.floor((mousePosition.y - canvaspos.y) / scale);
    setnums({x: x,y: y,});
    props.przenosnikClick(x,y,()=>handleresize());
    
  };

  const handleScroll = () => {
    if (canvasRef.current != null)
      setcanvaspos({
        x: canvasRef.current.getBoundingClientRect().x,
        y: canvasRef.current.getBoundingClientRect().y,
      });
  };

  const handleresize = () => {
    if (canvasRef.current != null) {
      setcanvaspos({
        x: canvasRef.current.getBoundingClientRect().x,
        y: canvasRef.current.getBoundingClientRect().y,
      });
      setscale(canvasRef.current.getBoundingClientRect().width / canvasWidth);
    }
  };


  const canvasRef = useRef();
  const draw = (ctx, frameCount) => {
    //console.log(...data);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //szyny przesuwnicy1
     ctx.fillStyle = "grey";
     ctx.fillRect(0, 386, 1078, 1);
     ctx.fillRect(0, 535, 1078, 1);

     //szyny przesuwnicy2
     //ctx.fillStyle = "grey";
     ctx.fillRect(0, 2243, 1078, 1);
     ctx.fillRect(0, 2341, 1078, 1);

      //szyny przesuwnicy3
      //ctx.fillStyle = "grey";
      ctx.fillRect(0, 2761, 1078, 1);
      ctx.fillRect(0, 2874, 1078, 1);

    //filar (najważniejszy)
    ctx.strokeRect(285, 1254, 27, 55);

    //przenosniki
     data.map((e, i) => {
    //   if (i < 93&&i!=75) {
         //przenosnik
         e.draw(ctx);
        //  ctx.strokeStyle = e.color;
        //  ctx.strokeRect(e.x, e.y, 5, 325);
        //  ctx.strokeRect(e.x+ 65, e.y , 5,325);
        // for (var x = 0; x < 33; x++) {
        //   ctx.strokeRect(e.x+3,e.y + x * 10, 65, 5);
        // }
      
    //   //paczki oraz klik
    //   ctx.fillStyle = "#999";
    //   var coloridLpc = props.ids.findIndex( x => x === e.lp_id );
    //   var coloridPpc = props.ids.findIndex( x => x === e.pp_id );
    //   var lpc = "#000";
    //   var ppc = "#000";
    //   if(coloridLpc>-1)lpc=props.colors[coloridLpc];
    //   if(coloridPpc>-1)ppc=props.colors[coloridPpc];
    //   if(e.lp_id==props.idColored)lpc="green";
    //   if(e.pp_id==props.idColored)ppc="green";
    //   if(e.lp_id=="999999")lpc="#403537";
    //   if(e.pp_id=="999999")ppc="#403537";
     


    //   if (i < 93&&i!=75) {
    //     if (e.lp) {ctx.fillStyle = lpc; ctx.fillRect(e.x + 10, e.y + 10, 60, 40);}
    //     if (e.pp) {ctx.fillStyle = ppc;ctx.fillRect(e.x + 90, e.y + 10, 60, 40);}
    //     if (e.lpCh) {
    //       ctx.strokeStyle = "red";
    //       ctx.strokeRect(e.x + 10, e.y + 10, 60, 40);
    //     }
    //     if (e.ppCh) {
    //       ctx.strokeStyle = "red";
    //       ctx.strokeRect(e.x + 90, e.y + 10, 60, 40);
    //     }
    //   } else {
    //     if (i == 93) {//lewa przesuwnica
    //       if (e.lp) {ctx.fillStyle = lpc;ctx.fillRect(e.x +40, e.y + 65, 60, 40);}
    //       if (e.pp) {ctx.fillStyle = ppc;ctx.fillRect(e.x +40, e.y + 139, 60, 40);}
    //       if (e.lpCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x +40, e.y + 65, 60, 40);
    //       }
    //       if (e.ppCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x +40, e.y + 139, 60, 40);
    //       }
    //     }
    //     else if (i == 94) {//prawa przesuwnica
    //       if (e.lp) {ctx.fillStyle = lpc;ctx.fillRect(e.x + 40, e.y + 10, 60, 40);}
    //       if (e.pp) {ctx.fillStyle = ppc;ctx.fillRect(e.x + 40, e.y + 84, 60, 40);}
    //       if (e.lpCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x + 40, e.y + 10, 60, 40);
    //       }
    //       if (e.ppCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x + 40, e.y + 84, 60, 40);
    //       }
    //     }
    //     else if (i >= 95&i<=97) {//paczki na homagach
    //       if (e.lp) {ctx.fillStyle = lpc;ctx.fillRect(e.x + 46, e.y + 16, 60, 40);}
    //       if (e.pp) {ctx.fillStyle = ppc;ctx.fillRect(e.x + 46, e.y + 185, 60, 40);}
    //       if (e.lpCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x + 46, e.y + 16, 60, 40);
    //       }
    //       if (e.ppCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x + 46, e.y + 185, 60, 40);
    //       }
    //     }
    //     else if(i==75){
    //       ctx.strokeStyle = "#444B53";
    //       ctx.strokeRect(232, 2362, 72, 5);
    //       ctx.strokeRect(232, 2362 + 55, 72, 5);
    //       for (var x = 0; x < 7; x++) {
    //         ctx.strokeRect(232 + 2 + x * 10, 2362 + 6, 5, 50);
    //       }
    //       if (e.lp) {ctx.fillStyle = lpc;ctx.fillRect(e.x + 10, e.y + 10, 60, 40);}
    //       if (e.lpCh) {
    //         ctx.strokeStyle = "red";
    //         ctx.strokeRect(e.x + 10, e.y + 10, 60, 40);
    //       }

    //     }
      // }
      //napisy
      // ctx.fillStyle = "#AAA";
      // ctx.font = "13px Arial";
      // if ((e.id >= 0) & (e.id <= 67)) {
      //   ctx.fillText("PR" + e.text, e.x, e.y - 2);
      // } else if ((e.id >= 69) & (e.id <= 92)) {
        
      //   if (e.id >= 69 && e.id <= 71) {
      //     ctx.fillText("PR" + (2+e.id), e.x, e.y - 2);
      //   }
      //   else if (e.id >= 72 && e.id <= 74) {
      //     ctx.fillText("PR" + ((78-e.id)*10), e.x, e.y - 2);
      //   }
      //   else if (e.id >= 75 && e.id <= 79) {
      //     ctx.fillText("PR" + (e.id-45), e.x, e.y - 2);
      //   }
      //   else if (e.id >= 80 && e.id <= 84) {
      //     ctx.fillText("PR" + (e.id-60), e.x, e.y - 2);
      //   }
      //   else if (e.id >= 85 && e.id <= 88) {
      //     ctx.fillText("PR" + (e.id-75), e.x, e.y - 2);
      //   }
      //   else if (e.id >= 89 && e.id <= 92) {
      //     ctx.fillText("PR" + (e.id-89), e.x, e.y - 2);
      //   }


      // }

      //ctx.fillText(e.x+", "+e.y, e.x, e.y);
      //ctx.fillText("PR" + e.text, e.x, e.y-2);
    });

    // ctx.arc(0, 0, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill();
  };
  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());
    window.addEventListener("resize", () => handleresize());

    setscale(canvasRef.current.getBoundingClientRect().width / canvasWidth);
    var arrayData = initialize();
    // arrayData[0] = { ...arrayData[0], lp: true };
    // arrayData[0] = { ...arrayData[0], pp: true };
    // arrayData[1] = { ...arrayData[1], lp: true };
    // for (var z = 8; z <= 10; z++) {
    //   arrayData[z] = { ...arrayData[z], lp: true };
    //   arrayData[z] = { ...arrayData[z], pp: true };
    // }
    // arrayData[92] = { ...arrayData[92], lp: true, pp:true };
    // arrayData[93] = { ...arrayData[93], lp: true, pp:true };
    setdata([...arrayData]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    const render = () => {
      frameCount++;
      //console.log(...data);
      draw(context, frameCount, data);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <div
      onMouseDown={() => mouseClick()}
      onMouseMove={(env) => updateMousePosition(env)}
      className="canvasWrapper"
    >
      {/* <div>{nums.y}</div> */}
      <canvas className="CanvasWidokLinii" ref={canvasRef} {...props} />
    </div>
  );
};

const PrzenosnikDlugi = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 325);
        ctx.strokeRect(x+ 65, y , 5,325);
       for (var i = 0; i < 24; i++) {
         ctx.strokeRect(x+3,y +9 + i * 13, 65, 5);
       }
      }
    });
    i.num++;
  }
};

const PrzenosnikDlugiKrotszy = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 310);
        ctx.strokeRect(x+ 65, y , 5,310);
       for (var i = 0; i < 23; i++) {
         ctx.strokeRect(x+3,y +9 + i * 13, 65, 5);
       }
      }
    });
    i.num++;
  }
};

const PrzenosnikDlugiFilar = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y+96, 5, 225);
        ctx.strokeRect(x+ 65, y+96 , 5,225);
       for (var i = 0; i < 17; i++) {
         ctx.strokeRect(x+3,y +103 + i * 13, 65, 5);
       }
      }
    });
    i.num++;
  }
};

const PrzenosnikWjazdowy1 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 159);
        ctx.strokeRect(x+ 65, y , 5,159);
       for (var i = 0; i < 12; i++) {
         ctx.strokeRect(x+3,y +6 + i * 13, 65, 5);
       }
      }
    });
    i.num++;
  }
};

const PrzenosnikWjazdowyGlowny = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 247);
        ctx.strokeRect(x+ 67, y , 5,247);
       for (var i = 0; i < 19; i++) {
         ctx.strokeRect(x+3,y +6 + i * 13, 67, 5);
       }

      }
    });
    i.num++;
  }
};

const PrzenosnikSzeroki = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 214);
        ctx.strokeRect(x+ 94, y , 5,214);
       for (var i = 0; i < 17; i++) {
         ctx.strokeRect(x+3,y + i * 13, 94, 5);
       }

      }
    });
    i.num++;
  }
};

const PrzenosnikMalutki = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 121);
        ctx.strokeRect(x+ 71, y , 5,121);
       for (var i = 0; i < 10; i++) {
         ctx.strokeRect(x+3,y + 4 + i * 12, 71, 5);
       }

      }
    });
    i.num++;
  }
};

const PrzenosnikBufor2 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 172);
        ctx.strokeRect(x+ 64, y , 5,172);
       for (var i = 0; i < 14; i++) {
         ctx.strokeRect(x+3,y + 4 + i * 12, 62, 5);
       }

      }
    });
    i.num++;
  }
};

const Przesuwnica1 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.fillStyle = "#212830";
        ctx.fillRect(x, y,90,228);
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 14, 228);
        ctx.fillStyle = "#4B4F53";
        ctx.fillRect(x, y, 7, 228);
        ctx.fillRect(x+ 77, y-1 , 24,229);
        ctx.fillRect(x+ 102, y , 6,228);
       for (var i = 0; i < 19; i++) {
         ctx.strokeRect(x+14,y + 4 + i * 12, 71, 5);
       }

      }
    });
    i.num++;
  }
};

const Przesuwnica2 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{

        ctx.fillStyle = "#212830";
        ctx.fillRect(x, y,110,173);
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 31, 173);
        ctx.fillStyle = "#4B4F53";
        ctx.fillRect(x, y, 27, 173);

        ctx.strokeRect(x+ 90, y , 35,173);
        ctx.fillRect(x+ 93, y , 32,173);
        for (var i = 0; i < 14; i++) {
          ctx.strokeRect(x+31,y + 6 + i * 12, 58, 5);
        }

      }
    });
    i.num++;
  }
};

const Przesuwnica3 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: i.nitka * 10 + (-i.num % -4) + 3,
      nitka: i.nitka,
      color: color,
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx)=>{
        ctx.strokeStyle = color;
        ctx.fillStyle = "#212830";
        ctx.fillRect(x, y,327,171);
        ctx.fillStyle = "#4B4F53";
        
        ctx.strokeRect(x, y, 32, 171);
        ctx.fillRect(x, y, 20, 171);


        for (var i = 0; i < 14; i++) {ctx.strokeRect(x+32,y + 6 + i * 12, 76, 5);}
        ctx.strokeRect(x+109, y, 16, 171);
        for (var i = 0; i < 14; i++) {ctx.strokeRect(x+125,y + 6 + i * 12, 76, 5);}
        ctx.strokeRect(x+201, y, 16, 171);
        for (var i = 0; i < 14; i++) {ctx.strokeRect(x+217,y + 6 + i * 12, 76, 5);}

        ctx.strokeRect(x+293, y, 32, 171);
        ctx.fillRect(x+305, y, 20, 171);
      }
    });
    i.num++;
  }
};


const NitkaBuforuNaDole = (x, dataArray, i) => {
  PrzenosnikBufor2(x, 2379, dataArray, "#444B53", i);
  PrzenosnikBufor2(x, 2550, dataArray, "#444B53", i);
};

const Wjazdowe = (dataArray, i) => {
  PrzenosnikWjazdowy1(0, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(93, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(187, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(279, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(371, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(462, 166, dataArray, "#444B53", i);
  PrzenosnikDlugi(561, 0, dataArray, "#444B53", i);
  PrzenosnikWjazdowyGlowny(739, 76, dataArray, "#444B53", i);
  PrzenosnikSzeroki(830, 109, dataArray, "#444B53", i);
  PrzenosnikMalutki(1003, 202, dataArray, "#444B53", i);
};

const NitkaBuforu = (x, dataArray, i) => {
  PrzenosnikDlugi(x, 570, dataArray, "#444B53", i);
  PrzenosnikDlugi(x, 896, dataArray, "#444B53", i);
  PrzenosnikDlugi(x, 1222, dataArray, "#444B53", i);
  PrzenosnikDlugi(x, 1547, dataArray, "#444B53", i);
  PrzenosnikDlugiKrotszy(x, 1873, dataArray, "#444B53", i);
};

const NitkaBuforuFilar = (x, dataArray, i) => {
  PrzenosnikDlugi(x, 570, dataArray, "#444B53", i);
  PrzenosnikDlugi(x, 896, dataArray, "#444B53", i);
  PrzenosnikDlugiFilar(x, 1222, dataArray, "#444B53", i);
  PrzenosnikDlugi(x, 1547, dataArray, "#444B53", i);
  PrzenosnikDlugiKrotszy(x, 1873, dataArray, "#444B53", i);
};


const initialize = () => {
  var num = 0;
  var nitka = 1;
  var i = { num: num, nitka: nitka };
  var dataArray = new Array();

  Wjazdowe(dataArray, i);
  Przesuwnica1(0, 333, dataArray, "#444B53", i);
  for(var j=0;j<12;j++){
    if(j==3){NitkaBuforuFilar(j*93,dataArray, i);}
    else NitkaBuforu(j*93,dataArray, i);
  }
  Przesuwnica2(0, 2196, dataArray, "#444B53", i);
  for(var j=0;j<12;j++){NitkaBuforuNaDole(j*93,dataArray, i);}
  Przesuwnica3(57, 2734, dataArray, "#444B53", i);

  return dataArray;
};

export default Canvas;
