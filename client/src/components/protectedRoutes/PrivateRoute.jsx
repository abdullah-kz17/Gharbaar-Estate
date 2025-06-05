import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // Optionally show a loading spinner
    return <div className="text-center mt-10">Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
