import React, { useEffect } from "react";
import {ChannelHeader,ChannelNavigate} from "../../components/index.js";
import {useDispatch,useSelector} from "react-redux";
import {getUserChannelProfile } from "../../store/Slices/userSlice"
import {Outlet,useParams} from "react-router-dom"




const Channel=()=>{
    const dispatch=useDispatch();
    const {username}=useParams();

    const channelProfile=useSelector((state)=>state.user?.profileData)
    useEffect(()=>{
        dispatch(getUserChannelProfile(username))
    },[username])

    window.scrollTo(0,0);
    return (
        <>
            {channelProfile &&(
                <ChannelHeader
                    username={username}
                    coverImage={channelProfile?.coverImage}
                    avatar={channelProfile?.avatar}
                    subscribedCount={channelProfile?.channelSubscribedToCount}
                    fullName={channelProfile?.fullname}
                    subscribersCount={channelProfile?.subscribersCount}
                    isSubscribed={channelProfile?.isSubscribed}
                    channelId={channelProfile?._id}
                />
            )}
            <ChannelNavigate username={username}/>
            <div className="overflow-y-scroll h-[32rem]">
                <Outlet/>
            </div>
        </>
    )
}




export default Channel;