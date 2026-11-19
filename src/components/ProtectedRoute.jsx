import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../contexts/AuthContext";
import { ROUTES } from "../constants";
import { use } from "react";

export const ProtectedRoute = ({ children }) => {
  const { connectedUser } = use(AuthContext);
  const location = useLocation();

  if (!connectedUser) {
    return (
      <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
};
