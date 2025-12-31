import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Logout() {
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return <Navigate to="/login" replace />;
}

export default Logout;