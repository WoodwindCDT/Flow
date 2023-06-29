import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import Home from "../../components/pages/Home";
import ProtectedRoute from "../ProtectedRoute";
import { OPENAI_POST, PINE_DELETE } from "../Definitions";

export const Canvas = () => {
    // openai_submit is temporary, will be used in the post req. for pine_submit, as I need to convert request to pref. text
    const {authorized, user, access, signIn, signOut, pine_submit, openai_submit} = useAuth();
    return (
        <div>
            {/* {authorized ? <button onClick={() => pine_submit(PINE_DELETE, "")}>DEL. VEC. Pinecone</button> : null} */}
            {/* {authorized ? <button onClick={() => openai_submit(OPENAI_POST, "How many stars explode every 0.25 seconds?")}>TEST OPENAI</button> : null} */}
            <ProtectedRoute Component={Home} info={user} auth={authorized} signIn={signIn} signOut={signOut} c_submit={pine_submit} access={access}/>
        </div>
    )
};