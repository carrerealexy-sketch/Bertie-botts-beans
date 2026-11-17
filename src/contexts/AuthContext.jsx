import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const login = async (credentials) => {
    if (credentials.username === "toto" && credentials.password === "12345") {
      console.log("connected");

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
