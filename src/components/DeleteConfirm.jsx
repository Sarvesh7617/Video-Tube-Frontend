import React from "react";
import { Button, ImBin } from "./index.js";




const DeleteConfirmatiion=({onDelete,onCancel,tweet,video,comment})=>{
    return (
        <div className="fixed inset-0 top-0 left-0 w-full h-full flex justify-center items-center dark:bg-black/80 bg-black/60 z-50">
            <div className="text-center sm:p-5 p-3 bg-black dark:border-slate-400 border-blue-500 border-1 rounded-xl flex justify-center items-start gap-2 flex-wrap w-80">
                <ImBin
                    color="red"
                    size={25}
                />
                <div className="flex flex-col flex-wrap items-start">
                    <h1 className="font-bold text-xl mb-1">
                        Delete
                        {`${comment?"Comment":""} 
                            ${video?"Video":""}
                            ${tweet?"Tweet":""}`
                        }
                    </h1>
                    <p className="text-md font-semibold text-start w-60">
                        <span>
                            Are you sure you want to delete this{" "}
                            {`${comment?"Comment":""} 
                            ${video?"Video":""}
                            ${tweet?"Tweet":""}`
                            }?{" "}
                        </span>
                        <span>
                            Once its deleted, you will not be able
                            to recover it.
                        </span>
                    </p>
                </div>
                <div className="font-normal justify-center flex flex-wrap">
                    <Button
                        onClick={onCancel}
                        className="bg-gray-700 hover:scale-105 transition-transform duration-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onDelete}
                        className="bg-red-500 hover:scale-105 transition-transform duration-300"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}



export default DeleteConfirmatiion;