import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserType } from '../utils/types';
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserType) => void;
  signup: (user: UserType) => void;
  logout: () => void;
  setUser: (user: UserType | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated: auth0IsAuthenticated, logout: auth0Logout } =
    useAuth0();
  const [userState, setUserState] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(
    !!userState || auth0IsAuthenticated,
  );
  const isLoading = false;

  const login = (userData: UserType) => {
    setUserState(userData);
    setIsAuthenticated(true);
    navigate('/');
  };

  const signup = (userData: UserType) => {
    setUserState(userData);
    setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    if (auth0IsAuthenticated) {
      auth0Logout({ returnTo: window.location.origin } as LogoutOptions);
    }
    setUserState(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const setUser = (newUser: UserType | null) => {
    setUserState(newUser);
  };

  const setIsAuthenticated = (newIsAuthenticated: boolean) => {
    setIsAuthenticatedState(newIsAuthenticated);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userState,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
