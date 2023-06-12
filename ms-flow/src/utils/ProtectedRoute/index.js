import SignIn from "../../components/SignIn";

const ProtectedRoute = ({Component, info, auth, signIn}) => {
  return auth ? <Component info={info}/> : <SignIn signIn={signIn}/>
};

export default ProtectedRoute;