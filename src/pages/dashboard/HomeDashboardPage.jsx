import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router";
import { ROUTES } from "../../constants";
import { use } from "react";

export const HomeDashboardPage = () => {
  const { logout } = use(AuthContext);

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      Navigate(ROUTES.AUTH.LOGIN);
    } else {
      console.log("Identifiants incorrects");
    }
  };

  return (
    <div>
      <h1>Home dashboard</h1>
      <Button onClick={handleLogout}>Se déconnecter</Button>
    </div>
  );
};
