import React from "react";
import {Button,Logo} from "./index.js";
import {Link} from "react-router-dom";


const LoginPopUp=()=>{
    return(
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
            <div className="text-black dark:text-white dark:bg-slate-700 bg-gray-300 border-2 border-purple-500 rounded-md p-8 flex flex-col justify-center items-center gap-y-2">
                <div >
                    <Logo/>
                </div>
                <p className="text-center pt-4 font-bold text-xl">
                    Login or Signup to continue
                </p>
                <Link to={"/login"}>
                    <Button className="!pl-27 !pr-27 hover:scale-106 transition-transform duration-300">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}


export default LoginPopUp;