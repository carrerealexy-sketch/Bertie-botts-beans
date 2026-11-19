import { useEffect } from "react";
import { useLocation } from "react-router";

export const PreviousPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      sessionStorage.setItem("previousPage", location.pathname);
    }
  }, [location.pathname]);

  return null;
};
