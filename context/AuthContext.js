import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/AuthServices";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        let data = await getCurrentUser();

        if (data) {
          setIsLoggedIn(true);
          setUser(data);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default GlobalProvider;
