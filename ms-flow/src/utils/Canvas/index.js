import React, {useEffect} from "react";
import { useAuth } from "../../providers/AuthProvider";
import Home from "../../components/pages/Home";
import ProtectedRoute from "../ProtectedRoute";

export const Canvas = () => {
    const {authorized, signIn, signOut} = useAuth();

    return (
        <>
            <button onClick={() => signOut()}>Sign Out</button>
            <ProtectedRoute Component={Home} auth={authorized} signIn={signIn}/>
        </>
    )
};