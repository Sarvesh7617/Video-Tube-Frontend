import React from "react";
import { timeAgo,formatDuration } from "../helpers/timeAgo";
import {useNavigate} from "react-router-dom";




const VideoList=({
    channelName,
    duration,
    avatar,
    createdAt,
    videoId,
    title,
    views=0,
    thumbnail
})=>{
    const navigate=useNavigate();


    const handleAvatarClick=(e)=>{
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    }



    return(
        <>
            <div
                className="w-full sm:p-2 cursor-pointer"
                onClick={()=>navigate(`/watch/${videoId}`)}
            >
                <div className="relative sm:h-60 h-48">
                    <img
                        src={thumbnail}
                        className="object-cover w-full h-full"
                    />
                    <span className="absolute bottom-2 right-2 rounded-md text-sm dark:bg-black dark:text-white py-1 px-2">
                        {formatDuration(duration)}
                    </span>
                </div>
                <div className="flex items-center py-2 px-2 gap-2">
                    {avatar &&(
                        <div onClick={handleAvatarClick}>
                            <img
                                src={avatar}
                                className="w-10 h-10 rounded-full object-cover border-2 dark:border-slate-700"
                            />
                        </div>
                    )}
                    <div>
                        <h2 className="font-medium dark:text-white">{title}</h2>
                        <div>
                            <span className="text-xs space-x-1 dark:text-slate-400">{views} views</span>
                            <span>{timeAgo(createdAt)}</span>
                        </div>
                        {channelName && (
                            <h2 className="text-xs space-x-1 dark:text-slate-200">{channelName}</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}





export default VideoList;