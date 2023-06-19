import SignIn from "../../components/SignIn";

const ProtectedRoute = ({Component, info, auth, signIn, c_submit}) => {
  return auth ? <Component info={info} funk={c_submit} /> : <SignIn signIn={signIn}/>
};

export default ProtectedRoute;