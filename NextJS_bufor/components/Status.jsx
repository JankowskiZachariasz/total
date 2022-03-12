import React, { Component } from "react";
import bck from "../graphics/bck.svg";
import bckGreen from "../graphics/bckGreen.svg";
import "./Status.css";

function Status(statusCode, p) {
    let w = statusCode == 1 ? 77 : statusCode == 2 ? 105 : 97;
    let z = parseInt((w * p) / 100);
    let color = "red";
    let text = "błąd";
    var white = true;
    switch (statusCode) {
      case 1: {
        color = "#1A9142";
        text = "AKTYWNE";
        break;
      }
      case 2: {
        color = "#848484";
        text = "BUFOROWANIE";
        break;
      }
      case 3: {
        color = "#848484";
        text = "OCZEKUJĄCE";
        break;
      }
      case 4: {
        color = "#87C19A";
        text = "UKOŃCZONE";
        //white=false;
     
        break;
      }
      case 5: {
        color = "#848484";
        text = "USUNIĘTE";
        break;
      }
    }
    return (
      <div>
        <div
          className={white?("statusQueuedwhiteText"):("statusQueuedblackText")}
          style={{
            backgroundColor: color,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: z + "px 50%",
            backgroundImage: `url(${statusCode == 1 ? bckGreen : bck}`,
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  export default Status;