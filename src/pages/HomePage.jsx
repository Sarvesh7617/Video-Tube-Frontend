import React, { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllVideos,makeVideosNull} from "../store/Slices/videoSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import InfiniteScroll from "react-infinite-scroll-component"
import Container from "../components/container/Container";
import VideoList from "../components/VideoList";





const HomePage=()=>{
    const [page,setPage]=useState(1);
    const [isloading,setloading]=useState(false);

    const dispatch=useDispatch();
    const videos=useSelector((state)=>state.video?.videos?.docs);
    const loading=useSelector((state)=>state.video?.loadingApi);
    const hasNextPage=useSelector((state)=>state.video?.videos?.hasNextPage);


    useEffect(()=>{
        dispatch(getAllVideos({page:1,limit:10}))


        return ()=>dispatch(makeVideosNull());
    },[]);



    useEffect(()=>{
        if(loading)
            setloading(true)
        else
            setloading(false)
    },[loading])



    const fetchMoreVideo=useCallback(()=>{
        if(hasNextPage)
            dispatch(getAllVideos({page:page+1,limit:10}))
                .then(()=>{
                    setPage((prev)=>prev+1)
                })
                .catch((error)=>{
                    setloading(false);
                })
    },[hasNextPage,page])




    return(
        <Container>
            <InfiniteScroll
                dataLength={videos.length || 0} 
                next={fetchMoreVideo}
                hasMore={hasNextPage}
                loader={isloading &&<HomeSkeleton/>}
                scrollableTarget="scrollDiv"
                endMessage={
                    <p className="h-screen text-center font-bold text-xl dark:text-white flex justify-center items-center">
                        No video to fetch
                    </p>
                }
            >
                <div id="scrollDiv">
                    {videos.map((video)=>(
                        <VideoList
                        channelName={video.ownerDetails?.username}
                        duration={video.duration}
                        avatar={video.ownerDetails?.avatar?.url}
                        createdAt={video.createdAt}
                        videoId={video._id}
                        title={video.title}
                        views={video.views}
                        thumbnail={video.thumbnail?.url}
                    />
                    ))}
                </div>
            </InfiniteScroll>
        </Container>
    )
}




export default HomePage;