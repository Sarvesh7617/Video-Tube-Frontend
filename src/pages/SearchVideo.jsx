import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { getAllVideos,makeVideosNull } from "../store/Slices/videoSlice";
import {NoVideoFound,VideoList} from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "../components/index";
import {useParams,useSearchParams} from "react-router-dom";




const SearchVideo=()=>{
    const loading=useSelector((state)=>state.video?.loadingApi)
    const videos=useSelector((state)=>state.video?.videos)
    const dispatch=useDispatch();
    const {query}=useParams();
    const [filterOpen,setFilterOpen]=useState(false);
    const [searchParams,setSearchParams]=useSearchParams();

    useEffect(()=>{
        const sortBy=searchParams.get("sortType");
        const sortType=searchParams.get("sortType");

        dispatch(getAllVideos({
            query,
            sortBy,
            sortType
        }))
        setFilterOpen(false);

        return ()=>dispatch(makeVideosNull);
    },[query,searchParams])


    const handleSortParams=(newSortBy,newSortType="asc")=>{
        setSearchParams({sortBy:newSortBy,sortType:newSortType})
    }

    if(videos?.totalDocs===0)
        return <NoVideoFound text={"Try searching something else"}/>

    if(loading)
        return <HomeSkeleton/>

    return(
        <>
            <div
                onClick={()=>setFilterOpen((prev)=>!prev)}
                className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-8"
            >
                <span className="dark:text-white hover:text-purple-500">Filter</span>
                <FaFilter
                    size={25}
                />
            </div>
            <div className="w-full dark:text-white">
                {filterOpen &&(
                    <div className="w-full absolute dark:bg-transparent bg-gray-300">
                        <div className="max-w-sm border-2 dark:border-slate-800 rounded-md dark:bg-[#222222] bg-gray-300 fixed mx-auto z-50 inset-x-0 h-96 p-5">
                            <h1 className="font-semibold text-lg">Search filter</h1>
                            <IoCloseCircleOutline 
                                size={25}
                                onClick={()=>setFilterOpen((prev)=>!prev)}
                                className="absolute right-5 top-5 cursor-pointer"
                            />
                            <table className="mt-4">
                                <tr className="w-full text-start border-b">
                                    <th>SortBy</th>
                                </tr>
                                <tr className="flex flex-col gap-2 dark:text-slate-400 cursor-pointer">
                                    <td
                                        onClick={()=>handleSortParams("createdAt","desc")}
                                    >
                                        Update date
                                        <span className="text-xs">(Latest)</span>
                                    </td>
                                    <td
                                        onClick={()=>handleSortParams("createdAt","asc")}
                                    >
                                        Update date
                                        <span className="text-xs">(Oldest)</span>
                                    </td>
                                    <td
                                        onClick={()=>handleSortParams("views","asc")}
                                    >
                                        View count
                                        <span className="text-xs">(Low to High)</span>
                                    </td>
                                    <td
                                        onClick={()=>handleSortParams("views","desc")}
                                    >
                                        View count
                                        <span  className="text-xs">(High to Low)</span>
                                    </td>
                                    <td
                                        onClick={()=>handleSortParams("duration","desc")}
                                    >
                                        Duration
                                        <span className="text-xs">(High to Low)</span>
                                    </td>
                                    <td
                                        onClick={()=>handleSortParams("duration","asc")}
                                    >
                                        Duration
                                        <span className="text-xs">(Low to High)</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                )}
                <div className="grid h-screen xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white overflow-y-scroll">
                    {videos && videos?.docs?.map((video)=>(
                        <VideoList
                            key={video?._id}
                            thumbnail={video?.thumbnail?.url}
                            duration={video?.duration}
                            title={video?.title}
                            views={video?.views}
                            avatar={video?.ownerDetails?.avatar?.url}
                            channelName={video?.ownerDetails?.username}
                            createdAt={video?.createdAt}
                            videoId={video?._id}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}



export default SearchVideo;