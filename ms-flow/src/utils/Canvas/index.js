import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import Home from "../../components/pages/Home";
import ProtectedRoute from "../ProtectedRoute";
import { PINE_POST } from "../Definitions";

export const Canvas = () => {
    const {authorized, user, signIn, signOut, pine_submit} = useAuth();
    return (
        <>
            {authorized ? <button onClick={() => signOut()}>Sign Out</button> : null}
            {authorized ? <button onClick={() => pine_submit(PINE_POST, "")}>TEST PINECONE</button> : null}
            <ProtectedRoute Component={Home} info={user} auth={authorized} signIn={signIn}/>
        </>
    )
};