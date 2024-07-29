import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`${import.meta.env.VITE_APP_URL}/login`,{
        email,
        password
      })
      const data=await res.data;
      toast.success(data.Message);
      dispatch(login(data))
      navigate(`/${data.role}/profile`)
    } catch (error) {
       toast.error(error.message.data.message);
    }

  }
  return (
    <div className="mt-10 sm:mt-20 min-h-screen flex items-center justify-center w-full">
    <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
      <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
      <form onSubmit={handleLogin}>
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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="your@email.com"
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
        {/* For Forgot Password */}
        <a href="#" className="text-xs text-gray-500 hover:text-black">Forgot Password</a>
       
        {/* Login With Account */}
        <div className="flex items-center justify-end mb-4">
        <Link to="/signup" className="text-xs text-black ">Create Account</Link>
        </div>
        <button className="w-full py-2 px-4 rouded-md shadow-md text-sm font-medium text-white  bg-black" type="submit">LogIn</button>
      </form>
    </div>
  </div>
  )
}

export default Login