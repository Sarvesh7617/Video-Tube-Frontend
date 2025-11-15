import React from "react";
import TogglePublish from "../TogglePublish";
import { ImBin,GrEdit } from "../index.js";




const VideoTable=({videos,setPopUp,setVideoDetail})=>{
    return(
        <>
            <section className="mt-6 mx-auto w-full overflow-x-scroll scrollbar-hidden">
                <table className="min-w-full border-2 border-slate-500 dark:text-white text-black">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-r-2 border-slate-500">Toggle Publish</th>
                            <th className="py-2 px-4 border-r-2 border-slate-500">Status</th>
                            <th className="py-2 px-4 border-r-2 border-slate-500">Uploaded</th>
                            <th className="py-2 px-4 border-r-2 border-slate-500">Rating</th>
                            <th className="py-2 px-4">Date Uploaded</th>
                            {/* <th className="py-2 px-4 border-b border-slate-500"></th> */}
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {videos.map((video)=>(
                        <tr key={video?._id}>
                            <td className="py-2 px-4 border-t-2 border-slate-500">
                                <TogglePublish
                                    videoId={video?._id}
                                    isPublish={video?.isPublished}
                                />
                            </td>
                            <td className="py-2 px-4 border-t-2 border-slate-500">
                                {video?.isPublished?(
                                    <span className="text-green-500 py-1 px-2 border border-green-500 rounded-full">Published</span>
                                ):(
                                    <span className="text-orange-500 py-1 px-2 border border-orange-500 rounded-full">Unpublished</span>
                                )}
                            </td>
                            <td className="py-2 px-4 border-t-2 border-slate-500">
                                    {video?.title}
                            </td>
                            <td className="border-t-2 border-slate-500">
                                <span className="border rounded-lg outline-none px-2 bg-green-200 text-green-600">
                                    {video?.likesCount} likes
                                </span>
                            </td>
                            <td className="py-2 px-4 border-t-2 border-slate-500">
                                {video?.createdAt?.day}/
                                {video?.createdAt?.month}/
                                {video?.createdAt?.year}
                            </td>
                            <td className="py-2 border-t-2 border-slate-500">
                                <span className="flex gap-3 justify-start">
                                    <ImBin
                                        size={25}
                                        className="cursor-pointer hover:text-purple-500"
                                        onClick={()=>{
                                            setPopUp((prev)=>({
                                                ...prev,
                                                deleteVideo:!prev.deleteVideo
                                            }))
                                            setVideoDetail(video);
                                        }}
                                    />
                                    <GrEdit
                                        size={25}
                                        className="cursor-pointer hover:text-purple-500"
                                        onClick={()=>{
                                            setPopUp((prev)=>({
                                                ...prev,
                                                editVideo:!prev.editVideo
                                            }))
                                            setVideoDetail(video)
                                        }}
                                    />
                                </span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}




export default VideoTable;