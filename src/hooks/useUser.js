// useRoles context
import { createContext, useContext, useState } from "react";
import { endpoints } from "./../services/endpoints";
import axios from "axios";


const userInitialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const UserContext = createContext({});

export const ProviderUser = ({ children }) => {
  const user = useProviderUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

const useProviderUser = () => {
  const [user, setUser] = useState(userInitialState);

  const setUserToken = (token) => {
    setUser((prevState) => ({
      ...prevState,
      token,
    }));
  };

  const setUserdata = (user) => {
    setUser((prevState) => ({
      ...prevState,
      user,
    }));
  };

  const setLoading = (loading) => {
    setUser((prevState) => ({
      ...prevState,
      loading,
    }));
  };

  const setError = (error) => {
    setUser((prevState) => ({
      ...prevState,
      error,
    }));
  };

  const fetchAuthSignin = (body) => {
    const api = endpoints.auth();
    return new Promise((resolve, reject) => {
      axios
        .post(api, body, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    user,
    setUserToken,
    setUserdata,
    setLoading,
    setError,
    fetchAuthSignin,
  };
};
