import SignIn from "../../components/SignIn";

const ProtectedRoute = ({Component, info, auth, signIn, c2_submit}) => {
  return auth ? <Component info={info} funk={c2_submit} /> : <SignIn signIn={signIn}/>
};

export default ProtectedRoute;