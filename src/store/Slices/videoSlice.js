import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosHelper";
import {toast} from "react-toastify";
import { BASE_URL } from "../../config/config";


const initialState={
    loadingApi: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false,
    },
    video: null,
    publishToggled: false,
}




const getAllVideos = createAsyncThunk("getAllVideos",async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
        const url = new URL(`${BASE_URL}/videos`);

        if (userId) 
            url.searchParams.set("userId", userId);
        if (query) 
            url.searchParams.set("query", query);
        if (page) 
            url.searchParams.set("page", page);
        if (limit) 
            url.searchParams.set("limit", limit);
        if (sortBy && sortType) {
            url.searchParams.set("sortBy", sortBy);
            url.searchParams.set("sortType", sortType);
        }

        const response = await axiosInstance.get(url);

        return response.data.data;
    } 
    catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});




const publishAVideo=createAsyncThunk("publishAVideo",async(data)=>{
    const formData=new FormData();
    formData.append("title",data.title);
    formData.append("description",data.description);
    formData.append("videoFile",data.videoFile[0])
    formData.append("thumbnail",data.thumbnail[0]);


    try{
        const response=await axiosInstance.post("/videos",formData)
            toast.success(response?.data?.message)
            return response.data.data
        }
    catch (error) 
    {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})



const cancelUpload = createAsyncThunk("cancelUpload", async ({ videoFilePath, thumbnailPath }) => {
  try {
    await axiosInstance.post("/videos/cancel-upload", {
      data: 
      { 
        videoFilePath,
        thumbnailPath,
      },
    });
  } 
  catch (error) {
    throw error;
  }
});



const getVideoById = createAsyncThunk("getVideoById",async (videoId) => {                //dispatch(getVideoById("abc123"));
    try {
        const response = await axiosInstance.get(`/videos/v/${videoId}`);
        return response.data.data;
    } 
    catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});




const updateAVideo=createAsyncThunk("updateAVideo",async({data,videoId})=>{
    const formData=new FormData()

    formData.append("title",data.title)
    formData.append("description",data.description);
    formData.append("thumbnail",data.thumbnail[0])
    
    try{
        const response = await axiosInstance.patch(`/videos/v/${videoId}`,formData);
        console.log(response?.data?.message)
        toast.success(response?.data?.message, {
        position: 'top-center'});
        return response.data.data;
    } 
    catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
})






const deleteAVideo = createAsyncThunk("deleteAVideo",async (videoId) => {
    try {
        const response = await axiosInstance.delete(`/videos/v/${videoId}`);
        toast.success(response?.data?.message, {
        position: 'top-center'});
        return response.data.data;
    } 
    catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});





const togglePublishStatus = createAsyncThunk("togglePublishStatus",async (videoId) => {
    try {
        const response = await axiosInstance.patch(`/videos/toggle/publish/${videoId}`);
        console.log(response.data.message)
        toast.success(response.data.message, {
        position: 'top-center'});
        return response.data.data.isPublished;
    } 
    catch (error) {
        toast.error(error?.response?.data?.error, {
        position: 'top-center'});
        throw error;
    }
});





const videoSlice=createSlice({
    name:"video",
    initialState,
    reducers:{
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) => {
            state.videos.docs = [];
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllVideos.pending, (state) => {
            state.loadingApi = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loadingApi = false;
            state.videos.docs = [...state.videos.docs, ...action.payload.docs];
            state.videos.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(publishAVideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(publishAVideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });

        builder.addCase(cancelUpload.pending, (state) => {
            state.uploading = false;
            state.uploaded = false;
        });

        builder.addCase(updateAVideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(updateAVideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(deleteAVideo.pending, (state) => {
            state.loadingApi = true;
        });
        builder.addCase(deleteAVideo.fulfilled, (state) => {
            state.loadingApi = false;
        });
        builder.addCase(getVideoById.pending, (state) => {
            state.loadingApi = true;
        });
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loadingApi = false;
            state.video = action.payload;
        });
        builder.addCase(togglePublishStatus.fulfilled, (state) => {
            state.publishToggled = !state.publishToggled;
        });
    }
})




export {getAllVideos,cancelUpload,publishAVideo,updateAVideo,deleteAVideo,getVideoById,togglePublishStatus}


export const {updateUploadState,makeVideosNull}=videoSlice.actions

export default videoSlice.reducer;