import React, { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './providers/AuthProvider';
import STORE from './store';

import ProtectedRoute from './utils/ProtectedRoute';
import Home from './components/pages/Home';
import SignIn from './components/SignIn';

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('https://woodwindcdt.github.io/codingPortfolio/data');
  //       if (!response.ok) {
  //         throw new Error('Network response error');
  //       }
  //       const data = await response.json();
  //       setData(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);  

  return (
    // Auth Provider allows the storage/access of user info
    <Provider store={STORE}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </Provider>
  )
};

export default App;