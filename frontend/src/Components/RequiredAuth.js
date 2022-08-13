import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/auth";

const RequiredAuth = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default RequiredAuth;
