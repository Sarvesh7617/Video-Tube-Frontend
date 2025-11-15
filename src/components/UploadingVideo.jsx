import React from "react";
import {IoCloseCircleOutline,TiTick,Button,PiFilmReelFill,Spinner} from "./index";
import { useDispatch} from "react-redux";
import {cancelUpload} from "../store/Slices/videoSlice";


const UploadingVideo=({
    videoFileName,
    uploaded,
    uploadProgress,
    fileSize,
    videoPath,
    thumbnailPath,
    closePopup
})=>{

    const dispatch=useDispatch();
    const handleCancelandFinish=()=>{
        dispatch(cancelUpload(
            { 
                videoFilePath: videoPath,
                thumbnailPath: thumbnailPath
            }
        ));
        closePopup();
    }



    return(
        <>
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center text-white bg-black/70">
                <div className="w-96 h-fit p-3 bg-black border-2 border-slate-400 outline-none space-y-5 rounded-md">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            {uploaded ?(
                                <h1>Uploaded Video</h1>
                            ):(
                                <h1>Uploading Video....</h1>
                            )}
                            <span className="text-slate-400 text-xs">
                                Track your video uploading process.
                            </span>
                        </div>
                        <IoCloseCircleOutline
                            size={25}
                            onClick={handleCancelandFinish}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="border-2 flex justify-start items-center p-1 w-full h-fit">
                        <div className="mr-2">
                            <PiFilmReelFill
                                size={25}
                                className="text-purple-500"
                            />
                        </div>
                        <div >
                            <h1 className="text-sm font-semibold break-all">{videoFileName}</h1>
                            <p className="text-xs">{fileSize} MB</p>
                            <div className="flex gap-2 items-center mt-2">
                                {uploaded?(
                                    <span className="flex items-center mt-2 gap-2">
                                        <TiTick
                                            size={25}
                                            className="text-green-500"
                                        />
                                        Uploaded Successfully
                                    </span>
                                ):(
                                    <>
                                        <Spinner />
                                        <span className="text-xs">Uploading....</span>
                                        <div className="mt-2 w-full">
                                            <div className="w-full bg-gray-700 h-2 rounded">
                                            <div
                                                className="bg-purple-500 h-2 rounded"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                            </div>

                                            <p className="text-xs text-slate-400 mt-1">{uploadProgress}% uploaded</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <Button
                            disabled={uploaded}
                            onClick={handleCancelandFinish}
                            className={`!w-full !bg-red-400 hover:scale-107 transition-transform duration-300 ${uploaded?"!cursor-not-allowed opacity-50":""}`}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={!uploaded}
                            onClick={handleCancelandFinish}
                            className={`!w-full hover:scale-107 transition-transform duration-300 ${!uploaded ? "!cursor-not-allowed opacity-50" : ""}`}
                        >
                            Finish
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}




export default UploadingVideo;