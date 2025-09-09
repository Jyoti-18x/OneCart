import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();
function UserContext({ children }) {
  let [userData, setUserData] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = useCallback(async () => {
    if (!serverUrl || isLoading) return;
    
    try {
      setIsLoading(true);
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });

      setUserData(result.data);
      console.log("User data loaded:", result.data);
    } catch (error) {
      // Handle authentication errors silently
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // User not authenticated - set to null silently
        setUserData(null);
      } else {
        // Log other errors
        console.log("Error fetching user data:", error);
        setUserData(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [serverUrl, isLoading]);

  // Remove the automatic useEffect - only call when explicitly needed
   useEffect(() => {
    getCurrentUser();
   }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
    isLoading,
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;