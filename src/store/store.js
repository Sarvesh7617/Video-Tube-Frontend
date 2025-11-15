import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import commentReducer from "./Slices/commentSlice";
import dashboardReducer from "./Slices/dashboardSlice";
import  likesReducer from "./Slices/likesSlice";
import playlistReducer from "./Slices/playlistSlice";
import subscriptionReducer from "./Slices/subscriptionSlice";
import tweetReducer from "./Slices/tweetSlice";
import userReducer from "./Slices/userSlice";
import videoReducer from "./Slices/videoSlice";


const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        tweet:tweetReducer,
        like:likesReducer,
        video:videoReducer,
        comment:commentReducer,
        dashboard:dashboardReducer,
        playlist:playlistReducer,
        subscription:subscriptionReducer
    }
})



export default store;