import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { getLikedVideo } from "../store/Slices/likesSlice";
import {makeVideosNull} from "../store/Slices/videoSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { Container,NoVideoFound,VideoList } from "../components";



const LikedVideos=()=>{

    const dispatch=useDispatch();
    const likedVideo=useSelector((state)=>state.like?.likedVideo)
    const loading=useSelector((state)=>state.like.loadingAPi)

    window.scrollTo(0,0);
    useEffect(()=>{
        dispatch(getLikedVideo())

        return ()=>dispatch(makeVideosNull());
    },[])

    if(loading)
        return <HomeSkeleton/>

    if(likedVideo?.length==0)
        return <NoVideoFound/>
    return (
        <Container>
            <div className="grid max-h-screen overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
                {likedVideo.map((video)=>(
                    <VideoList
                        key={video.likedVideo._id}
                        channelName={video.likedVideo.ownerDetails?.username}
                        duration={video.likedVideo.duration}
                        avatar={video.likedVideo.ownerDetails?.avatar?.url}
                        createdAt={video.likedVideo.createdAt}
                        videoId={video.likedVideo._id}
                        title={video.likedVideo.title}
                        views={video.likedVideo.views}
                        thumbnail={video.likedVideo.thumbnail?.url}
                    />
                ))}
            </div>
        </Container>
    )
}



export default LikedVideos;