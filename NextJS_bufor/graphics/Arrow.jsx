import React, { Component } from "react";

function Arrow({ enabled }) {
  return (
    <div>
      {enabled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24.415 23.797"
        >
          <path
            id="arrowEnabled"
            data-name="Icon awesome-arrow-right"
            d="M10.381,4.241l1.21-1.21a1.3,1.3,0,0,1,1.847,0L24.031,13.619a1.3,1.3,0,0,1,0,1.847L13.438,26.06a1.3,1.3,0,0,1-1.847,0l-1.21-1.21a1.309,1.309,0,0,1,.022-1.869l6.566-6.256H1.308A1.3,1.3,0,0,1,0,15.417V13.674a1.3,1.3,0,0,1,1.308-1.308H16.969L10.4,6.11A1.3,1.3,0,0,1,10.381,4.241Z"
            transform="translate(0 -2.647)"
           
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24.415 23.797"
        >
          <path
            id="arrowDisabled"
            data-name="Icon awesome-arrow-right"
            d="M10.381,4.241l1.21-1.21a1.3,1.3,0,0,1,1.847,0L24.031,13.619a1.3,1.3,0,0,1,0,1.847L13.438,26.06a1.3,1.3,0,0,1-1.847,0l-1.21-1.21a1.309,1.309,0,0,1,.022-1.869l6.566-6.256H1.308A1.3,1.3,0,0,1,0,15.417V13.674a1.3,1.3,0,0,1,1.308-1.308H16.969L10.4,6.11A1.3,1.3,0,0,1,10.381,4.241Z"
            transform="translate(0 -2.647)"
            
          />
        </svg>
      )}
    </div>
  );
}

export default Arrow;
