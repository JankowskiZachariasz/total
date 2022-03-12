import React, { useRef, useEffect } from "react";

function OnlyDigits(liczba){

    var result = true;
    var text = `${liczba}`;
    for(var i =0;i<text.length;i++){
        var l = text.charAt(i);
        if(l=='1'||l=='2'||l=='3'||l=='4'||l=='5'||l=='6'||l=='7'||l=='8'||l=='9'||l=='0'){result=true;}
        else{
            result=false;
            return false;
            break;
        }
    }

    return result;
    
  }
  export default OnlyDigits;