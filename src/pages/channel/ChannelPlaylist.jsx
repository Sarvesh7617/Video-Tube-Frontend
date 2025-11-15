import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {createPlaylist,getuserPlaylist} from "../../store/Slices/playlistSlice";
import {timeAgo} from "../../helpers/timeAgo";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { Button,IoCloseCircleOutline } from "../../components/index.js";




const ChannelPlaylist=()=>{
    const dispatch=useDispatch();
    const playlists=useSelector((state)=>state.playlist?.playlists);
    const authId=useSelector((state)=>state.auth.loginUserData?._id);
    const userId=useSelector((state)=>state.user.profileData?._id);

    const {register,handleSubmit,formState:{errors}}=useForm();
    const [openCreatePlaylist,setOpenCreateplaylist]=useState(false);


    useEffect(()=>{
        if(userId)
            dispatch(getuserPlaylist(userId))
    },[userId])

    const createAPlaylist=(data)=>{
        dispatch(createPlaylist(data));
        setOpenCreateplaylist((prev)=>!prev);
    }



    return(
        <div className="w-full relative dark:text-white sm:px-5 px-0 ">
            {playlists.length===0 &&(
                <div  className="h-[5rem] text-center flex justify-center items-center">
                    <h1>No Playlist Found</h1>
                </div>
            )}
            {authId===userId && (
                <div className="w-full flex justify-center mt-5">
                    <Button
                        onClick={()=>setOpenCreateplaylist((prev)=>!prev)}
                    >
                        Create Playlist
                    </Button>
                </div>
            )}
            {openCreatePlaylist &&(
                <div className="fixed top-0 left-0 inset-0 w-full h-full flex justify-center items-center dark:bg-black/80 bg-gray-300/50 z-40">
                    <div className="w-full max-w-sm border-2 dark:border-white border-black dark:bg-black bg-gray-200 relative rounded-md">
                        <form
                            onSubmit={handleSubmit(createAPlaylist)}
                            className="w-full space-y-5 p-4"
                        >
                            <p className="text-2xl font-bold">Create Playlist</p>
                            <IoCloseCircleOutline
                                size={30}
                                onClick={()=>setOpenCreateplaylist((prev)=>!prev)}
                                className="absolute top-3 right-2 cursor-pointer"
                            />
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">Name*</label>
                                <input
                                    placeholder="Enter Playlist Name"
                                    {...register("name",{
                                        required:"name is required"
                                    })}
                                    className="dark:bg-black border-2 dark:border-white border-black dark:focus:bg-gray-700 focus:bg-white p-2 rounded-md"
                                />
                                {errors.name &&(
                                    <span className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </span>
                                )}
                                <label className="font-semibold">Description*</label>
                                <input
                                    placeholder="Enter Description for your Playlist"
                                    {...register("description",{
                                        required:"description is required"
                                    })}
                                    className="dark:bg-black border-2 dark:border-white border-black dark:focus:bg-gray-700 focus:bg-white p-2 rounded-md"
                                />
                                {errors.description &&(
                                    <span className="text-red-500 text-sm">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full hover:scale-105 transition-transform duration-300 font-bold"
                            >
                                Create Playlist
                            </Button>
                        </form>
                    </div>
                </div>
            )}
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-2 w-full mt-5">
                {playlists?.map((playlist)=>(
                    <Link
                        to={`/playlist/${playlist._id}`}
                        key={playlist._id}
                        className="relative h-[15rem] w-full border border-slate-500"
                    >
                        <div className="absolute w-full flex justify-between bottom-0 left-0 py-1 px-2 border-t backdrop-contrast-75">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-lg">Playlist</h1>
                                <div className="text-xs text-slate-300">
                                    {playlist.totalviews} Views &nbsp;
                                    {timeAgo(playlist.updatedAt)}
                                </div>
                            </div>
                            <p>{playlist.totalvideo} Videos</p>
                        </div>
                        <div className="py-1 px-2">
                            <p className="text-sm font-bold">
                                {playlist.name}
                            </p>
                            <p className="text-xs w-full h-4 overflow-hidden">
                                {playlist.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}



export default ChannelPlaylist;