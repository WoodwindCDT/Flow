import SignIn from "../../components/SignIn";

const ProtectedRoute = ({Component, info, access, auth, signIn, c_submit}) => {
  return auth ? <Component info={info} funk={c_submit} access={access}/> : <SignIn signIn={signIn}/>
};

export default ProtectedRoute;