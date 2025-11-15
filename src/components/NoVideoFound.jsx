import React from "react";
import { FaPlayCircle } from "./index";



const NoVideoFound=({text})=>{
    return( 
        <>
            <div className="flex flex-col pb-20 items-center justify-center dark:text-white h-screen">
                <FaPlayCircle
                    size={50}
                    className="fill-purple-500"
                />
                <p className="font-medium text-2xl">There are no videos available here.</p>
                {text && <p>{text}</p>}
            </div>
        </>
    )
}



export default NoVideoFound;