import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  // If `children` is passed, render it (old style)
  // If not, render <Outlet /> (for nested private routes)
  return isAuthenticated
    ?  <Outlet /> : <Navigate to="/login" replace />;
}
