import React, { useState } from "react";
import {timeAgo} from "../helpers/timeAgo";
import {Like,Button} from "./index";
import {Link} from "react-router-dom";
import {toggleSubscription} from "../store/Slices/subscriptionSlice";





const Description=({
    title,
    avatar,
    channelName,
    createdAt,
    descripion,
    subscriberCount,
    likesCount,
    isSubscribed,
    isLiked,
    videoId,
    channelId,
    views
})=>{
    const [localIsSubscribed,setLocalIsSubscribed]=useState(isSubscribed);
    const [localSubscriberCount,setLocalSubscriberCount]=useState(subscriberCount);
    const dispatch=useDispatch();


    const handleSubscribe=()=>{
        dispatch(toggleSubscription(channelId))
        setLocalIsSubscribed((prev)=>!prev)

        if(localIsSubscribed)
            setLocalSubscriberCount((prev)=>prev-1)
        
        else
            setLocalSubscriberCount((prev)=>prev+1)
    }



    return(
        <section className="sm:max-w-4xl w-full dark:text-white sm:p-5 p-2 space-y-2">
            <div className="border-b-2 dark:border-slate-700">
                <div className="space-y-2 mb-2">
                    <h1 className="sm:text-2xl font-semibold">{title}</h1>
                    <div className="flex items-center justify-between sm:justify-start sm:gap-5">
                        <div>
                            <span className="text-sm dark:text-slate-400 text-slate-500">{views} views</span>
                            <span className="text-sm dark:text-slate-400 text-slate-500">{timeAgo(createdAt)}</span>
                        </div>
                        <div className="rounded-full w-24 flex justify-center bg-[#222222] dark:bg-gray-400 py-1">
                            <Like
                                isLiked={isLiked}
                                videoId={videoId}
                                likesCount={likesCount}
                                size={25}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Link
                            to={`/channel/${channelName}/videos`}
                             className="flex gap-2"
                        >
                            <img
                                src={avatar}
                                 className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h1 className="font-semibold">{channelName}</h1>
                                <p className="text-sm dark:text-slate-400 text-slate-500">{localSubscriberCount} Subscribers</p>
                            </div>
                        </Link>
                        <div>
                            <Button
                                onClick={handleSubscribe}
                                className="hover:scale-110 transition-all font-bold px-4 py-1 !bg-purple-500"
                            >
                                {localIsSubscribed?"Unsubscribe":"Subscribe"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xs dark:bg-[#222222] bg-gray-300 rounded-lg p-2 outline-none">{descripion}</p>
        </section>
    )
}



export default Description;