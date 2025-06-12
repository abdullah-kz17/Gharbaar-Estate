import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../common/Loader.jsx"


const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  // Show toast if not logged in (but only after loading finishes)
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast.warn("Please log in to access this page", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return <div className="text-center mt-10"><Loader /></div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
