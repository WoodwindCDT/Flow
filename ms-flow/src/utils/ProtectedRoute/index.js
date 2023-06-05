import SignIn from "../../components/SignIn";

const ProtectedRoute = ({Component, auth, signIn}) => {
  // may want to change the authProps pass here, to reduce redundancy, may change to some userProps for functions regarding their information
  return auth ? <Component /> : <SignIn signIn={signIn}/>
};

export default ProtectedRoute;