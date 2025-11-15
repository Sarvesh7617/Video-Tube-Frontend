import React,{useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoginPopup from "./LoginPopup";



const AuthLayout=({children,authentication=true})=>{

    const navigate=useNavigate();
    const authStatus=useSelector(state=>state.auth.status)
    
    useEffect(()=>{
        if (!authentication && authStatus!==authentication)
          navigate('/')
    },[authentication,navigate,authStatus])

    if (authentication && authStatus !== authentication)
      return <LoginPopup/>
    
    return <>{children}</>
}



export default AuthLayout;