import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../common/Loader.jsx"

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (isLoggedIn && user && user.role !== "admin") {
      toast.error("Access denied: Admins only", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [isLoggedIn, user]);

  if (isLoggedIn && !user) {
    return <div className="text-center py-10"><Loader /></div>;
  }

  if (isLoggedIn && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return isLoggedIn && user?.role === "admin" ? children : <Navigate to="/login" />;
};

export default AdminRoute;
