import React, { useState } from "react";
import Edit from "./Edit";
import DeleteConfirm from "./DeleteConfirm";
import {deleteTweet,editTweet} from "../store/Slices/tweetSlice";
import {useDispatch, useSelector} from "react-redux";
import {timeAgo} from "../helpers/timeAgo";
import {HiOutlineDotsVertical,Like} from "./index";




const TweetList=({
    avatar,
    username,
    createdAt,
    content,
    tweetId,
    isLiked,
    likesCount
})=>{
    const currAvatar=useSelector((state)=>state.user?.profileData?.avatar.url)
    const authUsername=useSelector((state)=>state.auth?.loginUserData?.username);
    const dispatch=useDispatch();


    const [editState,setEditState]=useState({
        editing:false,
        editedContent:content,
        isOpen:false,
        delete:false
    })


    const handleEditTweet=(editedContent)=>{
        console.log(editedContent)
        dispatch(editTweet({tweetId,content:editedContent}));
        setEditState((prevState)=>({
            ...prevState,
            editing:false,
            editedContent,
            isOpen:false,
            delete:false
        })
        )
    }



    const handleDeleteTweet=()=>{
        dispatch(deleteTweet(tweetId))
        setEditState((prevState)=>({
            ...prevState,
            delete:false
        })
        )
    }


    return(
        <>
            <div className="dark:text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b-2 dark:border-slate-600 p-3 sm:p-5">
                <div className="w-10">
                    <img
                        src={avatar || currAvatar}
                        alt="profile pic"
                         className="w-8 h-8 object-cover rounded-full"
                    />
                </div>
                <div className="w-full flex flex-col gap-1 relative">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xs">{username}</h2>
                        <span className="text-xs dark:text-slate-400">{timeAgo(createdAt)}</span>
                    </div>

                    {editState.editing?(
                        <Edit
                            initialContent={editState.editedContent}
                            onCancel={()=>setEditState((prevState)=>({
                                ...prevState,
                                editing:false,
                                isOpen:false
                            }))
                        }
                        onSave={handleEditTweet}
                        />
                    ):(
                        editState.editedContent
                    )}

                    <Like
                        isLiked={isLiked}
                        likesCount={likesCount}
                        tweetId={tweetId}
                        size={25}
                    />

                    {authUsername==username &&(
                        <div className="w-5 h-5 absolute right-0 cursor-pointer">
                            <HiOutlineDotsVertical
                                onClick={()=>setEditState((prevState)=>({
                                    ...prevState,
                                    isOpen:!prevState.isOpen
                                }))
                            }
                            />
                        </div>
                    )}
                    {editState.isOpen &&(
                        <div className="border-2 dark:bg-[#222222] bg-gray-300 text-lg dark:border-slate-600 absolute text-center right-5 rounded-xl">
                            <ul>
                                <li
                                    className="hover:opacity-90 px-5 cursor-pointer border-b-2 opacity-50 dark:border-slate-600"
                                    onClick={()=>setEditState((prevState)=>({
                                        ...prevState,
                                        editing:!prevState.editing,
                                        isOpen:false
                                    }))
                                }
                                >
                                    Edit
                                </li>
                                <li
                                    className="px-5 hover:opacity-90 cursor-pointer bg-red-500 opacity-50 rounded-b-lg"
                                    onClick={()=>setEditState((prevState)=>({
                                        ...prevState,
                                        delete:true,
                                        isOpen:false
                                    }))
                                }
                                >
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}

                    {editState.delete &&(
                        <DeleteConfirm
                            onCancel={()=>setEditState((prevState)=>({
                                ...prevState,
                                delete:false,
                                isOpen:false
                            }))
                        }
                        onDelete={handleDeleteTweet}
                        comment={true}
                        />
                    )}
                </div>
            </div>
        </>
    )
}



export default TweetList;