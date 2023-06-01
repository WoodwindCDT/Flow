import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({Component}) => {
  const auth = JSON.parse(localStorage.getItem('successSign'));

  return auth ? <Component /> : <Navigate to="/SignIn" />
};

export default ProtectedRoute;