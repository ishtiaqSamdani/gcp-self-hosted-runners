import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SigninSignupTemplate from '../../components/templates/SigninSignupTemplate';
import SignUp from '../../components/organisms/SignUp';
import { REACT_APP_REDIRECT_URI } from '../../config/url';
import { useNavigate } from 'react-router-dom';
import { CONNECTION_TYPE, NAVIGATE_LOGIN } from '../../utils/constants';

const SignUpPage = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const onSwitchSignIn = () => {
    navigate(NAVIGATE_LOGIN);
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
      console.error('Error during authentication:', err);
    }
  };

  return (
    <SigninSignupTemplate
      element={
        <SignUp
          handleNavigateSignIn={onSwitchSignIn}
          handleAuthButtonClick={handleAuthLogin}
        />
      }
    />
  );
};

export default SignUpPage;
