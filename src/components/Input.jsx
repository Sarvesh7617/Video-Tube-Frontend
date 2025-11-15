import React, { forwardRef, useId } from "react";



const Input=forwardRef(({
    label,
    type='text',
    className="",
    ...props
},ref)=>{

    const id=useId();
    return(
        <div className="w-full">
            {label && <label
                className='inline-block mb-1 pl-1' 
                htmlFor={id}   
            >{label}
            </label>
            }
            <input
                type={type}
                className={`w-full bg-white py-2 px-2 rounded-md border border-2 text-black focus:bg-gray-50 duration-200 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})




export default Input;