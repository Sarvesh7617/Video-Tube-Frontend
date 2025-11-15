import React, { useState,useEffect } from "react";
import {MdOutlineCloudUpload,IoCloseCircleOutline, Button} from "./index.js";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import GetImagePreview from "./GetImagePreview";
import {updateAvatar,updateCoverImage} from "../store/Slices/authSlice"




const EditAvatar=({coverImg,preImage})=>{
    const [isOpen,setIsOpen]=useState(false);
    const dispatch=useDispatch();

    const {handleSubmit,control,formState:{errors}}=useForm();

    const upload=(data)=>{
        setIsOpen(false)
        const formData=new FormData();
        formData.append(`${coverImg?"coverImage":"avatar"}`,data.avatar[0])

        if(data)
        {
            if(coverImg)
                dispatch(updateCoverImage(formData))
            else
                dispatch(updateAvatar(formData))
        }
    }

    


    return(
        <form onSubmit={handleSubmit(upload)} className="relative">
            <MdOutlineCloudUpload
                size={35}
                onClick={()=>setIsOpen((prev)=>!prev)}
                className="bg-white text-black p-1 rounded-md opacity-80 cursor-pointer hover:text-gray-500 hover:scale-105 transition-transform duration-300"
            />
            {isOpen &&(
                <div className="z-50 w-full h-full dark:bg-black/70 bg-gray-300/70 fixed top-0 left-0 flex justify-center items-center">
                    <div className="border-2 rounded-md shadow-lg p-8 dark:bg-black bg-gray-600 w-full max-w-lg relative">
                        <Button
                            onClick={()=>setIsOpen(false)}
                            className="absolute top-5 right-5 !bg-gray-500 hover:scale-105 transition-transform duration-300 !p-1"
                        >
                            <IoCloseCircleOutline size={25}/>
                        </Button>

                        <h2 className="text-lg font-bold text-white mb-4">Change {coverImg?"Cover":"Profile"} Picture</h2>
                        <div className="flex flex-col items-center">
                            <GetImagePreview
                                name={"avatar"}
                                control={control}
                                cameraIcon
                                cameraSize={30}
                                image={preImage}
                                 className={"w-full h-full object-contain min-h-20 max-h-60 bg-[#222222]"}
                            />

                            <Button
                                type="submit"
                                className="!bg-purple-400 !w-full hover:!bg-purple-500 mt-5"
                            >Upload</Button>
                        </div>
                        {errors.avatar && (
                            <span>{errors.avatar.message}</span>
                        )}
                    </div>
                </div>
            )}
        </form>
    )
}


export default EditAvatar;