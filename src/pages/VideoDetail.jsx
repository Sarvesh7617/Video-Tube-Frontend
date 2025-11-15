import React, { useCallback, useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import {getVideoById} from "../store/Slices/videoSlice";
import { cleanUpComment,getVideoComment } from "../store/Slices/commentSlice";
import {
    Commentslist,
    Description,
    Video,
    Spinner,
    InfiniteScroll,
    TweetandComment,
    Navbar
} from "../components";
import {useParams} from "react-router-dom";



const VideoDetail=()=>{
    const dispatch=useDispatch();
    const {videoId}=useParams();
    const video=useSelector((state)=>state.video?.video);
    const comments=useSelector((state)=>state.comment?.comment);
    const totalComments=useSelector((state)=>state.comment?.totalComments);
    const hasNextPage=useSelector((state)=>state.comment?.hasNextPage);
    const loading=useSelector((state)=>state.comment?.loaloadingAPi);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        dispatch(getVideoById(videoId))
        dispatch(getVideoComment({videoId}))

        return ()=>dispatch(cleanUpComment());
    },[videoId]);


    const fetchMoreComment=useCallback(()=>{
        if(!loading && hasNextPage)
        {
            dispatch(getVideoComment({videoId,page:page+1}))
            setPage((prev)=>prev+1)
        }
    },[page,videoId,hasNextPage,loading])


    return(
        <>
            <Navbar/>
            <Video
                src={video?.videoFile?.url}
                poster={video?.thumbnail?.url}
            />
            <Description
                key={video?._id}
                title={video?.title}
                avatar={video?.owner?.avatar.url}
                channelName={video?.owner?.username}
                createdAt={video?.createdAt}
                descripion={video?.descripion}
                subscriberCount={video?.owner?.subscriberCount}
                likesCount={video?.likesCount}
                isSubscribed={video?.owner?.isSubscribed}
                isLiked={video?.isLiked}
                videoId={video?._id}
                channelId={video?.owner?._id}
                views={video?.views}
            />
            <div className="dark:text-white font-semibold sm:px-5 px-3">
                {totalComments} Comments
            </div>
            <TweetandComment
                comment={true}
                videoId={video?._id}
            />
            <InfiniteScroll
                fetchMore={fetchMoreComment}
                hasNextPage={hasNextPage}
            >
                <div className="w-full sm:max-w-4xl">
                    {comments?.map((comment)=>(
                       <Commentslist
                            key={comment?._id}
                            avatar={comment?.owner?.avatar?.url}
                            username={comment?.owner?.username}
                            createdAt={comment?.createdAt}
                            content={comment?.content}
                            commentId={comment?._id}
                            isLiked={comment?.isLiked}
                            likesCount={comment?.likesCount}
                       /> 
                    ))}
                    {loading && (
                        <div className="w-full flex justify-center items-center">
                            <Spinner width={25}/>
                        </div>
                    )}
                </div>
            </InfiniteScroll>
        </>
    )
}



export default VideoDetail;