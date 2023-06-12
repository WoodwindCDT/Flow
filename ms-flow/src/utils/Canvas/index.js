import React, {useEffect} from "react";
import { useAuth } from "../../providers/AuthProvider";
import Home from "../../components/pages/Home";
import ProtectedRoute from "../ProtectedRoute";

export const Canvas = () => {
    const {authorized, user, signIn, signOut} = useAuth();
    return (
        <>
            {authorized ? <button onClick={() => signOut()}>Sign Out</button> : null}
            <ProtectedRoute Component={Home} info={user} auth={authorized} signIn={signIn}/>
        </>
    )
};