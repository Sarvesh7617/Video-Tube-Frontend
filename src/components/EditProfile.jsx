import React, { useEffect } from "react";
import { Button } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../store/Slices/authSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
  const {register,handleSubmit,reset,formState: { errors, isDirty },} = useForm();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.loginUserData);

  useEffect(() => {
    if (auth) {
      reset(
        {
          fullName: auth.fullname,
          email: auth.email,
        },
        { keepDirty: false }
      );
    }
  }, [auth, reset]);

  const saveChange = (data) => {
    dispatch(updateAccount(data));
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset(
      {
        fullName: auth?.fullname,
        email: auth?.email,
      },
      { keepDirty: false }
    );
    toast.success("Reset successfully")
  };

  return (
    <div className="h-full w-full flex justify-center items-center mt-5 dark:text-white">
      <div className="w-full bg-gray-300 dark:bg-transparent border-2 dark:border-slate-500 p-5 sm:mb-2 mb-20 rounded-md max-w-md">
        <h1 className="text-center text-lg font-bold">Personal Information</h1>
        <p className="text-center text-xs font-light">Update your personal details here.</p>
        <form onSubmit={handleSubmit(saveChange)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <label className="font-semibold">Full Name*</label>
            <input
              type="text"
              {...register("fullName", { required: "Fullname is required" })}
              className="dark:bg-black bg-white border-2 dark:border-white border-black dark:focus:bg-gray-700 focus:bg-slate-200 p-2 rounded-md"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
            )}

            <label className="font-semibold">Email Address*</label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="dark:bg-black bg-white border-2 dark:border-white border-black dark:focus:bg-gray-700 focus:bg-slate-200 p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handleReset}
              className="bg-red-500 hover:scale-105 hover:bg-red-600 transition-transform duration-300"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!isDirty}
              className={`hover:scale-105 transition-transform duration-300 ${
                isDirty ? "!bg-green-400" : "bg-gray-400 !cursor-not-allowed opacity-30"
              }`}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
