import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// importing canvas parts
import C1 from '../../C1';
import { useAuth } from '../../../providers/AuthProvider';

export default function Home() {

  const {authorized, signIn} = useAuth();

  return authorized ? <C1 /> : <Navigate to="/SignIn" state={signIn}/>
};