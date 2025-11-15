import React, { useState } from "react";
import {Link} from "react-router-dom";
import {Logo} from "../components/index.js";




const TermsandCondition=()=>{
    const [isChecked,setIsChecked]=useState(false);


    return(
        <div className="container mx-auto h-screen flex justify-center items-center ">
            <div className="shadow-lg dark:bg-black bg-gray-300 border-2 dark:border-slate-500 p-8 rounded-md">
                <Logo/>
                <h1 className="sm:font-bold font-semibold sm:text-2xl text-lg mt-5 mb-5">Terms and Conditions</h1>
                <div className="mb-4">
                    <ul className="list-disc list-inside space-y-2">
                        <li>This project is to showcase my skills in web development.</li>
                        <li>
                            This web app is still in development.
                        </li>
                        <li>
                            Do not upload videos greater than 100 MB.
                        </li>
                        <li>
                            Upload no explicit content meant to be emotionally
                            gratifying.
                        </li>
                    </ul>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        checked={isChecked}
                        onClick={()=>setIsChecked((prev)=>!prev)}
                        className="mr-2 transform scale-150 hover:scale-200 transition-transform duration-300 cursor-pointer accent-green-600"
                    />
                    <label
                        htmlFor="termsCheckbox"
                        className="text-red-500 font-bold"
                    >
                        I agree to the terms and conditions
                    </label>
                </div>
                <div>
                    {isChecked &&
                        <Link
                            to="/"
                            className="inline-block bg-green-400 hover:bg-green-600 dark:text-white font-bold py-2 px-4 rounded hover:scale-110 transition-transform duration-300"
                        >
                            Continue
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}



export default TermsandCondition;