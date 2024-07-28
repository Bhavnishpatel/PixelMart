import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate=useNavigate();
  const [userName,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [accountType,setAccountType]=useState("");
  
  const handleSignUp=async (e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`${import.meta.env.VITE_APP_URL}/signup`,{
        userName,
        email,
        password,
        accountType
      })
      const data=await res.data;
      console.log(data);
      if(data.success){
         setUserName("");
         setEmail("");
         setPassword("");
         setAccountType("");
         toast.success(data.Message);
         navigate('/login');
      }
    } catch (error) {
       toast.error(error.response.data.message);
    }
  }

  return (
    <div className="mt-10 sm:mt-20 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleSignUp} >
          {/* For UserName */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              placeholder="bhavnishPatel"
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* For Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* For Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* For Account Selection */}
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select User Account Type
            </label>
            <select onChange={(e)=>setAccountType(e.target.value)} className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black" >
              <option  value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {/* Login With Account */}
          <div className="flex items-center justify-end mb-4">
          <Link to="/login" className="text-xs text-black ">Log In With Account</Link>
          </div>
          <button className="w-full py-2 px-4 rouded-md shadow-md text-sm font-medium text-white  bg-black" type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
