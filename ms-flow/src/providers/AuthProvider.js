import React, { useContext, useState, useEffect } from "react";
import {SET_RESET, SET_LOGGED_ACTION} from "../actions/List_Action";
import STORE from "../store";

const AuthContext = React.createContext(null);
const INIT_STATE = [];
const INIT_AUTH = false;

const AuthProvider = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!authorized) return;
    
      return () => {
        console.log("looks like a user was authorized");
      }
    }, [authorized])
   
    // user actions
    const signIn = (email, password) => {

        const payload = {
            inputEmail: email,
            inputPassword: password
        };
        
        // payload for input to server
        console.log("User email & password: "+ payload.inputEmail + " & "+ payload.inputPassword);
        setAuthorized(true);
        STORE.dispatch(SET_LOGGED_ACTION(true));
    };

    const signOut = () => {
        if (!authorized) {
          console.log("Not logged in, can't log out!");
          return;
        }
        STORE.dispatch(SET_RESET("Resetting all arrays!"));
        setAuthorized(INIT_AUTH); // return to false when user logs out
    };

    return (
        <AuthContext.Provider
          value={{
            // bools
            authorized,
            // functions to pass
            signIn,
            signOut,
          }}
        >
          {children}
        </AuthContext.Provider>
    );
};

// useAuth hook can be used by any rendered component (n) depth from AuthContext Wrapper
// think of it like DNA from some great great great great grandparent to some child from <AuthProvider>
const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth == null) {
        throw new Error("Auth context called outside of an AuthProvider!");
    }
    return auth;
};

export {AuthProvider, useAuth};