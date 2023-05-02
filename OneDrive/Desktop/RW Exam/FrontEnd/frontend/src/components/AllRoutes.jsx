import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Login } from "./Login";
import { Signup } from "./Signup";
import Google from "./Google";
const AllRoutes = () => {
  return (
    <Routes>
     
      <Route path="/dashboard" element={<Dashboard/>} />  
      <Route path="/login" element={<Login/>} />  
      <Route path="/signup" element={<Signup/>} />  
      <Route path="/auth/google" element={<Google/>}/>

    </Routes>
  );
};

export default AllRoutes;