import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosHelper"
import {toast} from "react-toastify";



const initialState={
    loadingApi:false,
    status:false,
    loginUserData:null
}



const createAccount=createAsyncThunk("register",async(data)=>{
    const formData=new FormData();

    formData.append("avatar",data.avatar[0]);
    formData.append("username",data.username);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("fullname",data.fullName);
    if(data.coverImage)
      formData.append("coverImage",data.coverImage[0])



    try{
        const response=await axiosInstance.post('/users/register',formData);
        toast.success(response.data?.message, {
        position: 'top-center',})
        return response.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error;
    }
})





const userLogin=createAsyncThunk("login",async(data)=>{
    try{
        const response=await axiosInstance.post('/users/login',data)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data.user
    }
    catch(error){
        throw new Error(error?.response?.data?.message);
    }
})





const userLogout=createAsyncThunk("logout",async()=>{
    try{
        const response=await axiosInstance.post("/users/logout");
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error;
    }
})




const refreshAccessToken=createAsyncThunk("refreshAccessToken",async(data)=>{
    try{
        const response=await axiosInstance.post("/users/refresh-token",data)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error;
    }
})



const changePassword=createAsyncThunk("changePassword",async(data)=>{
    try{
        const response=await axiosInstance.post("/users/change-password",data)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error;
    }
})




const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const response = await axiosInstance.get("/users/current-user");
    toast.success(response.data?.message, {
        position: 'top-center'});
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "User not logged in", {
        position: 'top-center'});
    throw error;
  }
});





const updateAccount=createAsyncThunk("updateAccount",async(data)=>{
    try{
        const response=await axiosInstance.patch("/users/update-account",data)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error
    }
})




const updateAvatar=createAsyncThunk("updateAvatar",async(avatar)=>{
    try{
        const response=await axiosInstance.patch("/users/update-avatar",avatar)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error
    }
})



const updateCoverImage=createAsyncThunk("updateCoverImage",async(coverImage)=>{
    try{
        const response=await axiosInstance.patch("/users/update-cover-Image",coverImage)
        toast.success(response.data?.message, {
        position: 'top-center'})
        return response.data.data
    }
    catch(error){
        toast.error(error?.response?.data?.message, {
        position: 'top-center'})
        throw error
    }
})



const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        //For create account

        builder.addCase(createAccount.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(createAccount.fulfilled,(state)=>{
            state.loadingApi=false
        })

        //For User login

        builder.addCase(userLogin.pending, (state) => {
            state.loadingApi = true;
        })

        builder.addCase(userLogin.fulfilled, (state,action) => {
            state.loadingApi = false;
            state.status=true;
            state.loginUserData=action.payload;
        })

        builder.addCase(userLogin.rejected, (state) => {
            state.loadingApi = false;
            state.status = false;
        });

        //For user logout

        builder.addCase(userLogout.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(userLogout.fulfilled,(state)=>{
            state.loadingApi=false
            state.status=false;
            state.loginUserData=null;
        })

        builder.addCase(userLogout.rejected,(state)=>{
            state.loadingApi=false
            state.status=false;
            state.loginUserData=null;
        })


        //For current user 

        builder.addCase(getCurrentUser.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(getCurrentUser.fulfilled,(state,action)=>{
            state.loadingApi=false
            state.status=true
            state.loginUserData=action.payload
        })

        builder.addCase(getCurrentUser.rejected,(state)=>{
            state.loadingApi=false
            state.status=false
            state.loginUserData=null
        })



        //for update account


        builder.addCase(updateAccount.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(updateAccount.fulfilled,(state,action)=>{
            state.loadingApi=false
            state.loginUserData=action.payload
        })


        //for update Avatar

        builder.addCase(updateAvatar.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(updateAvatar.fulfilled,(state,action)=>{
            state.loadingApi=false
            state.loginUserData=action.payload
        })

        builder.addCase(updateAvatar.rejected,(state)=>{
            state.loadingApi=false
        })


        //for update cover image

        builder.addCase(updateCoverImage.pending,(state)=>{
            state.loadingApi=true
        })

        builder.addCase(updateCoverImage.fulfilled,(state,action)=>{
            state.loadingApi=false
            state.loginUserData=action.payload
        })

        builder.addCase(updateCoverImage.rejected,(state)=>{
            state.loadingApi=false
        })  
    }
})

 

export {createAccount,userLogin,userLogout,getCurrentUser,updateAccount,updateAvatar,updateCoverImage,changePassword,refreshAccessToken};



export default authSlice.reducer;