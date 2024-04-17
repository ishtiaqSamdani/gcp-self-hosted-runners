/* eslint-disable react/jsx-no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import theme from './theme';
import {
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_DOMAIN,
} from './config/url';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={REACT_APP_AUTH0_DOMAIN}
        clientId={REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
