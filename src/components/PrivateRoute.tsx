import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Cargando...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};