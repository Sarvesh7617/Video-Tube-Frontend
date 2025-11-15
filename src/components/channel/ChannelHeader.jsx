import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "../index.js";
import EditAvatar from "../EditAvatar";
import { toggleSubscription } from "../../store/Slices/subscriptionSlice";




const ChannelHeader=({
    username,
    fullName,
    coverImage,
    avatar,
    subscribersCount,
    subscribedCount,
    isSubscribe,
    edit,
    channelId
})=>{


    const [localIsSubscribed,setlocalIsSubscribed]=useState(isSubscribe);
    const [localSubscriberCount,setlocalSubscriberCount]=useState(subscribersCount);
    const userProfile=useSelector((state)=>state.user?.profileData?._id)
    const user=useSelector((state)=>state.auth?.loginUserData?._id)
    const dispatch=useDispatch();


    useEffect(()=>{
        setlocalSubscriberCount(subscribersCount)
        setlocalIsSubscribed(isSubscribe)
    },[subscribersCount,isSubscribe])


    const handleSubscribe=()=>{
        dispatch(toggleSubscription(channelId))
        setlocalIsSubscribed((prev)=>!prev)
        if(localIsSubscribed)
            setlocalSubscriberCount((prev)=>prev-1)
        else
            setlocalSubscriberCount((prev)=>prev+1)
    }

    return(
        <div className="w-full dark:text-white">
            <section className="w-full">
                {coverImage ? (
                    <div className="relative">
                        <img
                            src={coverImage}
                            alt={edit ? "":"Cover image" }
                            className="sm:h-40 h-28 w-full object-cover"
                        />

                        {edit && (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <EditAvatar
                                    coverImg={true}
                                    preImage={coverImage}
                                />
                            </div>
                        )}
                    </div>
                ):(
                    <div className="sm:h-40 h-28 w-full border-slate-600 border-b dark:bg-black"></div>
                )}
            </section>
            <section className="w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4 dark:bg-black bg-blue-300">
                <div className={`${edit ?"h-12":""}`}>
                <div className="relative sm:h-32 h-28 w-28 sm:w-32 ">
                    <img
                        src={avatar}
                        alt={edit?"":"Avatar Image"}
                        className="rounded-full h-28 object-cover outline-none"
                    />
                    {edit && (
                        <div className="absolute inset-0 flex justify-center items-start">
                            <EditAvatar
                                preImage={avatar}
                            />
                        </div>
                    )}
                </div>
                </div>

                <div className="w-full md:h-24 flex flex-wrap justify-between items-start px-1">
                    <div className="sm:mt-0 mt-2">
                        <h1 className="text-xl font-bold !text-black dark:!text-white">{fullName}</h1>
                        <h3 className="text-sm text-slate-400 dark:!text-white !text-black">@{username}</h3>
                        <div className="flex flex-wrap gap-1">
                            <p className="text-xs text-slate-400 dark:!text-white !text-black">
                                {localSubscriberCount} {" "}Subscribers
                            </p>
                            <p className="text-xs text-slate-400 !text-black dark:!text-white">
                                {subscribedCount} {" "}Subscribed
                            </p>
                        </div>
                    </div>
                    {user==userProfile && !edit && (
                        <Link to={"/edit"}>
                            <Button className="hover:scale-105 transition-transform duration-300 sm:mt-0 mt-4 mb-4">Edit</Button>
                        </Link>
                    )}
                    {user!=userProfile && !edit && (
                        <Button 
                            onClick={handleSubscribe}
                            className="hover:scale-105 transition-transform duration-300"
                        >
                            {localIsSubscribed? "Unsubscribe":"Subcribe"}
                        </Button>
                    )}
                    {edit &&(
                        <Link to={`/channel/${username}`}>
                            <Button className="hover:scale-105 transition-transform duration-300 sm:mt-0 mt-2">View Channel</Button>
                        </Link>
                    )}
                    
                </div>
            </section>
        </div>
    )
}




export default ChannelHeader;