import { useContext, createContext, useState, useEffect } from "react";
import { serverUrl } from "../requests/apicalls";
import Loading from "../src/components/Loading";
import axios from "axios";

const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await axios.get(`${serverUrl}/twp/me`, {
      withCredentials: true,
    });

    if(res.data.user) setUser(res.data.user);
  }

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
