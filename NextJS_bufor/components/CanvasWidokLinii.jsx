import React, { useRef, useEffect } from "react";
import styles from "./CanvasWidokLinii.module.css";
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
      if(e.type==11)
      e.x=200;

      if(e.type==10)
      e.x=1031+(props?.shifters[1]*(-928/13467));

      if(e.type==9)
      e.x=1031+(props?.shifters[0]*(-928/13467));
      
      e.draw(ctx, e);
      
         
    });

    //przenośnik szeroki na podkłady
    ctx.strokeStyle = "#444B53";
    ctx.strokeRect(830, 109, 5, 214);
    ctx.strokeRect(924, 109 , 5,214);
   for (var i = 0; i < 17; i++) {
     ctx.strokeRect(833,109 + i * 13, 94, 5);
   }
   ctx.font = "11px Arial";
      ctx.fillStyle = "#777";
      ctx.fillText('PR1084', 859, 104);


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
      <canvas className={styles.CanvasWidokLinii} ref={canvasRef} {...props} />
    </div>
  );
};


const PrzenosnikDlugi = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 325);
        ctx.strokeRect(x+ 65, y , 5,325);
       for (var i = 0; i < 24; i++) {
         ctx.strokeRect(x+3,y +9 + i * 13, 65, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
         if(element&&whichElement<=3){
          ctx.fillStyle = selfRef.chosenPackageColor1;
          ctx.fillRect(x+7, 81*whichElement+ y+5, 55, 71);
         }
       });
       if(selfRef.id==6){
        ctx.font = "11px Arial";
        ctx.fillStyle = "#777"
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x-42, selfRef.y+20);
       }
       else{
        ctx.font = "11px Arial";
        ctx.fillStyle = "#777";
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+16, selfRef.y+3);
       }
       

      }
    });
    i.num++;
  }
};

const PrzenosnikDlugiWjazdowy = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 1,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 325);
        ctx.strokeRect(x+ 65, y , 5,325);
       for (var i = 0; i < 24; i++) {
         ctx.strokeRect(x+3,y +9 + i * 13, 65, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
         if(element&&whichElement<=0){
          ctx.fillStyle = selfRef.chosenPackageColor1;
          ctx.fillRect(x+7, 81*(whichElement+3)+ y+5, 55, 71);
         }
       });
       if(selfRef.id==6){
        ctx.font = "11px Arial";
        ctx.fillStyle = "#777"
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x-52, selfRef.y+20);
       }
       else{
        ctx.font = "11px Arial";
        ctx.fillStyle = "#777";
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+23, selfRef.y+3);
       }
       

      }
    });
    i.num++;
  }
};

const PrzenosnikDlugiKrotszy = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 2,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 310);
        ctx.strokeRect(x+ 65, y , 5,310);
       for (var i = 0; i < 23; i++) {
         ctx.strokeRect(x+3,y +9 + i * 13, 65, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
        if(element&&whichElement<=3){
          ctx.fillStyle = selfRef.chosenPackageColor1;
         ctx.fillRect(x+7, 81*whichElement+ y+2, 55, 71);
        }
      });

      ctx.font = "11px Arial";
      ctx.fillStyle = "#777";
      ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+16, selfRef.y+3);

      }
    });
    i.num++;
  }
};

const PrzenosnikDlugiFilar = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false],//tylko 3 się mieszczą
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 3,
      draw: (ctx, selfRef)=>{

      //   ctx.strokeStyle = color;
      //   ctx.strokeRect(x, y+96, 5, 225);
      //   ctx.strokeRect(x+ 65, y+96 , 5,225);
      //  for (var i = 0; i < 17; i++) {
      //    ctx.strokeRect(x+3,y +103 + i * 13, 65, 5);
      //  }
      //  selfRef.pozycja.forEach((element,whichElement) => {
      //   if(element&&whichElement<=2){
      //     ctx.fillStyle = selfRef.chosenPackageColor1;
      //    ctx.fillRect(x+7, 75*whichElement+ y+103, 55, 65);
      //   }
      // });
      // ctx.font = "11px Arial";
      // ctx.fillStyle = "#777";
      // ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+23, selfRef.y+3);

      }
    });
    i.num++;
  }
};

