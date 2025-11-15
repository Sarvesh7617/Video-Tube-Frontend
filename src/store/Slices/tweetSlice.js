import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify"



const initialState={
    loadingApi:false,
    tweet:[]
}



const createTweet=createAsyncThunk("createTweet",async(content)=>{
    try{
        const response=await axiosInstance.post("/tweets",content);
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch (error){
        toast.error(error?.response.data?.error, {
        position: 'top-center'})
        throw error
    }
})




const editTweet = createAsyncThunk("editTweet",async ({ tweetId, content }) => {
    try {
        const response = await axiosInstance.patch(`/tweets/${tweetId}`,{content}
        );
        toast.success(response.data.message, {
        position: 'top-center'});
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});





const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const response = await axiosInstance.delete(`/tweets/${tweetId}`);
        toast.success(response.data.message, {
        position: 'top-center'});
        return response.data.data.tweetId;
    } catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});





const getUserTweets = createAsyncThunk( "getUserTweets", async (userId) => {
        try {
            const response = await axiosInstance.get(`/tweets/user/${userId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error, {
            position: 'top-center'});
            throw error;
        }
    }
);




const tweetSlice=createSlice({
    name:"tweet",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        //for get user tweet
        builder.addCase(getUserTweets.pending,(state)=>{
            state.loadingApi=true
        })
        builder.addCase(getUserTweets.fulfilled,(state,action)=>{
            state.loadingApi=false,
            state.tweet=action.payload
        })

        //for create tweet
        builder.addCase(createTweet.pending,(state)=>{
            state.loadingApi=true
        })
        builder.addCase(createTweet.fulfilled,(state,action)=>{
            state.loadingApi=false,
            state.tweet.unshift(action.payload)
        })
        

        //for delete tweet
        builder.addCase(deleteTweet.pending,(state)=>{
            state.loadingApi=true
        })
        builder.addCase(deleteTweet.fulfilled,(state,action)=>{
            state.loadingApi=false,
            state.tweet=state.tweet.filter((tweet)=>tweet.id!=action.payload)
        })
    }
})



export {createTweet,deleteTweet,editTweet,getUserTweets}


export default tweetSlice.reducer;