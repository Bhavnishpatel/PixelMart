import React, { useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import ImageAdd from "../ImageAdd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../../store/slices/authSlice";
import axios from "axios";
import ImageCard from "../ImageCard"
import { BiMessageSquareEdit } from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import { setMyPosts } from "../../../store/slices/postSlice";

const PhotoManagement = () => {
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();
  const getMyPosts = async () => {
    try {
      if(posts.length>0) return;  
      const res = await axios.get(
        import.meta.env.VITE_APP_URL + "/post/myPost",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const {data}=await res.data;
      dispatch(setMyPosts(data));

    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(logout());
    }
  };
  useEffect(()=>{
     getMyPosts();
  },[]);
  return (
    <div className="flex flex-col sm:flex-row ">
      <div>
        {/* DashBoard header will here */}
        <DashboardHeader />
        {/* Image add  */}
        <ImageAdd />
      </div>
      {/* All Post Are Displyed here */}
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 bg-transparent sm:bg-white p-5 w-[90vw] sm:w-[60vw] sm:h-fit sm:overflow-y-scroll rounded-lg mx-auto sm:mx-0">
           {
             posts?.map(({_id,title,author,price,image})=>{
                 return <ImageCard key={_id} _id={_id} title={title} author={author} price={price} img={image} icon1={<BiMessageSquareEdit title="Edit" className="text-3xl text-black cursor-pointer hover:scale-110 transition-all duration-300" />}
                  icon2={<MdDelete title="Delete" className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all duration-300" />}  />
             })
           } 
       </div>
  </div>
  );
};

export default PhotoManagement;
