import React, { useRef, useEffect } from "react";

function Koncowka(liczba){

    if(liczba==0)return(" ZLECEŃ");
    if(liczba==1)return(" ZLECENIE");

    var text = `${liczba}`;

    var output="";
    var ostatnia = text.charAt(text.length-1);
    switch(ostatnia){
      case("1"):{
        if(liczba>10){output=" ZLECEŃ";break;}
        else {output=" ZLECEŃ";break;}}
      case("2"):{
        if(liczba<10){output=" ZLECENIA";break;}
        if(liczba>10&&liczba<20){output=" ZLECEŃ";break;}
        else if(liczba>20&&liczba<30){output=" ZLECENIA";break;}}
      case("3"):{if(liczba<10){output=" ZLECENIA";break;}
      if(liczba>10&&liczba<20){output=" ZLECEŃ";break;}
      else if(liczba>20&&liczba<30){output=" ZLECENIA";break;}}
      case("4"):{if(liczba<10){output=" ZLECENIA";break;}
      if(liczba>10&&liczba<20){output=" ZLECEŃ";break;}
      else if(liczba>20&&liczba<30){output=" ZLECENIA";break;}}
      case("5"):{output=" ZLECEŃ";break;}
      case("6"):{output=" ZLECEŃ";break;}
      case("7"):{output=" ZLECEŃ";break;}
      case("8"):{output=" ZLECEŃ";break;}
      case("9"):{output=" ZLECEŃ";break;}
      case("0"):{output=" ZLECEŃ";break;}
    }
    return output;


    
  }
  export default Koncowka;