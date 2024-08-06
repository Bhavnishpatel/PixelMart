import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SellerDashboard from "../pages/SellerDashboard";
import BuyerDashboard from "../pages/BuyerDashboard";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./ProtectedRoutes";

const GsapTrasition = () => {
  const nodeRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
    }
  }, [location]);

  return (
    <div ref={nodeRef}>
      <Toaster />
      <Routes location={location}>
        <Route path="/" element={<ProtectedRoutes children={<Home />} />} />
        <Route
          path="/login"
          element={
            <ProtectedRoutes children={<Login />} reqiuresAuth={false} />
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoutes children={<Signup />} reqiuresAuth={false} />
          }
        />
        <Route
          path="/seller/profile"
          element={<ProtectedRoutes children={<SellerDashboard />} />}
        />
        <Route
          path="/buyer/profile"
          element={<ProtectedRoutes children={<BuyerDashboard />} />}
        />
      </Routes>
    </div>
  );
};

export default GsapTrasition;
