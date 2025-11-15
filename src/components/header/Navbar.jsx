import { useState } from "react";
import Search from "./Search";
import SearchforSmallScreen from "../SearchforSmallScreen";
import {Button,IoCloseCircleOutline,BiLike,CiSearch,HiOutlineVideoCamera,SlMenu,Logo,RiLogoutCircleRLine} from "../index.js";
import {useSelector,useDispatch} from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import {userLogout} from "../../store/Slices/authSlice"
import {Link} from "react-router-dom";





const Navbar=()=>{
    const [toggleMenu,setToggleMenu]=useState(false);
    const [openSearch,setOpenSearch]=useState(false);
    const authStatus=useSelector((state)=>state.auth.status);
    const username=useSelector((state)=>state.auth?.loginUserData?.username);
    const profileImg=useSelector((state)=>state.auth?.loginUserData?.avatar)
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const logout=async()=>{
        await dispatch(userLogout())
        navigate("/")
    }

    const sidePanelItems = [
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: `/channel/${username}`,
        },
    ];


    return(
        <>
            <nav className="p-3 flex w-full bg-white dark:bg-black justify-between items-center border-b-2 border-gray-500 sticky top-0 z-50">
                <div className="pb-2">
                    <Logo/>
                </div>


                {/* search for large screens */}
                <div className="w-full hidden sm:w-1/3 sm:block">
                    <Search/>
                </div>


                {/* search for small screens */}
                <div className="text-black dark:text-white inline-flex justify-end sm:hidden w-full pr-4 cursor-pointer">
                    <CiSearch
                        size={35}
                        fontWeight={"bold"}
                        onClick={()=>setOpenSearch((prev)=>!prev)}
                    />

                    {openSearch && (
                        <SearchforSmallScreen
                            openSearch={openSearch}
                            setOpenSearch={setOpenSearch}
                        />
                    )}
                </div>


                {/* login and signup butons for larger screens */}
                {authStatus ?(
                    <div className="sm:block hidden rounded-full">
                        <img
                            src={profileImg}
                            alt="Profile Image"
                            className="rounded-full w-10 h-10"
                        />
                    </div>
                ):(
                    <div className="hidden sm:block space-x-2">
                        <Link to={"/login"}>
                            <Button>Login</Button>
                        </Link>

                        <Link to={"/signup"}>
                            <Button>Sign up</Button>
                        </Link>
                    </div>
                )}




                {/* hamburger for smaller screens */}
                <div className="sm:hidden block">
                    <div className="text-black dark:text-white cursor-pointer">
                        <SlMenu
                            size={30}
                            onClick={()=>setToggleMenu((prev)=>!prev)}
                        />
                    </div>
                </div>


                {/* Side bar for smaller screens */}
                {toggleMenu && (
                    <div className="fixed right-0 top-0 dark:text-white flex flex-col justify-between h-screen w-[50%] bg-gray-400 dark:bg-black dark:bg-opacity-75 border-l-2 dark:border-pink-500 sm:hidden rounded-l-lg">
                        <div className="w-full flex items-center h-10 justify-end items-center cursor-pointer mb-5 pt-4 pr-4">
                        <IoCloseCircleOutline
                            size={40}
                            onClick={() => setToggleMenu((prev) => !prev)}
                        />
                        </div>

                        <div className="flex flex-col justify-between flex-grow px-3 bg-gray-400 dark:bg-black dark:bg-opacity-75 border-t-2 border-gray-500">
                        <div className="flex flex-col gap-4 mt-5">
                            {sidePanelItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                onClick={() => setToggleMenu((prev) => !prev)}
                                className={({ isActive }) => (isActive ? "bg-purple-500" : "")}
                            >
                                <div className="flex border-2 border-slate-700 px-3 py-2 gap-5 hover:bg-purple-500">
                                <div>{item.icon}</div>
                                <span>{item.title}</span>
                                </div>
                            </NavLink>
                            ))}
                        </div>


                        {!authStatus ? (
                            <div className="flex flex-col space-y-2 mb-6 mt-4">
                            <Link to={"/login"}>
                                <Button className="w-full hover:scale-110 transition-transform duration-300">
                                Login
                                </Button>
                            </Link>
                            <Link to={"/signup"}>
                                <Button className="w-full hover:scale-110 transition-transform duration-300">
                                Sign up
                                </Button>
                            </Link>
                            </div>
                        ) : (
                            <div
                            onClick={() => logout()}
                            className="flex items-center gap-2 cursor-pointer mb-6 mt-4 border-2 p-2 hover:scale-105 transition-transform duration-300 hover:bg-purple-500"
                            >
                            <RiLogoutCircleRLine size={25} />
                            <span>Logout</span>
                            </div>
                        )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}



export default Navbar;