const PrzenosnikWjazdowy1 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],//nie wiej niż 1
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 4,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 159);
        ctx.strokeRect(x+ 65, y , 5,159);
       for (var i = 0; i < 12; i++) {
         ctx.strokeRect(x+3,y +6 + i * 13, 65, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
        if(element&&whichElement<=0){
          ctx.fillStyle = selfRef.chosenPackageColor1;
         ctx.fillRect(x+7, 81+81*whichElement+ y+5, 55, 71);
        }
      });

      ctx.font = "11px Arial";
      ctx.fillStyle = "#777";
      ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+16, selfRef.y);

      }
    });
    i.num++;
  }
};

const PrzenosnikWjazdowyGlowny = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],//nie więcej niż 3
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 5,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 247);
        ctx.strokeRect(x+ 67, y , 5,247);
       for (var i = 0; i < 19; i++) {
         ctx.strokeRect(x+3,y +6 + i * 13, 67, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
        if(element&&whichElement<=2){
          ctx.fillStyle = selfRef.chosenPackageColor1;
         ctx.fillRect(x+9, 81*whichElement+ y+5, 55, 71);
        }
      });

      ctx.font = "11px Arial";
      ctx.fillStyle = "#777";
      ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+16, selfRef.y);

      }
    });
    i.num++;
  }
};

const PrzenosnikSzeroki = (x, y, d, color, i) => {
  console.log('Przenosnik Szeroki')
  console.log(x)
  console.log(y)
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 6,
      draw: (ctx, selfRef)=>{

      //   ctx.strokeStyle = color;
      //   ctx.strokeRect(x, y, 5, 214);
      //   ctx.strokeRect(x+ 94, y , 5,214);
      //  for (var i = 0; i < 17; i++) {
      //    ctx.strokeRect(x+3,y + i * 13, 94, 5);
      //  }

      //  ctx.font = "11px Arial";
      // ctx.fillStyle = "#777";
      // ctx.fillText(nomeForId(i)?(nomeForId(i).toUpperCase()):(''), x, y);

      }
    });
    i.num++;
  }
};

const PrzenosnikMalutki = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false],//nie więcej niż 1
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 7,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 121);
        ctx.strokeRect(x+ 71, y , 5,121);
       for (var i = 0; i < 10; i++) {
         ctx.strokeRect(x+3,y + 4 + i * 12, 71, 5);
       }
      //  selfRef.pozycja.forEach((element,whichElement) => {
      //   if(element&&whichElement<=0){
      //     ctx.fillStyle = selfRef.chosenPackageColor1;
      //    ctx.fillRect(x+10, 81*whichElement+ y+10, 55, 71);
      //   }
      // });

      ctx.font = "11px Arial";
      ctx.fillStyle = "#777";
      ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+31, selfRef.y-1);

      }
    });
    i.num++;
  }
};

const PrzenosnikBufor2 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false],//nie więcej niż 2
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 8,
      draw: (ctx, selfRef)=>{

        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, 5, 172);
        ctx.strokeRect(x+ 64, y , 5,172);
       for (var i = 0; i < 14; i++) {
         ctx.strokeRect(x+3,y + 4 + i * 12, 62, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
        if(element&&whichElement<=1){
          ctx.fillStyle = selfRef.chosenPackageColor1;
         ctx.fillRect(x+7, 81*whichElement+ y+2, 55, 71);
        }
      });

      ctx.font = "11px Arial";
      ctx.fillStyle = "#777";
      ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x+16, selfRef.y+1);

      }
    });
    i.num++;
  }
};

