import SignIn from "../../components/SignIn";

const ProtectedRoute = ({Component, info, access, auth, signIn, signOut, c_submit}) => {
  return auth ? <Component info={info} funk={c_submit} access={access} end_session={signOut}/> : <SignIn signIn={signIn}/>
};

export default ProtectedRoute;