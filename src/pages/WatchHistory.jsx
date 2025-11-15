import React, { useEffect } from "react";
import {Container,NoVideoFound,VideoList} from "../components";
import {useSelector,useDispatch} from "react-redux";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { getWatchHistory } from "../store/Slices/userSlice";





const WatchHistory=()=>{
    const loading=useSelector((state)=>state.user?.loadingApi);
    const watchHistory=useSelector((state)=>state.user?.watchhistory);

    
    const dispatch=useDispatch();

    window.scrollTo(0,0);

    useEffect(()=>{
        dispatch(getWatchHistory())
    },[]);



    if(loading)
        return <HomeSkeleton/>


    if(watchHistory.length==0)
        return <NoVideoFound/>


    if(watchHistory.length>0)
    {
        return(
            <>
                <Container>
                    <div className="grid max-h-screen mb-20 sm:m-0 overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 dark:text-white">
                        {watchHistory.map((video)=>(
                            <VideoList
                                channelName={video.owner.username}
                                duration={video.duration}
                                avatar={video.avatar?.url}
                                createdAt={video.createdAt}
                                videoId={video._id}
                                title={video.title}
                                views={video.views}
                                thumbnail={video.thumbnail?.url}
                            />
                        ))}
                    </div>
                </Container>
            </>
        )
    }
}




export default WatchHistory;