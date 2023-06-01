import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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

  const isUserSignedIn = JSON.parse(localStorage.getItem('successSign')) || localStorage.setItem('successSign', 'false');
  console.log(isUserSignedIn);

  return (
    <Routes>
      {isUserSignedIn ? (
        <>
          {/* Routes for authenticated users */}
          <Route exact path="/" element={<Home />} />
        </>
      ) : (
        <Route path="/" element={<Navigate to="/Sign-In" replace />} />
      )}
          {/* Define other routes */}
        <Route path="/Sign-In" element={<SignIn />} />
    </Routes>
  )
};

export default App;