import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({Component, authorized}) => {
  // may want to change the authProps pass here, to reduce redundancy, may change to some userProps for functions regarding their information
  return authorized ? <Component /> : <Navigate to="/SignIn" />
};

export default ProtectedRoute;