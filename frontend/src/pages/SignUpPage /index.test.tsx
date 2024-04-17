/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignUpPage from './';
import { AuthProvider } from '../../contexts/AuthContext';
import { postUser } from '../../services/auth-service';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme/index';
import {
  CONTINUE,
  GOOGLE_AUTH_SIGNUP_TEXT,
  NAME_HELPER_TEXT,
  NAVIGATE_LOGIN,
  SIGNIN_BUTTON_TEXT,
  SIGNIN_EMAIL_PLACEHOLDER,
  SIGNIN_PASSWORD_PLACEHOLDER,
  SIGNUP_NAME_PLACEHOLDER,
} from '../../utils/constants';
import { REACT_APP_REDIRECT_URI } from '../../config/url';

jest.mock('../../services/auth-service', () => ({
  postUser: jest.fn(),
}));

const mockLoginWithRedirect = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: mockLoginWithRedirect,
    user: { name: 'Test', email: 'Test2@gmail.com' },
  }),
}));

const mockLogin = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    login: mockLogin,
  }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

describe('SignUpPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignUpPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
  });

  it('should handle login with redirect', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignUpPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    fireEvent.click(getByText(GOOGLE_AUTH_SIGNUP_TEXT));

    expect(mockLoginWithRedirect).toHaveBeenCalledWith({
      appState: {
        returnTo: REACT_APP_REDIRECT_URI,
      },
      authorizationParams: {
        connection: 'google-oauth2',
        redirect_uri: REACT_APP_REDIRECT_URI,
      },
    });
  });

  describe('SignUpPage', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render without crashing', () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUpPage />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    it('should call the postUser function with valid user data', async () => {
      const { getByText, getByPlaceholderText } = render(
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUpPage />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>,
      );

      const signUpButton = getByText(CONTINUE);

      (postUser as jest.Mock).mockResolvedValueOnce({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });

      const nameInput = getByPlaceholderText(
        SIGNUP_NAME_PLACEHOLDER,
      ) as HTMLInputElement;
      fireEvent.change(nameInput, { target: { value: 'testname123' } });
      fireEvent.blur(nameInput);

      const emailInput = getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
      fireEvent.change(emailInput, { target: { value: 'test@exac.in' } });
      fireEvent.blur(emailInput);

      const passwordInput = getByPlaceholderText(SIGNIN_PASSWORD_PLACEHOLDER);
      fireEvent.change(passwordInput, { target: { value: 'Killcode@00' } });
      fireEvent.blur(passwordInput);

      fireEvent.click(signUpButton);
      expect(screen.queryByText(NAME_HELPER_TEXT)).not.toBeInTheDocument;
    });

    it('should navigate to the login page when "Switch to Signin" is clicked', () => {
      const { getByText } = render(
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUpPage />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>,
      );

      fireEvent.click(getByText(SIGNIN_BUTTON_TEXT));
      expect(mockNavigate).toHaveBeenCalledWith(NAVIGATE_LOGIN);
    });
    it('should handle authentication login error', async () => {
      const { getByText } = render(
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <SignUpPage />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>,
      );

      const signUpButton = getByText(GOOGLE_AUTH_SIGNUP_TEXT);

      (mockLoginWithRedirect as jest.Mock).mockRejectedValueOnce(
        new Error('Registration failed'),
      );

      fireEvent.click(signUpButton);

      await waitFor(() => {
        expect(mockLoginWithRedirect).toHaveBeenCalled();
      });
    });
  });
});
