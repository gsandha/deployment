 import "./App.css";
import { Signup } from "./components/Signup";
 import { Login } from "./components/Login";
import React, { useState,useEffect } from 'react';
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/Navbar";
import {gapi} from "gapi-script"
const clientId="1043906522623-joaeabjgseg9qodh0fuutqlv6jrm35bn.apps.googleusercontent.com"

function App() {
useEffect(()=>{
  function start(){
    gapi.client.init({
      clientId:clientId,
      scope:""
    })
  }
  gapi.load("client:auth2",start)
})
  return (
    <>
  
    { <Navbar/> }
    { <AllRoutes/> }
    {/* <Login/> */}
 
    </>
  );
}

export default App;
