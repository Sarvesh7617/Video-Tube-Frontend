import React, { useState,useEffect} from "react";
import {Button} from "./index";
import {useDispatch,useSelector} from "react-redux";
import {publishAVideo} from "../store/Slices/videoSlice";
import GetImagePreview from "./GetImagePreview";
import {IoCloseCircleOutline} from "./index";
import {useForm} from "react-hook-form";
import UploadingVideo from "./UploadingVideo";
import { updateUploadState } from "../store/Slices/videoSlice";
import { socket } from "../helpers/axiosHelper";
import { useLocation } from "react-router-dom";



const UploadVideo=({setUploadVideoPopup})=>{
    const [videoName,setVideoName]=useState("");
    const [videoSize,setVideoSize]=useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const dispatch=useDispatch();
    const uploading=useSelector((state)=>state.video.uploading);
    const uploaded=useSelector((state)=>state.video.uploaded);
    const [sizeError, setSizeError] = useState(false);
    const {handleSubmit,register,control,formState:{errors},reset}=useForm();
    const [videoPath,setVideoPath]=useState("");
    const [thumbnailPath,setThumbnailPath]=useState("");


    const currLocation=useLocation();
    const currURL=currLocation.pathname + currLocation.search;

    useEffect(() => {
       // Upload progress listener
        socket.on("uploadProgress", ({ progress }) => {
            setUploadProgress(progress);
        });

        // Temp file paths listener
        socket.on("tempPath", ({ videoFilePath, thumbnailLocalPath}) => {
            setVideoPath(videoFilePath);
            setThumbnailPath(thumbnailLocalPath);
        });

        return ()=>{
            socket.off("uploadProgress")
            socket.off("tempPath")
        }
    }, []);


    useEffect(() => {
        const sendCleanupRequest = () => {
            if (videoPath || thumbnailPath) {
            const payload = JSON.stringify({
                videoFilePath: videoPath,
                thumbnailPath: thumbnailPath,
            });

            navigator.sendBeacon(
                "http://localhost:8000/api/v1/videos/cancel-upload",
                new Blob(
                    [payload], 
                    { type: "application/json" }
                )
            );
            }
        };


        // Page refresh या tab close/navigate away
        const handleBeforeUnload = () => sendCleanupRequest();

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            sendCleanupRequest();
        };
    }, [videoPath, thumbnailPath,currURL]);


    const publishVideo=async(data)=>{
        setVideoSize(Math.floor(data.videoFile[0].size/(1024*1024)))              //size is always byte then 1MB=1024Kb,1KB=1024Byte
        setUploadProgress(0);
        await dispatch(publishAVideo({...data,})).unwrap()
    }


    const handleClosePopup = () => {
        setUploadVideoPopup((prev)=>!prev);      
        setUploadProgress(0);                      
        setVideoName("");                 
        setVideoSize(0); 
        dispatch(updateUploadState()); 
        reset();             
    };


    if(uploaded || uploading)
        return(
            <UploadingVideo
                videoFileName={videoName}
                fileSize={videoSize}
                setUploadVideoPopup={setUploadVideoPopup}
                uploaded={uploaded}
                uploadProgress={uploadProgress}
                thumbnailPath={thumbnailPath}
                videoPath={videoPath}
                closePopup={handleClosePopup}
            />
    )



    return(
        <>
            <div className="fixed left-0 top-[75px] w-full h-full bg-gray-300/75 dark:bg-black/75 dark:text-white text-black z-30">
                <div className="relative mt-4 w-[95vw] sm:w-3/4 h-[80vh] sm:h-[80vh] mx-auto dark:border-white border-2 bg-white overflow-y-scroll dark:bg-black">
                    <form
                        onSubmit={handleSubmit(publishVideo)}
                        className="space-y-5"
                    >
                        <section className="border-b-2 text-lg p-1 flex justify-between items-center">
                            <div className="flex items-center font-semibold">
                                <IoCloseCircleOutline
                                    size={27}
                                    onClick={handleClosePopup}
                                    className="cursor-pointer"
                                />
                                <h3>Upload Videos</h3>
                            </div>
                            <div className="mr-1">
                                <Button
                                    disabled={sizeError}
                                    type="submit"
                                    textColor="text-white"
                                    className={`!pt-0.5 px-1.5 hover:scale-107 transition-transform duration-300 ${sizeError?"!cursor-not-allowed opacity-50":""}`}
                                >
                                    Save
                                </Button>
                            </div>
                        </section>
                        <section className="px-5"> 
                            {sizeError && (
                                <h1 className="text-red-500 text-md font-semibold animate-pulse text-center mb-4">
                                    ⚠️ File size exceeds 100MB limit (Cloudinary free plan)!
                                </h1>
                            )}
                            <div className="dark:border-white border-2 border-dotted pt-2 gap-3 flex flex-col dark:bg-[#222222] items-center justify-center text-center rounded-md bg-gray-400">
                                <div>
                                    <h1 className="text-lg font-bold">Drag and drop video files to upload</h1>
                                    <p className="text-sm">Your videos will be private until you publish them.</p>
                                </div>
                                <label
                                    htmlFor="video-upload"
                                    className="cursor-pointer text-white bg-purple-500 p-2 rounded-md"
                                >
                                    Select File
                                </label>
                                <input
                                    id="video-upload"
                                    type="file"
                                    accept="video/*"
                                    className="hidden dark:text-white"
                                    {...register("videoFile",{
                                        required:"Video file is required",
                                        onChange:(e)=>{
                                            const file=e.target.files[0]
                                            if(file)
                                            {
                                                const fileSize = file.size / (1024 * 1024)
                                                setSizeError(fileSize > 100);
                                                setVideoName(file.name)
                                            }
                                        }
                                    })}
                                />
                                <div className="w-1/2 text-center h-10 bg-transparent dark:text-white truncate">
                                    {videoName}
                                </div>
                                <span className="text-red-500 text-sm">
                                    {errors.videoFile?.message}
                                </span>
                            </div>
                            <div className="space-y-5 mt-2 w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-10 justify-start items-center">
                                <div >
                                    <GetImagePreview
                                        name="thumbnail"
                                        control={control}
                                        label="Thumbnail *"
                                        cameraIcon={true}
                                        className={
                                            "w-full h-56 bg-gray-400 dark:bg-[#222222] border-2 border-dotted dark:border-white rounded-md object-contain"
                                        }
                                        cameraSize={40}
                                    />
                                    <span className="text-red-500 text-sm">{errors.thumbnail?.message}</span>
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold dark:text-white">Title *</label>
                                        <input
                                            type="text"
                                            {...register("title",{required:"Title is required"})}
                                            className="border-2 p-2 rounded-md dark:focus:bg-[#222222]"
                                        />
                                    </div>
                                    <span className="text-red-500 text-sm">
                                        {errors.title?.message}
                                    </span>

                                    <div className="sm:mb-0 mb-3">
                                        <label className="font-bold dark:text-white">Description *</label>
                                        <textarea
                                            rows="5"
                                            {...register("description",{required:"Description is required"})}
                                             className="dark:focus:bg-[#222222] outline-none border-2 dark:border-white dark:text-white rounded-md w-full mt-1 p-1 text-black"
                                        />
                                        <span className="text-red-500 text-sm">{errors.description?.message}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </>
    )
}





export default UploadVideo;