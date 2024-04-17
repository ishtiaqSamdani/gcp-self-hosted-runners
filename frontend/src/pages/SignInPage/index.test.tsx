import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '.';
import { AuthProvider } from '../../contexts/AuthContext';
import { loginUser } from '../../services/auth-service';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme/index';
import {
  SIGNIN_EMAIL_PLACEHOLDER,
  FORGOT_PASSWORD_TEXT,
  NAVIGATE_SIGNUP,
  SIGNIN_PASSWORD_PLACEHOLDER,
  SIGNIN,
  SIGNUP,
  GOOGLE_AUTH_SIGNIN_TEXT,
} from '../../utils/constants';

jest.mock('../../services/auth-service', () => ({
  loginUser: jest.fn(),
  getUserByEmail: jest.fn(),
}));

const mockLoginWithRedirect = jest.fn();
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: mockLoginWithRedirect,
    user: { name: 'Test User', email: 'test@example.com' },
  }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

const mockLogin = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe('SigninPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
  });

  it('should call the login function with valid user data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const emailInput = getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
    const passwordInput = getByPlaceholderText(SIGNIN_PASSWORD_PLACEHOLDER);
    const loginButton = getByText(SIGNIN);

    const mockUserData = {
      email: 'test@example.com',
      password: 'Pas$w0rd',
    };

    fireEvent.change(emailInput, { target: { value: mockUserData.email } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, {
      target: { value: mockUserData.password },
    });
    fireEvent.blur(passwordInput);

    (loginUser as jest.Mock).mockResolvedValueOnce(mockUserData);

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(
        mockUserData.email,
        mockUserData.password,
      );
    });
    expect(mockLogin).toHaveBeenCalledWith(mockUserData);
  });

  it('should handle errors when calling the login function', async () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const emailInput = getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
    const passwordInput = getByPlaceholderText(SIGNIN_PASSWORD_PLACEHOLDER);
    const loginButton = getByText(SIGNIN);

    const mockUserData = {
      email: 'test@example.com',
      password: 'Pas$w0rd@123',
    };

    fireEvent.change(emailInput, { target: { value: mockUserData.email } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, {
      target: { value: mockUserData.password },
    });
    fireEvent.blur(passwordInput);

    (loginUser as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(
        mockUserData.email,
        mockUserData.password,
      );
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  it('should navigate to the signup page when "Switch to Signup" is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    fireEvent.click(getByText(SIGNUP));
    expect(mockNavigate).toHaveBeenCalledWith(NAVIGATE_SIGNUP);
  });

  it('should handle "Forgot Password" button click (optional)', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    fireEvent.click(getByText(FORGOT_PASSWORD_TEXT));
  });
  it('should handle authentication login properly', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const googleAuthButton = getByText('Sign in with Google');

    fireEvent.click(googleAuthButton);
    expect(googleAuthButton).toBeInTheDocument();
  });
  it('should handle authentication login error', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const signUpButton = getByText(GOOGLE_AUTH_SIGNIN_TEXT);

    (mockLoginWithRedirect as jest.Mock).mockRejectedValueOnce(
      new Error('Registration failed'),
    );

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(mockLoginWithRedirect).toHaveBeenCalled();
    });
  });
});
