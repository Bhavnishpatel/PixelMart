import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { IoIosHeart, IoMdPhotos } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import {FaList} from "react-icons/fa"
import { setTab } from "../../store/slices/navSlice";
import { logout } from "../../store/slices/authSlice";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const dispatch=useDispatch();
  const author = useSelector((state) => state.auth.author);
  const sidebar=useSelector((state) => state.nav.sidebar);
  const tab=useSelector((state) => state.nav.tab);
 

  return (
    <nav className={`fixed z-10 ${!sidebar==true ? '-translate-x-[500px] sm:translate-x-0':'translate-x-0'} text-lg font-semibold bg-white shadow-lg flex flex-col gap-2 w-[15vw] min-h-screen p-3 list-none   ease-in-out duration-300 sm:static justify-between items-center`}>
      <div> 
        <div className="bg-black my-5 w-fit rounded-full py-4 px-6 text-white flex-grow">
          {author.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2">
          {pathname === "/seller/profile" ? (
            <li
              className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer
             transition-all easy-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab==="photos-management" && "bg-black text-white" }`}
             onClick={()=>dispatch(setTab("photos-management"))}
            >
              <IoMdPhotos /> Photo Mangement
            </li>
          ) : (
            <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer
              transition-all easy-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab==="photos-purchased" && "bg-black text-white" }`}
              onClick={()=>dispatch(setTab("photos-purchased"))}
            >
              <IoMdPhotos /> Photos purchased
            </li>
          )}
          <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all easy-linear 
            duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab=='analytics' &&'text-white bg-black'}`}
            onClick={()=>dispatch(setTab("analytics"))}
          >
            <SiGoogleanalytics /> Analytics
          </li>
          <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all easy-linear 
            duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab=='order' &&'text-white bg-black'}`}
            onClick={()=>dispatch(setTab("order"))}
          >
            <FaList /> Orders
          </li>
          <li
             className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all easy-linear 
              duration-300 hover:scale-105 flex gap-2 justify-start items-center ${tab=='favourites' &&'text-white bg-black'}`}
              onClick={()=>dispatch(setTab("favourites"))}
          >
            <IoIosHeart /> Favourites
          </li>
          <Link to='/'
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all easy-linear 
            duration-300 hover:scale-105 flex gap-2 justify-start items-center"
          >
            <AiFillHome /> Home
          </Link>
        </div>
      </div>
      {/* LogOut Button */}
      <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all easy-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center" 
      onClick={()=>dispatch(logout())} 
      >
        <IoLogOut />
        Logout
      </li>
    </nav>
  );
};

export default DashboardSidebar;
