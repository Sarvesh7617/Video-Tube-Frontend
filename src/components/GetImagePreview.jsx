import React, { useState } from "react";
import {Controller} from "react-hook-form";
import { FaCamera } from "./index.js";





const GetImagePreview=({
    label,
    name,
    control,
    cameraIcon=false,
    className,
    defaultValue="",
    cameraSize=20,
    image})=>{


        const [preview,setPrevew]=useState(null);


        const handlePreview=(e)=>{
            const files=e.target.files
            setPrevew(URL.createObjectURL(files[0]))
            return files
        }


        return (
            <>
                <div className="w-full text-black dark:text-white">
                    <label
                        htmlFor={name}
                        className="cursor-pointer relative flex flex-col justify-center items-start"
                    >
                        {label && (
                            <span className="inline-block mb-2 pl-1 font-bold">{label}</span>
                        )}


                        <img
                            src={preview || image}
                            className={className}
                        />

                        {cameraIcon && (
                            <FaCamera
                                size={cameraSize}
                                className="hover:text-purple-500 w-full absolute text-white"
                            />
                        )}

                        <Controller
                            name={name}
                            control={control}
                            defaultValue={defaultValue || ""}
                            render={({field:{onChange}})=>(
                                <input
                                    id={name}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e)=>{
                                        onChange(handlePreview(e))
                                    }}
                                />
                            )}
                            rules={{required:`${name} is required`}}
                        />
                    </label>
                </div>
            
            </>
        )
    }





export default GetImagePreview;