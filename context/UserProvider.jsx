import { useContext, createContext, useState, useEffect } from "react";
import { fetchWebtoons } from "../requests/apicalls";

const userContext = createContext();

export const useUserContext = () => useContext(userContext);


export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState([]);
    const [webtoons, setWebtoons] = useState([]);
    const [episodes, setEpisodes] = useState([]);


    useEffect(() => {
        const loadWebtoons = async () => {
            let res = await fetchWebtoons();
            if(!res){
              setIsLoading(false);
              return;
            }
            console.log(res);
            const { episodes, toonz, user } = res;
        
            setUser(user);
            setWebtoons(toonz);
            setEpisodes(episodes);
            setIsLoading(false);
          };
        
          
          loadWebtoons();
    }, [])

    // if (isLoading) {
    //     return <div className="flex justify-center items-center h-screen">Fetching webtoons </div>;
    //   }
    

    return (
        <userContext.Provider
        value={{
            user,
            setUser,
            isLoading,
            setIsLoading,
            error,
            setError,
            token,
            setToken,
            webtoons,
            setWebtoons,
            episodes,
            setEpisodes
        }}
    >
        {children}
    </userContext.Provider>
    )

}