import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { UserType } from '../utils/types';
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import api from '../api';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserType) => void;
  signup: (user: UserType) => void;
  logout: () => void;
  setUser: (user: UserType | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  userState: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated: auth0IsAuthenticated, logout: auth0Logout } =
    useAuth0();
  const [userState, setUserState] = useState<UserType | null>(() => {
    const storedUser = secureLocalStorage.getItem('user') as string;
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    return !!userState || auth0IsAuthenticated;
  });
  const isLoading = false;

  useEffect(() => {
    api.defaults.headers.common['Authorization'] =
      `Bearer ${window.localStorage.getItem('accessToken')}`;
    secureLocalStorage.setItem('user', JSON.stringify(userState));
  }, [userState]);

  const login = (userData: UserType) => {
    console.log(userData);
    setUserState(userData);
    setIsAuthenticated(true);
    navigate('/');
  };

  const signup = (userData: UserType) => {
    setUserState(userData);
    // setIsAuthenticated(true);
    navigate('/');
  };

  const logout = () => {
    if (auth0IsAuthenticated) {
      auth0Logout({ returnTo: window.location.origin } as LogoutOptions);
    }
    setUserState(null);
    setIsAuthenticated(false);
    secureLocalStorage.removeItem('user'); // Remove user data from secure local storage
    navigate('/');
    window.localStorage.setItem('accessToken', '');
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
        userState,
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
