import { AuthContext } from "../contexts/AuthContext";
import { ROUTES } from "../constants";
import { use } from "react";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const { connectedUser, logout } = use(AuthContext);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN);
  };
  return { connectedUser, handleLogout };
};
