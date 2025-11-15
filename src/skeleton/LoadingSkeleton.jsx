import React from "react";
import {Button} from "../components/index.js";



const LoadingSkeleton=({register=false})=>{
    const loadingSkeletonStyle ="animate-pulse bg-slate-500 h-10 w-full rounded mb-2";

    return(
        <div className="flex items-center w-full h-screen justify-center dark:bg-black">
            <div className="border-1 border-slate-500 text-center max-w-lg w-full dark:text-white font-bold space text-xl p-3 space-y-8 rounded-md">
                {register?(
                <>
                    <h1>Registering....</h1>
                    <div className="flex flex-col gap-5">
                        <input className={`${loadingSkeletonStyle}`} readOnly/>
                        <input className={`${loadingSkeletonStyle}`} readOnly/>
                        <input className={`${loadingSkeletonStyle}`} readOnly/>
                        <Button className={`${loadingSkeletonStyle}`} readOnly/>
                    </div>
                </>
                ):(
                <>
                    <h1>Loging....</h1>
                    <div className="flex flex-col gap-5">
                        <input className={`${loadingSkeletonStyle}`} readOnly/>
                        <input className={`${loadingSkeletonStyle}`} readOnly/>
                        <Button className={`${loadingSkeletonStyle}`} readOnly/>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}




export default LoadingSkeleton;