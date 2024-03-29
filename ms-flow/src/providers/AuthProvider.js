import React, { useContext, useState, useEffect } from "react";
import * as Realm from "realm-web";
import {my_realm} from "../realmapp";
import {SET_LOGGED_ACTION} from "../actions/List_Action";
import STORE from "../store";
import { HTTPCONTEXT } from "../site";
import {PINE_POST, OPENAI_POST, PINE_GET, PINE_DELETE} from "../utils/Definitions/index";
import { serverside } from "../site";

const AuthContext = React.createContext(null);
const INIT_USER = {};
const INIT_AUTH = false;

const AuthProvider = ({ children }) => {
    const [authorized, setAuthorized] = useState(INIT_AUTH);
    const [realm_user, setRealmUser] = useState(INIT_USER);
    const [user, setUser] = useState(INIT_USER);
    const [access, setAccess] = useState(INIT_USER);

    //const [read, setRead] = useState(0); // for restricting user from frequest requests per session
    //const [write, setWrite] = useState(0);

    // can check here for the cookie :)
    useEffect(() => {
      if (!authorized) return;
    
      return () => {
        console.log("looks like a user was authorized");
      }
    }, [authorized])
   
    // user actions
    const signIn = async (email, password) => {
      try {
        const credentials = Realm.Credentials.emailPassword(email, password);
        const user = await my_realm.logIn(credentials);
        
        if (user) {
          setRealmUser(user);
          const collection = user.mongoClient("beans").db("pvz").collection("zombies");
          const user_collection = await collection.findOne({ username: email });

          // now check user belongs to the organization to apply level access def
          const accessGranted = await user.callFunction('check_user_access', user_collection.organization_id, user_collection._id)
          if (!accessGranted) {
            return false; // user belongs to no organization, should report to IT admin or Supervisor
          } else {
            setAccess({
              organization: accessGranted.organization,
              organization_id: accessGranted.organization_id,
              level_access: accessGranted.ants
            });
          };
          
          setUser(user_collection);

          STORE.dispatch(SET_LOGGED_ACTION(user.isLoggedIn));
          setAuthorized(true);
          
          // set cookie on server side
          try {
            await fetch(`${serverside}/bake-my-cookie`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Authorization': `Bearer ${user.accessToken}`,
              },
            }).then(response => response.json())
              .then(data => {
                console.log(data.message);
              })
              .catch(err => {
                console.log(err);
              });
            return true; // successful log!
          } catch (err) {
            console.log(err);
          }          
        } else {
          console.log("ERROR SIGNING IN: PASSWORD OR EMAIL INCORRECT.");
        }
      } catch (error) {
        console.log("ERROR SIGNING IN:", error.message);
      }
    };

    // const signUp = async (username, password, organization) => {      
    //   try {
    //     // Hash the password using bcrypt
    //     // const hashedPassword = await bcrypt.hash(password, 10);
        
    //     // Create a new user account using email/password authentication
    //     const credentials = Realm.Credentials.emailPassword(username, password);
    //     await my_realm.emailPasswordAuth.registerUser(credentials);
    
    //     // After successful account creation, log in the user
    //     const user = await my_realm.logIn(credentials);
    
    //     // Get the "zombies" collection in the "pvz" database
    //     const collection = user.mongoClient("beans").db("pvz").collection("zombies");
    //     const levelAccess = [
    //       Realm.BSON.ObjectId("615c8126e6a4e29a42f3e8a3")
    //     ];

    //     const zombie = {
    //       username,
    //       password: password,
    //       organization,
    //       organization_id: Realm.BSON.ObjectId("615c8126e6a4e29a42f3e8e3"), // Replace with the actual organization ID
    //       level_access: levelAccess, // An array of partition IDs
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     };
    
    //     // Insert the new zombie document into the collection
    //     await collection.insertOne(zombie);
    
    //     console.log("New zombie account created successfully!");
    //   } catch (error) {
    //     console.error("Error creating zombie account:", error);
    //   }
    // };

    // remove cookie
    const signOut = async () => {
        if (!authorized) {
          console.log("Not logged in, can't log out!");
          return;
        }
        try {
          if (realm_user) {
            await my_realm.removeUser(realm_user);
            STORE.dispatch(SET_LOGGED_ACTION(false));
            setAuthorized(INIT_AUTH); // return to false when user logs out
            setUser(INIT_USER);
            // remove cookie
            try {
              await fetch(`${serverside}/torch-my-cookie`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Authorization': `Bearer ${user.accessToken}`,
                },
              }).then(response => response.json())
                .then(data => {
                  console.log(data.message);
                })
                .catch(err => {
                  console.log(err);
              });
            } catch (err) {
              console.log(err);
            }          
          } else {
            console.log("ERROR SIGNING OUT: User not authenticated.");
          }
        } catch (error) {
          console.log("ERROR SIGNING OUT:", error.message);
      }
    };

    const pine_submit = async (action, params) => {
      switch(action) {
        case PINE_POST: // "POST"
        try {
          const response = await fetch(`${serverside}/auth/pine/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({ 
              text: params.text,
              user: user.firstname,
              organization: access.organization, // persistent storage to the user's org
              organization_id: access.organization_id, // more info on the org
              level_access: params.access // based on user's choice
            })
          });
        
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
        break;
        case PINE_GET:
          try {
            const response = await fetch(`${serverside}/auth/pine/search`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify({ 
                text: params.text,
                organization: access.organization, // persistent storage to the user's org
                organization_id: access.organization_id, // more info on the org
                level_access: params.access // based on user's choice
              })
            });
          
            if (response.ok) {
              const data = await response.json();
              return data;
            } else {
              throw new Error('Request failed with status ' + response.status);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        break;
        case PINE_DELETE:
          try {
            const response = await fetch(`${serverside}/auth/pine/delete-all`, {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`,
              }
            });
          
            if (response.ok) {
              console.log(await response.json());
            } else {
              throw new Error('Request failed with status ' + response.status);
            }
          } catch (err) {
            console.error('Error: ', err);
          }
          break;
        default:
          break;
      }
    };

    const openai_submit = async (action, params) => {
      switch(action) {
        case OPENAI_POST: // "POST"
        await fetch(`${serverside}/auth/openai/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: params })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Response:', data.response);
        })
          .catch(error => {
            console.error('Error:', error);
        });
        break;

        default:
          break;
      }
    };

    return (
        <AuthContext.Provider
          value={{
            // bools
            authorized,
            // general user info
            user,
            access,
            // functions to pass
            signIn,
            signOut,
            //signUp,
            pine_submit,
            openai_submit
          }}
        >
          {children}
        </AuthContext.Provider>
    );
};

// useAuth hook can be used by any rendered component (n) depth from AuthContext Wrmy_realmer
// think of it like DNA from some great great great great grandparent to some child from <AuthProvider>
const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth == null) {
        throw new Error("Auth context called outside of an AuthProvider!");
    }
    return auth;
};

export {AuthProvider, useAuth};