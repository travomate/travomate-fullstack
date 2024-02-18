import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import Client from "../api/Client";
 
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  

  // function to be called inside useEffect every time app is opened or refreshed

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          const res = await Client.get('/users/user/details', {
            headers: {
              Authorization: `JWT ${token}`,
            },
          });
          if (res.data.success) {

            setProfile(res.data.Profile);
            setIsLoggedIn(true);
          } else {
            setProfile({});
            setIsLoggedIn(false);
          }
        } else {
          setProfile({});
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // You might want to handle the error here, e.g., set a default profile or log out the user.
      }
    };

    fetchUser();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
