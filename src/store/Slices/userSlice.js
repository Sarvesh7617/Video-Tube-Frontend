import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosHelper";
import {toast} from "react-toastify";


const initialState={
    loadingApi:false,
    profileData:null,
    watchhistory:[]
}



const getUserChannelProfile = createAsyncThunk("getUserChannelProfile",async (username) => {
    try {
        const response = await axiosInstance.get(`/users/c/${username}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});




const getWatchHistory = createAsyncThunk("getWatchHistory", async () => {
    try {
        const response = await axiosInstance.get("/users/watch-history");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});




const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        //for user channel profile
        builder.addCase(getUserChannelProfile.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(getUserChannelProfile.fulfilled,(state,action)=>{
            state.loadingApi=false,
            state.profileData=action.payload
        })


        //for watch history
        builder.addCase(getWatchHistory.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(getWatchHistory.fulfilled,(state,action)=>{
            state.loadingApi=false,
            state.watchhistory=action.payload
        })

    }
})



export {getUserChannelProfile,getWatchHistory}


export default userSlice.reducer;