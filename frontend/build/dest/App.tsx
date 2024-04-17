import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import { useAuth } from './contexts/AuthContext';
import SignInPage from './pages/SignInPage';
import { RampTabsContextProvider } from './contexts/RampTabsContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage ';
import { UserType } from './utils/types';
import { NAVIGATE_NEW_BILL } from './utils/constants';
import NewBillPage from './pages/NewBillPage';

const App = () => {
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuth();
  const { isAuthenticated: auth0Authenticated, user: auth0user } = useAuth0();

  useEffect(() => {
    if (auth0Authenticated) {
      setIsAuthenticated(auth0Authenticated);
      const currUser: UserType = {
        id: 100,
        name: '',
        email: '',
      };
      currUser.name = auth0user && auth0user.name ? auth0user.name : '';
      currUser.email = auth0user && auth0user.email ? auth0user.email : '';
      setUser(currUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0Authenticated]);

  if (isAuthenticated) {
    return (
      <RampTabsContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path={NAVIGATE_NEW_BILL} element={<NewBillPage />}></Route>
        </Routes>
      </RampTabsContextProvider>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
