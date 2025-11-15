import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify"




const initialState={
    loadingApi:false,
    channelState:null,
    channelVideo:[]
}




const getChannelStats=createAsyncThunk("getChannelStats",async()=>{
    try{
        const response=await axiosInstance.get("/dashboard/stats")
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const getChannelVideo=createAsyncThunk("getChannelVideo",async()=>{
    try{
        const response=await axiosInstance.get("dashboard/videos")
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})




const dashboardSlice=createSlice({
    name:"dashboard",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        //for channel stats

        builder.addCase(getChannelStats.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(getChannelStats.fulfilled,(state,action)=>{
            state.loadingApi=false
            state.channelState=action.payload
        })



        //for channel video


        builder.addCase(getChannelVideo.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(getChannelVideo.fulfilled,(state,action)=>{
            state.loadingApi=false
            state.channelVideo=action.payload
        })
    }
})




export {getChannelStats,getChannelVideo}


export default dashboardSlice.reducer;