import React, { useContext, useState, useEffect } from "react";
import {SET_RESET, SET_LOGGED_ACTION} from "../actions/List_Action";
import STORE from "../store";
import { serverside } from "../site";

const AuthContext = React.createContext(null);
const INIT_STATE = [];
const INIT_AUTH = false;

const AuthProvider = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [user, setUser] = useState({});

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
          console.log(data)
          if (data.user != null) {
            // Authentication succeeded
            setAuthorized(true);
            STORE.dispatch(SET_LOGGED_ACTION(true));
            setUser(data.user);
            console.log(user);
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