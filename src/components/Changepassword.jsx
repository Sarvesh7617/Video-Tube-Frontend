import React from "react";
import {Button} from "./index.js";
import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux";
import {changePassword} from "../store/Slices/authSlice";




const ChangePassword=()=>{
    const {handleSubmit,register,formState:{errors},getValue,resetFeild}=useForm();
    const dispatch=useDispatch();


    const onSubmit=(data)=>{
        dispatch(changePassword({
            oldPassword:data?.oldPassword,
            newPassword:data?.newPassword
        })
    )
    resetFeild("oldPassword")
    resetFeild("newPassword")
    resetFeild("confirmPassword")
    }



    return (
        <div className="dark:text-white w-full flex justify-center items-center mt-2">
            <div className="bg-gray-300 dark:bg-transparent px-8 py-3 shadow-lg border-1 rounded-md sm:mb-2 mb-20 w-full max-w-lg">
                <h2 className="mb-4 text-lg font-bold text-center">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <label className="font-semibold">Enter Old Password*</label>
                        <input
                            type="password"
                            {...register("oldPassword",{
                                required:"Old password is required"
                            })}
                            className="dark:bg-black border-2 dark:border-white border-black dark:focus:bg-gray-700 focus:bg-slate-200 p-2 rounded-md"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-500 text-sm -mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                        <label className="font-semibold">Enter New Password*</label>
                        <input
                            type="password"
                            {...register("newPassword",{
                                required:"New password is required",
                                minLength:{
                                    value:6,
                                    message:"Password must be at least 6 characters long"
                                }
                            })}
                            className="dark:bg-black border-2 border-black dark:border-white dark:focus:bg-gray-700 focus:bg-slate-200 p-2 rounded-md"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm -mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                        <label className="font-semibold">Enter Confirm Password*</label>
                        <input
                            type="password"
                            {...register("confirmPassword",{
                                required:"Confirm password is required",
                                validate:{
                                    matchesNewPassword:(value)=>
                                        value===getValue("newPassword")|| "New Password and Confirm Password not be New Password and Confirm Password should be the same."
                                }
                            })}
                            className="dark:bg-black border-2 border-black dark:border-white dark:focus:bg-gray-700 focus:bg-slate-200 p-2 rounded-md"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm -mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full flex justify-center">
                        <Button
                            type="submit"
                            className="mt-4 hover:scale-110 transition-transform duration-300"
                        >
                            Change Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}




export default ChangePassword;