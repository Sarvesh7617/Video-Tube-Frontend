import React from "react";
import {Button} from "../index";



const Header=({username,setPopUp})=>{
    return(
        <>
            <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mt-6 text-black px-2">
                <div className="dark:text-white">
                    <h1 className="font-bold text-2xl">Welcome Back,{username}</h1>
                    <p className="text-slate-500 text-xs">Seamless Video Management, Elevated Results.</p>
                </div>
                <div>
                    <Button
                        onClick={() =>
                        setPopUp((prev) => ({
                            ...prev,
                            uploadVideo: !prev.uploadVideo,
                        }))
                    }
                    >
                        Upload Video
                    </Button>
                </div>
            </section>
        </>
    )
}



export default Header;