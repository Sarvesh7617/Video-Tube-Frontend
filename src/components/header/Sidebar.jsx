import React from "react";
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    HiHome,
    TbUserCheck,
    RiLogoutCircleRLine
} from "../index.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/Slices/authSlice";




const Sidebar=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth?.loginUserData?.username);

    const sidebarTopItems = [
        {
            icon: <HiHome size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/watch-history",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];

    const bottomBarItems = [
        {
            icon: <HiHome size={25} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiHistory size={25} />,
            title: "History",
            url: "/watch-history",
        },
        {
            icon: <IoFolderOutline size={25} />,
            title: "Collections",
            url: "/collections",
        },
        {
            icon: <TbUserCheck size={25} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];


    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
        setTimeout(()=>{
            window.location.reload()
        },1000);
    };



    return(
        <>
            {/*for desktop*/}
            <div className="sm:block hidden z-0 dark:bg-black">
                <div className="text-black dark:text-white lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-gray-500 border-r-2 h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4 mt-5">
                        {sidebarTopItems.map((item)=>(
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({isActive})=> isActive? "bg-purple-500 text-white":""}
                            >
                                <div className="flex justify-start items-center p-2 border-1 border-gray-500 dark:border-slate-600 cursor-pointer">
                                    {item.icon}
                                    <span className="pl-2 text-base font-bold hidden md:block">{item.title}</span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className="space-y-4 mb-10">
                        {username && (
                            <div
                                className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border-1 border-gray-500 dark:border-white"
                                onClick={()=>logout()}
                            >
                              <RiLogoutCircleRLine size={25}/>
                              <span className="text-base hidden font-bold md:block pl-2">Logout</span>
                            </div>
                        )}
                        <div className="flex justify-start items-center p-2 border-1 border-gray-500 dark:border-white cursor-not-allowed">
                            <CiSettings size={25}/>
                            <span className="pl-2 text-base font-bold hidden md:block">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* For mobile*/}
            <div className="fixed bottom-0 text-black font-bold dark:bg-black bg-white dark:text-white flex justify-around items-center w-full h-16 dark:border-white border-gray-500 border-t-2 sm:hidden z-10">
                {bottomBarItems.map((item)=>(
                    <NavLink
                        to={item.url}
                        key={item.title}
                        className={({isActive})=> isActive? "text-purple-500":""}
                    >
                        <div className="flex flex-col justify-center items-center cursor-pointer">
                            {item.icon}
                            <span className="text-center text-sm">{item.title}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}



export default Sidebar;