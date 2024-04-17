import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SigninSignupTemplate from '../../components/templates/SigninSignupTemplate';
import SignIn from '../../components/organisms/SignIn';
import { useAuth } from '../../contexts/AuthContext';
import { UserType } from '../../utils/types';
import { CONNECTION_TYPE, NAVIGATE_SIGNUP } from '../../utils/constants';
import {
  getUserByEmail,
  loginUser,
  postUser,
} from '../../services/auth-service';
import { REACT_APP_REDIRECT_URI } from '../../config/url';

const SignInPage = () => {
  const navigate = useNavigate();

  const { login, signup } = useAuth();
  const { loginWithRedirect, user: auth0user, isAuthenticated } = useAuth0();

  useEffect(() => {
    handleAuthSignUpAndLogin(auth0user?.name ?? '', auth0user?.email ?? '');
  }, [isAuthenticated]);

  const handleAuthSignUpAndLogin = async (name: string, email: string) => {
    if (email) {
      try {
        const currUser: boolean = await getUserByEmail(email);
        if (currUser) {
          handleLogin(email, '');
        } else {
          const newUser: UserType = await postUser(name ?? '', email, '');
          signup(newUser);
          handleLogin(email, '');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    if (email !== undefined && password !== undefined) {
      try {
        const userData: UserType | undefined = await loginUser(email, password);
        if (userData) {
          login(userData);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const onSwitchSignup = () => {
    navigate(NAVIGATE_SIGNUP);
  };

  const handleAuthLogin = async () => {
    try {
      const redirectUri = REACT_APP_REDIRECT_URI;
      await loginWithRedirect({
        appState: {
          returnTo: redirectUri,
        },
        authorizationParams: {
          connection: CONNECTION_TYPE,
          redirect_uri: redirectUri,
        },
      });
    } catch (err) {
      alert('Error during authentication: ' + err);
    }
  };

  return (
    <SigninSignupTemplate
      element={
        <SignIn
          handleSignUp={onSwitchSignup}
          handleSignIn={handleLogin}
          handleGoogleAuthLogin={handleAuthLogin}
        />
      }
    />
  );
};

export default SignInPage;
