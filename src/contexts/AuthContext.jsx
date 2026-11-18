import { createContext, useEffect, useState } from "react";
import { register, login as signin } from "../services/auth-service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    if (connectedUser) {
      localStorage.setItem("user", JSON.stringify(connectedUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [connectedUser]);

  const login = async (credentials) => {
    try {
      const user = await signin(credentials);

      if (!user) return false;

      setConnectedUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const user = await register(userData);

      const { ...userWithoutPassword } = user;

      setConnectedUser(userWithoutPassword);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      setConnectedUser(null);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        connectedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
