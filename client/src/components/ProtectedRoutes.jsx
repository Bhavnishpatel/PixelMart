import React from 'react'
import {useSelector} from "react-redux"
import {Navigate,useLocation} from "react-router-dom"
const ProtectedRoutes = ({children,reqiuresAuth=true}) => {
   const isAuthenticated =useSelector((state)=>state.auth.isAuthenticated)
   const role=useSelector((state)=>state.auth.role);
   const {pathname}=useLocation();
   if(isAuthenticated && (pathname=="/login" || pathname=="/signup")){
       return <Navigate to={`/${role}/profile`} />
   }
   if(!isAuthenticated && reqiuresAuth){
      return <Navigate to={'/login'}/>
   }

   return children;
}

export default ProtectedRoutes