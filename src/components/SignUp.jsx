import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { useForm } from "react-hook-form";
import {createAccount,userLogin} from "../store/Slices/authSlice";
import { Button,Logo} from "./index.js";
import GetImagePreview from "./GetImagePreview";
import RegisterSkeleton from "../skeleton/LoadingSkeleton";


const SignUp=()=>{

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit,formState: { errors },control}=useForm();
    const loading=useSelector((state)=>state.auth?.loadingApi)
    const [error,setError]=useState("");

    const signupSubmit=async(data)=>{
        setError("")
        try {
            const response=await dispatch(createAccount(data));
            if (response?.payload?.success)
            {
                const username=data?.username
                const password=data?.password
                const login=await dispatch(userLogin({username,password}))
                console.log(login?.type)
                if(login?.type==="login/fulfilled")
                    navigate('/terms&condition')
                else
                    navigate("/login")
            }
        } 
        catch (error) {
            setError(error.message)
        }
    }

    if(loading)
        return <RegisterSkeleton register={true}/>


    return(
        <div className="flex items-center justify-center w-full dark:bg-black">
            <div className="w-full max-w-lg dark:bg-gray-600 bg-gray-300 rounded-xl p-5 border-black/10 m-8 relative z-50 dark:text-white">
                <div className="flex justify-center">
                    <span>
                        <Logo/>
                    </span>
                </div>
                <h2 className="text-center font-bold text-2xl leading-tight">Sign up to create account</h2>
                <p className="text-center text-md p-2 leading-tight">
                    Already have an account?&nbsp;
                    <Link to='/login' className="text-blue-500 font-semibold underline">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                <form onSubmit={handleSubmit(signupSubmit)}>
                <div className="w-full relative h-28 bg-gray-400 dark:bg-[#222222] rounded-md overflow-hidden border-2 dark:border-white border-black">
                
                    <div className="relative w-full h-full top-11">
                        
                        <GetImagePreview
                            name="coverImage"
                            control={control}
                            cameraIcon={true}
                            cameraSize={24}
                            className="w-full h-32 absolute object-cover border-none"
                            rules={{ required: "Cover Image is required" }}
                        />                    
                        <div className="text-sm absolute right-2 bottom-12 text-white bg-black bg-opacity-40 px-2 py-0.5 rounded cursor-default">
                            Cover Image
                        </div>
                    </div>

                    {/* Avatar remains unchanged */}
                    <div className="absolute left-2 bottom-2 dark:bg-[#222222] rounded-full border-2 border-black flex items-center justify-center bg-gray-400 dark:bg-[#222222]">
                        <GetImagePreview
                            name="avatar"
                            control={control}
                            cameraIcon={true}
                            cameraSize={20}
                            className="object-cover rounded-full w-20 h-20 outline-none"
                            rules={{ required: "Avatar is required" }}
                        />
                    </div>
                </div>

                    {errors.avatar && (
                        <div className="text-red-500 text-sm mt-2 mb-2">
                            {errors.avatar.message}
                        </div>
                    )}
                    <div className="space-y-5 mt-4">
                        <div>
                            <label
                                className='inline-block mb-1 pl-1'  
                            >Username:
                            </label>
                            <input
                                type='text'
                                placeholder="Enter Username"
                                {...register('username',{
                                    required:"Username is required"
                                })}
                                className="w-full dark:focus:bg-[#222222] bg-white dark:bg-black py-2 px-2 rounded-md border-2 light:focus:bg-gray-50 duration-200"
                            />
                        </div>
                        {errors.username && (<p className="text-red-500 text-sm -mt-4">{errors.username.message}</p>)}
                        <div>
                            <label
                                className='inline-block mb-1 pl-1'  
                            >Full Name:
                            </label>
                            <input
                                type='text'
                                placeholder="Enter your full name"
                                {...register('fullName',{
                                    required:"Please enter fullname"
                                })}
                                className="w-full dark:focus:bg-[#222222] bg-white dark:bg-black py-2 px-2 rounded-md border-2 light:focus:bg-gray-50 duration-200"
                            />
                        </div>
                        {errors.fullName && (<p className="text-red-500 text-sm -mt-4">{errors.fullName.message}</p>)}
                        <div>
                            <label
                                className='inline-block mb-1 pl-1'  
                            >Email:
                            </label>
                            <input
                                type='email'
                                placeholder="Enter your email"
                                {...register('email',{
                                    required:"Please enter email",
                                    validate:{
                                        matchPattern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value)||
                                        "Email address must be a valid address"
                                    }
                                })}
                                className="w-full dark:focus:bg-[#222222] bg-white dark:bg-black py-2 px-2 rounded-md border-2 light:focus:bg-gray-50 duration-200"
                            />
                        </div>
                        {errors.email && (<p className="text-red-500 text-sm -mt-4">{errors.email.message}</p>)}
                        <div>
                            <label
                                className='inline-block mb-1 pl-1'  
                            >Password:
                            </label>
                            <input
                                type='password'
                                placeholder="Enter your password"
                                {...register("password",{
                                    required:"Please enter password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    },
                                    maxLength: {
                                        value: 265,
                                        message: "Password must not exceed 265 characters"
                                    },
                                    validate: {
                                        notCommon: (value) => {
                                        const commonPasswords = ["password", "12345678", "qwerty", "11111111"];
                                        return !commonPasswords.includes(value) || "Please choose a stronger password";
                                        },
                                    }
                                })}
                                className="w-full dark:focus:bg-[#222222] bg-white dark:bg-black py-2 px-2 rounded-md border-2 light:focus:bg-gray-50 duration-200"
                            />
                        </div>
                        {errors.password && (<p className={`text-red-500 text-sm -mt-4 ${errors.password.message?"":"-mt-4"}`}>{errors.password.message}</p>)}
                        <Button
                            type="submit"
                            className="w-full p-2 rounded-md transition-transform hover:bg-blue-700 hover:scale-102 duration-300"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default SignUp;