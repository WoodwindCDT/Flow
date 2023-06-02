import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const ProtectedRoute = ({Component}) => {
  const {authorized} = useAuth();
  // may want to change the authProps pass here, to reduce redundancy, may change to some userProps for functions regarding their information
  return authorized ? <Component /> : <Navigate to="/SignIn" />
};

export default ProtectedRoute;