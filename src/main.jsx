import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { App } from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router";
import { PreviousPageTracker } from "./components/PreviousPageTracker";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <PreviousPageTracker />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
