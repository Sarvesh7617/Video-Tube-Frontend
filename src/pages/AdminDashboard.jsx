import React, { useEffect, useState } from "react";
import {Container,
    DeleteConfirm,
    Navbar,
    Spinner,
    StatsSection,
    VideoTable,
    EditVideo,
    UploadVideo,
    Header}
 from "../components/index.js"

import {useSelector,useDispatch} from "react-redux";
import {deleteAVideo} from "../store/Slices/videoSlice";
import {getChannelStats,getChannelVideo} from "../store/Slices/dashboardSlice"




const AdminDashboard=()=>{
    const username=useSelector((state)=>state.auth.loginUserData?.username)
    const uploaded=useSelector((state)=>state.video.uploaded)
    const publishToggled=useSelector((state)=>state.video.publishToggled)
    const channelvideo=useSelector((state)=>state.dashboard.channelVideo)
    const channelState=useSelector((state)=>state.dashboard.channelState)
    const deleting=useSelector((state)=>state.video.loadingApi)



    const dispatch=useDispatch();
    const [videoDetail,setVideoDetail]=useState(null);
    const [popUp,setPopUp]=useState({
        uploadVideo:false,
        editVideo:false,
        deleteVideo:false
    })



    const handleDeleteVideo=()=>{
        dispatch(deleteAVideo(videoDetail?._id))
        setPopUp((prev)=>({
            ...prev,
            deleteVideo:!prev.deleteVideo
        }))
        window.location.reload();
    }



    useEffect(()=>{
        dispatch(getChannelStats())
    },[])


    useEffect(()=>{
        dispatch(getChannelVideo())
    },[publishToggled,uploaded,deleting])


    window.scrollTo(0,0);




    return(
        <>
            <Navbar/>
            <Container>
            <div className="w-full relative text-white space-y-5 h-screen z-10 dark:bg-black py-4 px-1">
                {popUp.uploadVideo &&(
                    <UploadVideo setUploadVideoPopup={setPopUp}/>
                )}


                {popUp.editVideo &&(
                    <div className="fixed w-full top-24 z-20 flex justify-center">
                        <EditVideo
                            videoId={videoDetail?._id}
                            setEditVideoPopup={setPopUp}
                            description={videoDetail?.description}
                            title={videoDetail?.title}
                        />
                    </div>
                )}


                {popUp.deleteVideo &&(
                    <div className="fixed w-full top-52 z-20 flex justify-center">
                        <DeleteConfirm
                            video={true}
                            onDelete={handleDeleteVideo}
                            onCancel={()=>
                                setPopUp((prev)=>({
                                    ...prev,
                                    deleteVideo:!prev.deleteVideo
                                }))
                            }
                        />
                    </div>
                )}



                {deleting &&(
                    <div className="fixed w-full top-20 z-20 flex justify-center">
                        <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                            <Spinner/>
                            <span className="text-md font-bold">Deleting video...</span>
                        </div>
                    </div>
                )}



                <Header
                    username={username}
                    setPopUp={setPopUp}
                />


                <StatsSection dashboard={channelState}/>


                <VideoTable
                    videos={channelvideo}
                    setPopUp={setPopUp}
                    setVideoDetail={setVideoDetail}
                />
            </div>
            </Container>
        </>
    )
}



export default AdminDashboard;