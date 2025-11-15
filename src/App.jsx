import './App.css'
import Navbar from "./components/header/Navbar";
import Sidebar from "./components/header/Sidebar";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <div className='sm:flex dark:bg-black'>
        <div>
          <Sidebar/>
        </div>
        <div className='sm:flex-1'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default App;
