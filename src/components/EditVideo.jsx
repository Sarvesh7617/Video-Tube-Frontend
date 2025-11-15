import React, { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {Button,IoCloseCircleOutline} from "./index";
import GetImagePreview from "./GetImagePreview";
import {updateAVideo,updateUploadState} from "../store/Slices/videoSlice";
import {useForm} from "react-hook-form";
import Spinner from "./Spinner";





const EditVideo=({
    videoId,
    description,
    title,
    setEditVideoPopup,
    thumbnail
})=>{
    const {handleSubmit,control,register,formState:{errors},setValue}=useForm();
    const dispatch=useDispatch();
    const uploading=useSelector((state)=>state.video?.uploading);


    const handleClosePopup=()=>{
        setEditVideoPopup((prev)=>({
            ...prev,
            uploadVideo:false,
            editVideo:false
        }))
    }


    const updateVideo=async(data)=>{
        console.log("jo")
        await dispatch(updateAVideo({videoId,data}))
        setEditVideoPopup((prev)=>({
            ...prev,
            uploadVideo:false,
            editVideo:false
        }))
        dispatch(updateUploadState())
    }



    useEffect(()=>{
        setValue("title",title)
        setValue("description",description)
    },[title,description,setValue])



    if(uploading)
      return(
        <div className="w-52 border-1 border-slate-600 dark:bg-black bg-gray-500 flex gap-2 p-3">
            <Spinner/>
            <span className="text-md font-bold dark:text-white">Updating Video....</span>
        </div>
    )


    return(
        <div className="mt-5 fixed top-0 left-0 flex justify-center items-center w-full h-full dark:bg-black/80 bg-black/70 z-50">
            <form
                onSubmit={handleSubmit(updateVideo)}
                className="bg-gray-500 dark:bg-black p-2 outline-none overflow-y-scroll scrollbar-hidden border-1 border-blue-500 dark:border-slate-500 space-y-2 h-[30rem]"
            >
                <div className="flex justify-between items-center px-3 py-1 border-b-1 border-slate-200 bg-gray-800 space-x-5">
                    <div>
                        <h1 className="font-bold">Edit Video</h1>
                        <p className="text-xs mb-2">Share where you`ve worked on your profile.</p>
                    </div>
                    <IoCloseCircleOutline
                        onClick={handleClosePopup}
                        size={25}
                        className="cursor-pointer"
                    />
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 p-2 gap-5 text-black dark:text-white">
                    <div>
                        <GetImagePreview
                            label={"Thumbnail: "}
                            name={"thumbnail"}
                            control={control}
                            cameraSize={30}
                            cameraIcon
                            image={thumbnail}
                            className="object-contain w-full h-72 min-h-72"
                        />
                        <span className="text-red-500 text-sm">{errors.thumbnail?.message}</span>
                    </div>
                    <div className="flex flex-col justify-between sm:gap-0 gap-2">
                        <label className="font-bold">Title *</label>
                        <input
                            type="text"
                            {...register("title",{required:"Title is required"})}
                             className="border-1 dark:border-white border-blue-500 dark:focus:bg-[#222222] bg-gray-300 dark:bg-black focus:bg-gray-400 p-2"
                        />
                        <span className="text-red-500 text-sm">{errors.title?.message}</span>
                        <div className="mb-4">
                            <label className="font-bold">Description *</label>
                            <textarea
                                rows="4"
                                className="border-1 dark:border-white border-blue-500 overflow-y-scroll scrollbar-hidden w-full dark:focus:bg-[#222222] bg-gray-300 dark:bg-black outline-none focus:bg-gray-400 p-2"
                                {...register("description",{required:"Description is required"})}
                            />
                            <span>{errors.description?.message}</span>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                className="!bg-red-500 hover:scale-105 transition-transform duration-300"
                                onClick={handleClosePopup}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="!bg-green-500 hover:scale-105 transition-transform duration-300"
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}




export default EditVideo;