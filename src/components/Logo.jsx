import React from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

const Logo=()=>{
    return(
        <Link to={'/'} className="flex items-center">
            <img src={logo} className="max-w-10 max-h-10 rounded mr-0.5"/>
            <p className="text-black dark:text-white font-extrabold text-xl">Video<span className="text-[oklch(70.7%_0.165_254.624)] mr-2 font-extrabold">Tube</span></p>
        </Link>
    )
}



export default Logo;