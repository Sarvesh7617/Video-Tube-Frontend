import React from "react";
import {Input,Button} from "../index.js";
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"




const Search=()=>{
    const {register,handleSubmit}=useForm();
    const navigate=useNavigate();


    const search=(data)=>{
        const query=data?.query
        navigate(`/search/${query}`)
    }


    return(
        <>
            <form onSubmit={handleSubmit(search)} className="flex cursor-pointer">
                <Input
                    placeholder="Search"
                    className="!rounded-l-md !rounded-none dark:!border-slate-300 dark:!bg-gray-500 dark:!text-white dark:focus:bg-[#222222]"
                    {...register("query",{required:true})}
                />
                <Button
                    type="submit"
                    className="!rounded-r-md !rounded-none hover:scale-107 transition-transform duration-300"
                >
                    Search
                </Button>  
            </form>
        </>
    )
}



export default Search;