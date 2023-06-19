import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import Home from "../../components/pages/Home";
import ProtectedRoute from "../ProtectedRoute";
import { PINE_POST, OPENAI_POST } from "../Definitions";

export const Canvas = () => {
    // openai_submit is temporary, will be used in the post req. for pine_submit, as I need to convert request to pref. text
    const {authorized, user, signIn, signOut, pine_submit, openai_submit} = useAuth();
    return (
        <>
            {authorized ? <button onClick={() => signOut()}>Sign Out</button> : null}
            {authorized ? <button onClick={() => pine_submit(PINE_POST, "")}>TEST PINECONE</button> : null}
            {authorized ? <button onClick={() => openai_submit(OPENAI_POST, "How many stars explode every 0.25 seconds?")}>TEST OPENAI</button> : null}
            <ProtectedRoute Component={Home} info={user} auth={authorized} signIn={signIn} c_submit={pine_submit} />
        </>
    )
};