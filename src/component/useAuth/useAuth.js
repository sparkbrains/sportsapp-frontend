import * as React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import {createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../useAuth/useLocalStorage";

const authContext = React.createContext();

export function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    // useContext(authContext),
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export const AuthProvider = ({children}) => {
    const [user, setUser ] = useLocalStorage("user, null");

    const navigate = useNavigate();

    const login = async ( data ) => {
        setUser(data);
        navigate("/sportscenterowner");
    }


    const logout = () => {
        setUser(null);
        navigate("/", {replace : true});
    };

    const value = useMemo (() => ({
        user,
        login,
        logout
    }), [user]);


    return <authContext.Provider value={value}>{children}</authContext.Provider>;

}

export function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();
  
    return authed === true ? children : <Navigate to="/sportscenterowner" replace state={{path: location.pathname}} />;
  }

// export function AuthProvider({ children }) {
//   const auth = useAuth();

//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

export default function AuthConsumer() {
  return React.useContext(authContext);
}