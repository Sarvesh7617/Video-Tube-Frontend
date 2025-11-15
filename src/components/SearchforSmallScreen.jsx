import React from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Input,Button} from "./index.js";
import { IoCloseCircleOutline } from "./index.js";




const SearchforSmallScreen=({openSearch,setOpenSearch})=>{
    const {register,handleSubmit}=useForm();
    const navigate=useNavigate();



    const search=(data)=>{
        const query=data?.query;
        navigate(`/search/${query}`)
        setOpenSearch((prev)=>!prev)
    }



    return(
        <>
            {openSearch && (
                <div className="fixed bg-black/70 bg-opacity-75 z-1 inset-0 h-screen w-full text-white">
                    <div className="sm:p-8 p-4 relative">
                        <div className="justify-self-end pb-5 cursor-pointer dark:bg-black rounded-full">
                            <IoCloseCircleOutline 
                                size={40}
                                onClick={()=>setOpenSearch((prev)=>!prev)}
                            />
                        </div>
                        <form onSubmit={handleSubmit(search)} className="flex">
                            <Input
                                type="text"
                                placeholder="Search"
                                className="!rounded-r-none dark:focus:bg-[#222222] dark:text-white dark:bg-gray-500 dark:border-slate-400"
                                {...register('query',{required:true})}
                            />   

                            <Button
                                type="submit"
                                className="!rounded-l-none hover:scale-107 transition-transform duration-300"
                            >
                                Search
                            </Button>                
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}



export default SearchforSmallScreen;