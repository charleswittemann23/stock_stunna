import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? children : <Navigate to="/login" />;
}