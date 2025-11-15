import React from "react";
import {NavLink} from "react-router-dom";




const ChannelNavigate=({username,edit})=>{
    return (
        <>
            {edit ?(
                <section className="w-full bg-gray-500 light:bg-gray-300 flex dark:text-white justify-evenly items-center border-b-2 border-slate-600 text-xs sm:text-base sm:mt-4 md:mt-0">
                    <NavLink 
                        to={"/edit/personalInfo"} 
                        className={({isActive})=>isActive?"bg-white text-purple-600 border-b-2 border-purple-600":""}
                    >
                        <p className="p-2 font-semibold">Personal Information</p>
                    </NavLink>
                    <NavLink 
                        to={"/edit/change-password"} 
                        className={({isActive})=>isActive?"bg-white text-purple-600 border-b-2 border-purple-600":""}
                    >
                        <p className="p-2 font-semibold">Change Password</p>
                    </NavLink>
                </section>
            ):(
                <section className="w-full bg-gray-300 dark:bg-gray-500 flex dark:text-white justify-evenly items-center border-b-2 border-slate-600 text-xs sm:text-base sm:mt-4 md:mt-0 overflow-auto">
                    <NavLink 
                        to={`/channel/${username}/videos`}
                        className={({isActive})=>isActive?"bg-white text-purple-600 border-b-2 border-purple-600":""}
                    >
                        <p className="p-2 font-semibold">Videos</p>
                    </NavLink>
                    <NavLink 
                        to={`/channel/${username}/playlists`}
                        className={({isActive})=>isActive?"bg-white text-purple-600 border-b-2 border-purple-600":""}
                    >
                        <p className="p-2 font-semibold">Playlists</p>
                    </NavLink>
                    <NavLink 
                        to={`/channel/${username}/tweets`}
                        className={({isActive})=>isActive?"bg-white text-purple-600 border-b-2 border-purple-600":""}
                    >
                        <p className="p-2 font-semibold">Tweets</p>
                    </NavLink>
                    <NavLink 
                        to={`/channel/${username}/subscribed`}
                        className={({isActive})=>isActive?"bg-white text-purple-600 border-b-2 border-purple-600":""}
                    >
                        <p className="p-2 font-semibold">Subscribed</p>
                    </NavLink>
                </section>
            )}
        </>
    )
}




export default ChannelNavigate;