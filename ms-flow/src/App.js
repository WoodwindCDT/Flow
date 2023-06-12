import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './providers/AuthProvider';
import STORE from './store';

import { Canvas } from './utils/Canvas';

const App = () => {
  return (
    // Auth Provider allows the storage/access of user info
    <Provider store={STORE}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Canvas />} />
        </Routes>
      </AuthProvider>
    </Provider>
  )
};

export default App;