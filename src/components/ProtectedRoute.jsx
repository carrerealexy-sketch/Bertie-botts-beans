import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import { ROUTES } from "../constants";
import { use } from "react";

export const ProtectedRoute = ({ children }) => {
  const { connectedUser } = use(AuthContext);

  if (!connectedUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} />;
  }

  return children;
};
