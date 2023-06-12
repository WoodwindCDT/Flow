import React, { useContext, useState, useEffect } from "react";
import {SET_RESET_ACTION, SET_LOGGED_ACTION} from "../actions/List_Action";
import STORE from "../store";
import { serverside } from "../site";

const AuthContext = React.createContext(null);
const INIT_USER = {};
const INIT_AUTH = false;

const AuthProvider = ({ children }) => {
    const [authorized, setAuthorized] = useState(INIT_AUTH);
    const [isAdmin, setAdmin] = useState(false);
    const [user, setUser] = useState(INIT_USER);

    useEffect(() => {
      if (!authorized) return;
    
      return () => {
        console.log("looks like a user was authorized");
      }
    }, [authorized])
   
    // user actions
    const signIn = (email, password) => {  
      const payload = {
          username: email,
          password: password
      };

      // Send the payload to the server
      fetch(`${serverside}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          if (data.user != null) {
            // Authentication succeeded
            STORE.dispatch(SET_LOGGED_ACTION(true));
            setAuthorized(true);
            setUser(data.user);
          } else {
            // Authentication failed
            console.log(data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    const signOut = () => {
        if (!authorized) {
          console.log("Not logged in, can't log out!");
          return;
        }
        console.log("Signing out of authorized user");
        STORE.dispatch(SET_LOGGED_ACTION(false));
        // STORE.dispatch(SET_RESET_ACTION("Resetting all arrays!"));
        setAuthorized(INIT_AUTH); // return to false when user logs out
        setUser(INIT_USER);
    };

    return (
        <AuthContext.Provider
          value={{
            // bools
            authorized,
            user,
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