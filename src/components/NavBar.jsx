import "./NavBar.css";

import { Link, useNavigate } from "react-router";
import { LogIn, LogOut } from "lucide-react";

import { AuthContext } from "../contexts/AuthContext";
import { ROUTES } from "../constants";
import { use } from "react";

function NavBar() {
  const navigate = useNavigate();
  const { connectedUser, logout } = use(AuthContext);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.SIGNIN);
  };

  return (
    <nav className="navbar navbar-expand site-navbar flex justify-between">
      <div className="site-navbar-brand">
        <img
          src="https://ih1.redbubble.net/image.2091716728.5254/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
          alt="Logo Bertie Bott"
          className="navbar-logo"
        />
        <h1 className="navbar-title">Wizard Wheezes</h1>
      </div>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/beans">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/beans">
              Vendeur
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/beans">
              Histoire
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/beans">
              A propos
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        {connectedUser ? (
          <button
            type="button"
            className="navbar-auth-button"
            onClick={handleLogout}
            aria-label="Se déconnecter"
            title="Se déconnecter"
          >
            <LogOut className="text-white" size={22} />
          </button>
        ) : (
          <Link
            to={ROUTES.SIGNIN}
            className="navbar-auth-button"
            aria-label="Se connecter"
            title="Se connecter"
          >
            <LogIn className="text-white" size={22} />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
