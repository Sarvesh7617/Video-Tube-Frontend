import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {getCurrentUser,userLogin} from '../store/Slices/authSlice';
import {Button,Logo} from './index.js';
import LoginSkeleton from "../skeleton/LoadingSkeleton";


const Login=()=>{

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit,formState: { errors }}=useForm();
    const loading=useSelector((state)=>state.auth?.loadingApi)
    const [error,setError]=useState("");

    
    const loginSubmit=async(data)=>{
        setError("")
        try {
            const isEmail=data.username.includes("@")
            const loginData=isEmail?{email:data.username,password:data.password}:data
            const response=await dispatch(userLogin(loginData)).unwrap()
            const user=await dispatch(getCurrentUser());
            if(user && response?.payload)
                navigate('/')
        } 
        catch (error) {
            setError(error.message); 
        }
    }


    if(loading)
        return <LoginSkeleton/>

    
    return(
        <div className="flex items-center w-full h-screen justify-center dark:bg-black">
            <div className="max-w-lg w-full rounded-xl p-5 m-5 bg-gray-300 dark:bg-gray-600 dark:text-white">
                <div className="flex justify-center mb-1">
                    <Logo/>
                </div>
                <h2 className="text-center font-bold text-2xl leading-tight">Sign in to your account</h2>
                <p className="text-center text-md p-2 leading-tight">
                    Don&apos;t have any account?&nbsp;                              {/*&apos;-> ' and &nbsp;-> for space*/}
                    <Link to="/signup" className="text-blue-500 font-semibold underline">
                        Sign Up
                    </Link>
                </p>                                                   
                {error && <p className="text-red-600 m-3 text-center">{error}</p>}
                <form onSubmit={handleSubmit(loginSubmit)}>
                    <div className="space-y-5">
                        <div className="text-black dark:text-white">
                            <label
                                className='inline-block mb-1 pl-1'  
                            >Username / Email:
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your username or email"
                                {...register("username",{
                                    required:"username is required",
                                    validate:{
                                        confirmEmail:(value)=>{
                                            if(value.includes('@'))
                                            {
                                                return /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value)||
                                                "Email address must be a valid address"
                                            }
                                            return true;
                                        }
                                    }
                                })}
                                 className="w-full bg-white dark:focus:bg-[#222222] dark:border-slate-400 dark:bg-black py-2 px-2 rounded-md border-2 light:focus:bg-gray-50 duration-200"
                            />
                        </div>
                        {errors.username && (<p className="text-red-500 text-sm -mt-4">{errors.username.message}</p>)}
                        <div  className="text-black dark:text-white">
                            <label
                                className='inline-block mb-1 pl-1 text'  
                            >Password:
                            </label>
                            <input
                                type='password'
                                placeholder="Enter your Password"
                                {...register('password',{
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
                                className="w-full bg-white dark:focus:bg-[#222222] dark:bg-black dark:border-slate-400 py-2 px-2 rounded-md border-2 light:focus:bg-gray-50 duration-200"
                            />
                        </div>
                        {errors.password && (<p className="text-red-500 text-sm -mt-4">{errors.password.message}</p>)}
                        <Button
                            type="submit"
                            className="w-full p-2 rounded-md transition-transform hover:bg-blue-700 hover:scale-102 duration-300"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Login;