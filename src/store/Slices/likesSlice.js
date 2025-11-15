import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify"




const initialState={
    loadingAPi:false,
    likedVideo:[]
}




const toggleVideoLike=createAsyncThunk("toggleVideoLike",async(videoId)=>{
    try{
        const response=await axiosInstance.post(`likes/toggle/v/${videoId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error
    }
})




const toggleCommentLike=createAsyncThunk("toggleCommentLike",async(commentId)=>{
    try{
        const response=await axiosInstance.post(`likes/toggle/c/${commentId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})




const toggleTweetLike=createAsyncThunk("toggleTweetLike",async(tweetId)=>{
    try{
        const response=await axiosInstance.post(`likes/toggle/t/${tweetId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const getLikedVideo=createAsyncThunk("getLikedVideo",async()=>{
    try{
        const response=await axiosInstance.get(`likes/video`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const likesSlice=createSlice({
    name:"like",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        //for toggle video like

        builder.addCase(toggleVideoLike.pending,(state)=>{
            state.loadingAPi=true
        })

        builder.addCase(toggleVideoLike.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.likedVideo=action.payload
        })

    }
})



export {toggleVideoLike,toggleCommentLike,toggleTweetLike,getLikedVideo}



export default likesSlice.reducer;