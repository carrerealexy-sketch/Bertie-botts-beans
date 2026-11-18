import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [connectedUser, setConnectedUser] = useState(null);

  const login = async (credentials) => {
    if (credentials.username === "toto" && credentials.password === "12345") {
      console.log("connected");
      setConnectedUser(credentials);
      localStorage.setItem("user", JSON.stringify(credentials));

      return true;
    }

    console.log("error de login");
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
