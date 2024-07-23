import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="mt-10 sm:mt-20 min-h-screen flex items-center justify-center w-full">
    <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
      <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
      <form>
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