import '../styles/globals.css'
import useUser from "../lib/useUser";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import TopNavbar from "../components/TopNavbar";
import Router from "next/router";
import React, { Component, useState } from "react";



function MyApp({ Component, pageProps }) {

  const [chosenMenuElement, setchosenMenuElement] = useState(1);
  const [chosenMenuSubElement, setchosenMenuSubElement] = useState(1);
  const [OLDchosenMenuElement, setOLDchosenMenuElement] = useState(-1);
  const [OLDchosenMenuSubElement, setOLDchosenMenuSubElement] = useState(-1);

  const updateSection = (newSec) => {
    if(chosenMenuSubElement!=OLDchosenMenuSubElement||chosenMenuElement!=OLDchosenMenuElement){  
        setchosenMenuElement(newSec) 
        setchosenMenuSubElement(1)
        setOLDchosenMenuElement(chosenMenuElement)
        setOLDchosenMenuSubElement(chosenMenuSubElement)
    }
    else{
        setchosenMenuElement(newSec);
        setchosenMenuSubElement(1);  
    }
    
  };

  const updateSubSection = (newSubSec) => {
    
      setchosenMenuElement(chosenMenuElement);
      setchosenMenuSubElement(newSubSec);
  };

  const updateBoth = (newSec, newSubSec) => {
   
      setchosenMenuElement(newSec);
      setchosenMenuSubElement(newSubSec);
  };

  const section = {
    OLDchosenMenuElement: OLDchosenMenuElement,
    OLDchosenMenuSubElement: OLDchosenMenuSubElement,
    updateBoth:updateBoth,
    setSection:updateSection,
    setSubSection:updateSubSection,
    getSection:chosenMenuElement,
    getSubSection:chosenMenuSubElement
  };

  const { user,mutateUser,token } = useUser();
  const updateHistory=(redirectTo)=>Router.push(redirectTo);
  const isLoggedIn = user?.isLoggedIn;

  pageProps={
    updateHistory,
    section,
    ...pageProps};

  return (
    <SWRConfig
      value={{
        fetcher: (input, init)=>{try{fetchJson(input, init);}catch(e){console.log(e);}},
        onError: (err) => {
          console.error(err);
        },
      }}
    >

<TopNavbar 
  token={{data:token?(token):("")}} 
  name={user&&user.name?(user.name):("Nie zalogowano")} 
  section={section} 
  updateHistory={updateHistory}
  isLoggedIn={isLoggedIn}
  mutateUser={mutateUser}>
</TopNavbar>
      
      <Component {...pageProps} />
      
      
    </SWRConfig>
  );
}

export default MyApp;
