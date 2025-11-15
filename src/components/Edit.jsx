import React, { useState } from "react";
import {Button} from "./index.js";



const Edit=({onCancel,onSave,initialContent})=>{
    const [editedContent,setEditedContent]=useState(initialContent);


    const handleSave=()=>{
        onSave(editedContent)
    }




    return(
        <>
            <div>
                <label className="text-white">Edit Content</label>
                <input
                    autoFocus
                    value={editedContent}
                    onChange={(e)=>setEditedContent(e.target.value)}
                />
                <div>
                    <span
                        onClick={onCancel}
                    >
                        Cancel
                    </span>
                    <Button
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}



export default Edit;