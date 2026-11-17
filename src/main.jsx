import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { App } from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
