import React from "react";
import {FaRegEyeSlash, FaRegHeart, MdOutlineSlowMotionVideo, RxAvatar} from "../index.js";




const StatsSection=({dashboard})=>{
    return(
        <section className="grid sm:grid-cols-4 grid-cols-2 gap-4 mt-4">
            <div className="xs:text-xs border-2 dark:border-slate-400 p-3 flex flex-col gap-1.5 dark:text-white xs:mx-auto text-black">
                <MdOutlineSlowMotionVideo
                    size={35}
                    className="text-purple-600"
                />
                <p className="font-bold">Total Videos</p>
                <span className="font-bold">{dashboard?.totalVideos}</span>
            </div>
            <div className="border-2 dark:border-slate-400 p-3 flex flex-col gap-1.5 dark:text-white text-black">
                <FaRegEyeSlash
                    size={35}
                    className="text-purple-600"
                />
                <p className="font-bold">Total Views</p>
                <span className="font-bold">{dashboard?.totalView}</span>
            </div>
            <div className="border-2 dark:border-slate-400 p-3 flex flex-col gap-1.5 dark:text-white text-black">
                <RxAvatar
                    size={35}
                    className="text-purple-600"
                />
                <p className="font-bold">Total Subscribers</p>
                <span className="font-bold">{dashboard?.totalSubscribers}</span>
            </div>
            <div className="border-2 dark:border-slate-400 p-3 flex flex-col gap-1.5 dark:text-white text-black">
                <FaRegHeart
                    size={35}
                    className="text-purple-600"
                />
                <p className="font-bold">Total Likes</p>
                <span className="font-bold">{dashboard?.totalLikes}</span>
            </div>
        </section>
    )
}




export default StatsSection;