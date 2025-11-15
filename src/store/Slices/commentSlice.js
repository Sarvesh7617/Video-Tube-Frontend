import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify";
import { BASE_URL } from "../../config/config";



const initialState={
    loadingAPi:false,
    comment:[],
    totalComments:null,
    hasNextPage:false
}




const getVideoComment=createAsyncThunk("getVideoComment",async({videoId,page,limit})=>{
    const url=new URL(`${BASE_URL}/comment/${videoId}`)
    if(page)
        url.searchParams.set("page",page)
    if(limit)
        url.searchParams.set("limit",limit)
    try{
        const response=await axiosInstance.get(url)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const createVideoComment=createAsyncThunk("createVideoComment",async({videoId,content})=>{
    try{
        console.log({videoId,content})
        const response=await axiosInstance.post(`/comment/${videoId}`,{content})
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})






const updateComment=createAsyncThunk("updateComment",async({commentId,content})=>{
    try{
        const response=await axiosInstance.patch(`/comment/${commentId}`,content)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})






const deleteComment=createAsyncThunk("deleteComment",async(commentId)=>{
    try{
        const response=await axiosInstance.delete(`/comment/${commentId}`)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const commentSlice=createSlice({
    name:"comment",
    initialState,
    reducers:{
        cleanUpComment:(state)=>{
            state.comment=[]
        }
    },
    extraReducers:(builder)=>{

        //for get video comment

        builder.addCase(getVideoComment.pending,(state)=>{
            state.loadingAPi=true
        })

        builder.addCase(getVideoComment.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.comment=[...state.comment,...action.payload.docs]
            state.totalComments=action.payload.totalDocs
            state.hasNextPage=action.payload.hasNextPage
        })


         builder.addCase(getVideoComment.rejected,(state)=>{
            state.loadingAPi=false
        })


        
        //for create comment


        builder.addCase(createVideoComment.fulfilled,(state,action)=>{
            state.comment.unshift(action.payload)
            state.totalComments++
        })




        //for update comment

        builder.addCase(updateComment.fulfilled,(state,action)=>{
            const index=state.comment.findIndex((index)=>index._id===action.payload._id)
            if(index!==-1)
              state.comment[index]=action.payload
        })



        //for delete comment

        builder.addCase(deleteComment.fulfilled,(state,action)=>{
            state.comment=state.comment.filter((comment)=>comment._id!=action.payload._id)
            state.totalComments--;
        })
    }
})




export {getVideoComment,createVideoComment,deleteComment,updateComment}

export const{cleanUpComment}=commentSlice.actions


export default commentSlice.reducer;