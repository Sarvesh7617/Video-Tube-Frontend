import React from "react";
import {ChannelHeader,ChannelNavigate,Spinner} from "../components"
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";



const EditChannel=()=>{
    // builder.addCase(getCurrentUser.fulfilled,(state,action)=>{
    //             state.loadingAPi=false
    //             state.status=true
    //             state.loginUserData=action.payload

    //ye ek channel hi hai isliye channel naam hai
    const channel=useSelector((state)=>state.auth?.loginUserData);
    const loading=useSelector((state)=>state.auth?.loadingApi);

    window.scrollTo(0,0);



    return(
        <>
            {loading &&(
                <div className="w-full fixed top-20 flex justify-center z-20">
                    <div className="w-52 border-2 dark:border-slate-600 dark:bg-black bg-black/50 flex gap-2 p-3">
                        <Spinner/>
                        <span className="text-md font-bold dark:text-white">wait dude...</span>
                    </div>
                </div>
            )}


            {channel &&(
                <ChannelHeader
                    username={channel?.username}
                    fullName={channel?.fullName}
                    coverImage={channel?.coverImage.url}
                    avatar={channel?.avatar.url}
                    subscriberCount={channel?.subscribersCount}
                    subscribedCount={channel?.channelSubscribedToCount}
                    isSubscribe={channel?.isSubscribe}
                    edit
                    channelId
                />
            )}



            <ChannelNavigate
                edit={true}
            />
            <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet/>
            </div>
        </>
    )
}




export default EditChannel;