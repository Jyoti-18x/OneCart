import React from "react";
import { createContext } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
  let serverUrl = "https://onecart-backend-8rg9.onrender.com";

  let value = {
    serverUrl,
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
