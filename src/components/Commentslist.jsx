import React, { useState } from "react";
import Edit from "./Edit";
import DeleteConfirm from "./DeleteConfirm";
import {deleteComment,updateComment} from "../store/Slices/commentSlice";
import {useDispatch, useSelector} from "react-redux";
import {timeAgo} from "../helpers/timeAgo";
import {HiOutlineDotsVertical,Like} from "./index";




const CommentList=({
    avatar,
    username,
    createdAt,
    content,
    commentId,
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


    const handleEditComment=(editedContent)=>{
        console.log(editedContent)
        dispatch(updateComment({commentId,content:editedContent}));
        setEditState((prevState)=>({
            ...prevState,
            editing:false,
            editedContent,
            isOpen:false,
            delete:false
        })
        )
    }



    const handleDeleteComment=()=>{
        dispatch(deleteComment(commentId))
        setEditState((prevState)=>({
            ...prevState,
            delete:false
        })
        )
    }


    return(
        <div className="dark:text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b-2 dark:border-slate-600 p-3 sm:p-5">
            <div className="w-12">
                <img
                    src={avatar || currAvatar}
                    alt="profile pic"
                    className="w-10 h-10 object-cover rounded-full"
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
                    onSave={handleEditComment}
                    />
                ):(
                    editState.editedContent
                )}

                <Like
                    isLiked={isLiked}
                    likesCount={likesCount}
                    commentId={commentId}
                    size={25}
                />

                {authUsername==username &&(
                    <div>
                        <div>
                            <HiOutlineDotsVertical
                                onClick={()=>setEditState((prevState)=>({
                                    ...prevState,
                                    isOpen:!prevState.isOpen
                                }))
                            }
                            />
                            {editState.isOpen &&(
                                <div>
                                    <ul>
                                        <li
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
                        </div>    
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
                    onDelete={handleDeleteComment}
                    comment={true}
                    />
                )}
            </div>
        </div>
    )
}



export default CommentList;