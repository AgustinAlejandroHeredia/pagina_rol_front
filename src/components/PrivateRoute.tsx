import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading/>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};