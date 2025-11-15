import React from "react";
import {Button} from "./index";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {createTweet} from "../store/Slices/tweetSlice";
import {createVideoComment} from "../store/Slices/commentSlice";




const TweetAndComment=({tweet,comment,videoId})=>{
    const {register,handleSubmit,setValue}=useForm();
    const dispatch=useDispatch();



    const submit=(data)=>{
        if(data)
        {
            if(tweet)
                dispatch(createTweet(data))
            else if(comment)
                dispatch(createVideoComment({content:data.content,videoId}))
        }
        setValue("content","");
    }



    return(
        <form
            onSubmit={handleSubmit(submit)}
            className="sm:p-5 p-3 w-full sm:max-w-4xl relative"
        >
            <textarea
                placeholder={`${tweet?"Write a tweet":"Write a comment"}`}
                {...register("content",{required:true})}
                rows={2}
                className="w-full p-2 text-sm dark:bg-[#222222] dark:text-white dark:focus:bg-slate-600 border-2 focus:bg-gray-300 dark:border-white border-black pr-16"
            />
            <Button
                type="submit"
                className="absolute sm:right-8 right-5 !px-2 !py-1 !text-md !font-semibold sm:bottom-9 bottom-8 hover:scale-105 transition-transform duration-300 !bg-purple-500 rounded-none"
            >
                Send
            </Button>
        </form>
    )
}





export default TweetAndComment;