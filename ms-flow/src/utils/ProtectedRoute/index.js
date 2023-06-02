import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const ProtectedRoute = ({Component}) => {
  const authProps = useAuth();
  return authProps.authorized ? <Component {...authProps} /> : <Navigate to="/SignIn" />
};

export default ProtectedRoute;