const Przesuwnica1 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],//nie więcej niż 2
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 9,
      draw: (ctx, selfRef)=>{

        ctx.fillStyle = "#212830";
        ctx.fillRect(selfRef.x, y,90,228);
        ctx.strokeStyle = color;
        ctx.strokeRect(selfRef.x, y, 14, 228);
        ctx.fillStyle = "#4B4F53";
        ctx.fillRect(selfRef.x, y, 7, 228);
        ctx.fillRect(selfRef.x+ 77, y-1 , 24,229);
        ctx.fillRect(selfRef.x+ 102, y , 6,228);
       for (var i = 0; i < 19; i++) {
         ctx.strokeRect(selfRef.x+14,y + 4 + i * 12, 71, 5);
       }
       selfRef.pozycja.forEach((element,whichElement) => {
        if(element&&whichElement<=1){
          ctx.fillStyle = selfRef.chosenPackageColor1;
         ctx.fillRect(selfRef.x+17, 81*whichElement+ y+30, 55, 71);
        }
      });

      ctx.font = "11px Arial";
        ctx.fillStyle = "#777"
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x-42, selfRef.y+20);

      }
    });
    i.num++;
  }
};

const Przesuwnica2 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      packageId:'',
      chosenPackageColor1:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false,false,false],//nie więcej niż 2
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 10,
      draw: (ctx, selfRef)=>{

        ctx.fillStyle = "#212830";
        ctx.fillRect(selfRef.x, y,110,173);
        ctx.strokeStyle = color;
        ctx.strokeRect(selfRef.x, y, 31, 173);
        ctx.fillStyle = "#4B4F53";
        ctx.fillRect(selfRef.x, y, 27, 173);

        ctx.strokeRect(selfRef.x+ 90, y , 35,173);
        ctx.fillRect(selfRef.x+ 93, y , 32,173);
        for (var i = 0; i < 14; i++) {
          ctx.strokeRect(selfRef.x+31,y + 6 + i * 12, 58, 5);
        }
        selfRef.pozycja.forEach((element,whichElement) => {
          if(element&&whichElement<=1){
           ctx.fillStyle = selfRef.chosenPackageColor1;
           ctx.fillRect(selfRef.x+32, 81*whichElement+ y+10, 55, 71);
          }
        });

        ctx.font = "11px Arial";
        ctx.fillStyle = "#777"
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x-42, selfRef.y+20);

      }
    });
    i.num++;
  }
};

const Przesuwnica3 = (x, y, d, color, i) => {
  if (i != null && i.typeof != "undefined") {
    d.push({
      text: nomeForId(i.num),
      nitka: i.nitka,
      color: color,
      pockageColor1: '',
      pockageColor2: '',
      pockageColor3: '',
      pockageColor4: '',
      pockageColor5: '',
      pockageColor6: '',
      packageId:'',
      packageId1:'',
      packageId2:'',
      chosenPackageColor1:'#555',
      chosenPackageColor2:'#555',
      chosenPackageColor3:'#555',
      ruch:false,
      x: x,
      y: y,
      id: i.num,
      lp: false,
      pp: false,
      pozycja: [false,false],//nie więcej niż 2
      pozycja1: [false,false],//nie więcej niż 2
      pozycja2: [false,false, false],//nie więcej niż 2
      ids: ["0000000000","0000000000","0000000000","0000000000"],
      type: 11,
      draw: (ctx, selfRef)=>{




        ctx.strokeStyle = color;
        ctx.fillStyle = "#212830";
        ctx.fillRect(selfRef.x, y,327,171);
        ctx.fillStyle = "#4B4F53";
        
        ctx.strokeRect(selfRef.x, y, 32, 171);
        ctx.fillRect(selfRef.x, y, 20, 171);


        for (var i = 0; i < 14; i++) {ctx.strokeRect(selfRef.x+32,y + 6 + i * 12, 76, 5);}
        ctx.strokeRect(selfRef.x+109, y, 16, 171);
        for (var i = 0; i < 14; i++) {ctx.strokeRect(selfRef.x+125,y + 6 + i * 12, 76, 5);}
        ctx.strokeRect(selfRef.x+201, y, 16, 171);
        for (var i = 0; i < 14; i++) {ctx.strokeRect(selfRef.x+217,y + 6 + i * 12, 76, 5);}

        ctx.strokeRect(selfRef.x+293, y, 32, 171);
        ctx.fillRect(selfRef.x+305, y, 20, 171);

        selfRef.pozycja.forEach((element,whichElement) => {
          if(element&&whichElement<=1){
           ctx.fillStyle = selfRef.chosenPackageColor1;
           ctx.fillRect(selfRef.x+43, 81*whichElement+ y+10, 55, 71);
          }
        });
        selfRef.pozycja1.forEach((element,whichElement) => {
          if(element&&whichElement<=1){
           ctx.fillStyle = selfRef.chosenPackageColor2;
           ctx.fillRect(selfRef.x+135, 81*whichElement+ y+10, 55, 71);
          }
        });
        selfRef.pozycja2.forEach((element,whichElement) => {
          if(element&&whichElement<=1){
           ctx.fillStyle = selfRef.chosenPackageColor3;
           ctx.fillRect(selfRef.x+227, 81*whichElement+ y+10, 55, 71);
          }
        });
        ctx.font = "11px Arial";
        ctx.fillStyle = "#777"
        ctx.fillText(selfRef?.text?(selfRef?.text.toUpperCase()):(''), selfRef.x-42, selfRef.y+20);
      }
    });
    i.num++;
  }
};


