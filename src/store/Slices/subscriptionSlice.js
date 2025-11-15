import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify"



const initialState={
    loadingAPi:false,
    subscribed:null,
    channelSubscribers:[],
    mySubscription:[]
}



const toggleSubscription=createAsyncThunk("toggleSubscription",async(channelId)=>{
    try{
        const response=await axiosInstance.post(`subscriptions/c/${channelId}`)
        return response.data.data.subscribed
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})




const getUserChannelSubscribers=createAsyncThunk("getUserChannelSubscribers",async(channelId)=>{
    try{
        const response=await axiosInstance.get(`subscriptions/c/${channelId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const getSubscribedChannels=createAsyncThunk("getSubscribedChannels",async(subscriberId)=>{
    try{
        const response=await axiosInstance.get(`subscriptions/u/${subscriberId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const subscriptionsSlice=createSlice({
    name:"subscription",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
        //for toggle subscription

        builder.addCase(toggleSubscription.pending,(state)=>{
            state.loadingAPi=true
        })

        builder.addCase(toggleSubscription.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.subscribed=action.payload
        })


        //for channel subscriber

        builder.addCase(getUserChannelSubscribers.pending,(state)=>{
            state.pending=true
        })


        builder.addCase(getUserChannelSubscribers.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.channelSubscribers=action.payload
        })

        //for subscribed channel

        builder.addCase(getSubscribedChannels.pending,(state)=>{
            state.loadingAPi=true
        })

        builder.addCase(getSubscribedChannels.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.mySubscription=action.payload.filter((subscription)=>subscription?.subscribedChannel?.latesVideo)
        })
    }
})




export {toggleSubscription,getSubscribedChannels,getUserChannelSubscribers}


export default subscriptionsSlice.reducer;