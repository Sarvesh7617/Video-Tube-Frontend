import React, { useEffect, useState } from "react";
import {BiSolidLike,BiSolidDislike} from "./index.js";
import {toggleVideoLike,toggleCommentLike,toggleTweetLike} from "../store/Slices/likesSlice";
import { useDispatch } from "react-redux";



const Likes=({isLiked,likesCount=0,tweetId,commentId,videoId})=>{
    const [localIsLiked,setlocalIsLiked]=useState(isLiked);
    const [localLikesCount,setLocalLikesCount]=useState(likesCount);

    const dispatch=useDispatch();


    const handleLikeToggle=()=>{
        if(localIsLiked)
          setLocalLikesCount((prev)=>prev-1)
        else
          setLocalLikesCount((prev)=>prev+1)
        setlocalIsLiked((prev)=>!prev)

        if(tweetId)
          dispatch(toggleTweetLike(tweetId))
        if(videoId)
          dispatch(toggleVideoLike(videoId))
        if(commentId)
          dispatch(toggleCommentLike(commentId))

    }


    useEffect(()=>{
        setLocalLikesCount(likesCount);
        setLocalLikesCount(isLiked);
    },[isLiked,likesCount])



    return(
        <>
          <div className="flex items-center gap-1">
            <BiSolidLike
                size={25}
                onClick={handleLikeToggle}
                className={`cursor-pointer ${localIsLiked?"text-purple-500":""}`}
            />
            <span className="text-xs mr-3">{localLikesCount}</span>
            <BiSolidDislike size={25}/>
          </div>
        </>
    )
}




export default Likes;