const NitkaBuforuNaDole = (x, dataArray, i) => {
  PrzenosnikBufor2(x, 2379, dataArray, "#444B53", i);
  PrzenosnikBufor2(x, 2555, dataArray, "#444B53", i);
};

const Wjazdowe = (dataArray, i) => {
  PrzenosnikWjazdowy1(0, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(93, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(187, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(279, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(371, 166, dataArray, "#444B53", i);
  PrzenosnikWjazdowy1(462, 166, dataArray, "#444B53", i);
  PrzenosnikDlugiWjazdowy(570, 0, dataArray, "#444B53", i);
  PrzenosnikWjazdowyGlowny(739, 76, dataArray, "#444B53", i);
  //PrzenosnikSzeroki(830, 109, dataArray, "#444B53", i);
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
  Przesuwnica2(0, 2191, dataArray, "#444B53", i);
  for(var j=0;j<12;j++){NitkaBuforuNaDole(j*93,dataArray, i);}
  Przesuwnica3(57, 2736, dataArray, "#444B53", i);
console.log(dataArray)
  return dataArray;
};

export default Canvas;

const nomeForId = (id) => {

  var map=[
    'PR1004','PR1014','PR1024','PR1034','PR1044','PR1054','PR1064','PR1074','PG',
    'WU200',
    'PR2000','PR2001','PR2002','PR2003','PR2004',
    'PR2010','PR2011','PR2012','PR2013','PR2014',
    'PR2020','PR2021','PR2022','PR2023','PR2024',
    'PR2030','PR2031','PR2032','PR2033','PR2034',
    'PR2040','PR2041','PR2042','PR2043','PR2044',
    'PR2050','PR2051','PR2052','PR2053','PR2054',
    'PR2060','PR2061','PR2062','PR2063','PR2064',
    'PR2070','PR2071','PR2072','PR2073','PR2074',
    'PR2080','PR2081','PR2082','PR2083','PR2084',
    'PR2090','PR2091','PR2092','PR2093','PR2094',
    'PR2100','PR2101','PR2102','PR2103','PR2104',
    'PR2110','PR2111','PR2112','PR2113','PR2114',
    'WU300',
    'PR3000','PR3001',
    'PR3010','PR3011',
    'PR3020','PR3021',
    'PR3030','PR3031',
    'PR3040','PR3041',
    'PR3050','PR3051',
    'PR3060','PR3061',
    'PR3070','PR3071',
    'PR3080','PR3081',
    'PR3090','PR3091',
    'PR3100','PR3101',
    'PR3110','PR3111',
    'TC155'
  ]
  return map[id];

}