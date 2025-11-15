import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify";




const initialState={
    loadingAPi:false,
    playlist:[],
    playlists:[]
}




const createPlaylist=createAsyncThunk("createPlaylist",async({name,description})=>{
    try{
        const response=await axiosInstance.post("playlist",{name,description})
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch(error){
        console.error('Error creating playlist:', error);
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})




const updatePlaylist=createAsyncThunk("updatePlaylist",async({name,description,playlistId})=>{
    try{
        const response=await axiosInstance.patch(`playlist/${playlistId}`,{name,description})
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





const deletePlaylist=createAsyncThunk("deletePlaylist",async(playlistId)=>{
    try{
        const response= await axiosInstance.delete(`playlist/${playlistId}`)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return playlistId
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})




const addVideoPlaylist=createAsyncThunk("addVideoPlaylist",async({playlistId,videoId})=>{
    try{
        const response=await axiosInstance.post(`/playlist/add/${playlistId}/${videoId}`)
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




const removeVideofromPlaylist=createAsyncThunk("removeVideofromPlaylist",async({playlistId,videoId})=>{
    try{
        const response=await axiosInstance.patch(`playlist/remove/${playlistId}/${videoId}`)
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





const getPlaylistbyId=createAsyncThunk("getPlaylistById",async(playlistId)=>{
    try{
        const response=await axiosInstance.get(`playlist/${playlistId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const getuserPlaylist=createAsyncThunk("getUserPlaylists",async(userId)=>{
    try{
        const response=await axiosInstance.get(`playlist/user/${userId}`)
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.error, {
        position: 'top-center'})
        throw error
    }
})





const playlistSlice=createSlice({
    name:"playlist",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        

        //for playlist by user

        builder.addCase(getuserPlaylist.pending,(state)=>{
            state.loadingAPi=true
        })
        builder.addCase(getuserPlaylist.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.playlists=action.payload
        })


        //delete playlist

        builder.addCase(deletePlaylist.fulfilled,(state,action)=>{
            state.loadingAPi=false
            state.playlists=state.playlists.filter((playlist)=>playlist._id!==action.payload)
        })
    }
})



export {createPlaylist,updatePlaylist,deletePlaylist,getPlaylistbyId,getuserPlaylist,removeVideofromPlaylist,addVideoPlaylist}



export default playlistSlice.reducer;