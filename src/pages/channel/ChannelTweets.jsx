import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getUserTweets} from "../../store/Slices/tweetSlice";
import {TweetandComment,TweetList} from "../../components/index.js";



const ChannelTweets=()=>{
    const dispatch=useDispatch();
    const userId=useSelector((state)=>state.user?.profileData?._id)
    const authId=useSelector((state)=>state.auth?.loginUserData._id)
    const tweets=useSelector((state)=>state.tweet?.tweet)

    useEffect(()=>{
        if(userId)
          dispatch(getUserTweets(userId))
    },[userId])

    return(
        <>
            {authId===userId && <TweetandComment tweet={true}/>}
            {tweets?.map((tweet)=>(
                <TweetList
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))}
        </>
    )
}




export default ChannelTweets;