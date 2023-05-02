import { useState } from "react"
import axios from "axios"
import "./login.css"
import { Link } from "react-router-dom";
import {GoogleLogin} from "react-google-login"
const clientId="1043906522623-joaeabjgseg9qodh0fuutqlv6jrm35bn.apps.googleusercontent.com"
const Login=()=>{
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")

    let handleSubmit = async () => {
      let payload = {
        email,
        password:pass,
      };
      try {
        let sendData = await axios.post(
          `https://pink-hilarious-blackbuck.cyclic.app/users/login`,
          // `http://localhost:3000`,
          payload
        );
        if (sendData.status === 200) {
        
          localStorage.setItem("token", sendData.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `${sendData.data.token}`;
          alert("Login Successfull.")
          window.location.href = "http://localhost:3001/dashboard";
        }
      } catch (error) {
      alert("Login failed")
      }
    };
    const onSuccess=(res)=>{
      console.log("LOGIN SUCCESS! Current user:",res.profileObj)
       localStorage.setItem("token", res.accessToken);
      // console.log(res.profileObj.googleId)
    }
    // console.log("OUT",profileObj)
    const onFailure=(res)=>{
      console.log("LOGIN FAILED! res:",res)
    }

    return (
        <>
        <h1>Login Page</h1>
        <div className="form-container">
            <label htmlFor="email">Email:</label> 
            <input id="email" type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" placeholder="Enter Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
            <button onClick={()=>handleSubmit()}>Submit</button>
            {/* <button onClick={() => handleGoogleLogin()}>Login with Google</button> */}
        </div>
       
        <div id="signInButton">
        <GoogleLogin clientId={clientId} buttonText="Login with google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={"single_host_origin"} isSignedIn={true}  className="google-login-button"/>
        </div>
        </>
    )
}


export {Login}
