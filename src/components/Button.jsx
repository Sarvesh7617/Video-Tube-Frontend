import React from "react";



const Button=({children,type='button',bgColor='bg-blue-600',textColor='text-white',className='',...props})=>{
    return(
        <button
            type={type}
            className={`border-2 border-black px-4 py-2 rounded-lg hover:cursor-pointer ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    )
}



export default Button;