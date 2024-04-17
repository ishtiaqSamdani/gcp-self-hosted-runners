import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SignUp from '.';
import * as services from '../../../services/auth-service';
import { UserType } from '../../../utils/types';
import {
  ALREADY_HAVE_AN_ACCOUNT,
  EMAIL_HELPER_TEXT,
  FULL_NAME,
  NAME_HELPER_TEXT,
  PASSWORD_HELPER_TEXT,
  SIGNIN_EMAIL_PLACEHOLDER,
  SIGNIN_PASSWORD_PLACEHOLDER,
  SIGNUP_NAME_PLACEHOLDER,
  SIGN_UP_TEXT,
} from '../../../utils/constants';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const USER_DATA: UserType = {
  id: 1,
  name: 'Test',
  email: 'test@gmail.com',
  password: 'Test@123',
};

describe('Tests SignUp component', () => {
  it('should render Signup', () => {
    jest.spyOn(services, 'postUser').mockResolvedValue(USER_DATA);
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('sign-up')).toBeInTheDocument;
    expect(screen.getByText(SIGN_UP_TEXT)).toBeInTheDocument;
    expect(screen.getByText(FULL_NAME)).toBeInTheDocument;

    expect(screen.getByPlaceholderText(SIGNUP_NAME_PLACEHOLDER))
      .toBeInTheDocument;
    expect(screen.getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER))
      .toBeInTheDocument;
    expect(screen.getByPlaceholderText(SIGNIN_PASSWORD_PLACEHOLDER))
      .toBeInTheDocument;
    expect(screen.getByText(ALREADY_HAVE_AN_ACCOUNT)).toBeInTheDocument;

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('should handle email input change', () => {
    jest.spyOn(services, 'postUser').mockResolvedValue(USER_DATA);
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );
    const emailInput = screen.getByPlaceholderText(
      SIGNIN_EMAIL_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password input change', () => {
    jest.spyOn(services, 'postUser').mockResolvedValue(USER_DATA);
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );
    const passwordInput = screen.getByPlaceholderText(
      SIGNIN_PASSWORD_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput.value).toBe('testPassword');
  });

  it('should handle name change', () => {
    jest.spyOn(services, 'postUser').mockResolvedValue(USER_DATA);
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );
    const nameInput = screen.getByPlaceholderText(
      SIGNUP_NAME_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'testname' } });
    expect(nameInput.value).toBe('testname');
  });

  it('should handle password visibility', () => {
    jest.spyOn(services, 'postUser').mockResolvedValue(USER_DATA);
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    const passwordInput = screen.getByPlaceholderText(
      SIGNIN_PASSWORD_PLACEHOLDER,
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe('password');
    const eyeIcon = screen.getByTestId('password-visibility-icon');
    fireEvent.click(eyeIcon);

    expect(passwordInput.type).toBe('text');
  });

  it('should handle continue button', () => {
    jest.spyOn(services, 'postUser').mockResolvedValue(USER_DATA);
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    const continueButton = screen.getAllByRole('button')[0];
    expect(continueButton).toBeDisabled;

    const nameInput = screen.getByPlaceholderText(
      SIGNUP_NAME_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'testname' } });

    const emailInput = screen.getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInput = screen.getByPlaceholderText(
      SIGNIN_PASSWORD_PLACEHOLDER,
    );
    fireEvent.change(passwordInput, { target: { value: 'testPassword!123' } });

    expect(continueButton).toBeEnabled;

    fireEvent.click(continueButton);

    expect(services.postUser).toHaveBeenCalled;
  });

  it('should handle continue button click with error', async () => {
    jest
      .spyOn(services, 'postUser')
      .mockRejectedValue(new Error('User already exists'));
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    const continueButton = screen.getAllByRole('button')[0];

    const nameInput = screen.getByPlaceholderText(
      SIGNUP_NAME_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'testname123' } });
    fireEvent.blur(nameInput);
    expect(screen.getByText(NAME_HELPER_TEXT)).toBeInTheDocument;

    fireEvent.change(nameInput, { target: { value: 'testname' } });
    fireEvent.blur(nameInput);

    const emailInput = screen.getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
    fireEvent.change(emailInput, { target: { value: 'test@exa' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(EMAIL_HELPER_TEXT)).toBeInTheDocument;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);

    const passwordInput = screen.getByPlaceholderText(
      SIGNIN_PASSWORD_PLACEHOLDER,
    );
    fireEvent.change(passwordInput, { target: { value: 'testPassw' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(PASSWORD_HELPER_TEXT)).toBeInTheDocument;

    fireEvent.change(passwordInput, { target: { value: 'testPassword!123' } });
    fireEvent.blur(passwordInput);

    await act(() => {
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Error: User already exists')).toBeInTheDocument;
    });
  });

  it('should handle error messages for name, email and password', async () => {
    const handleAuthButtonClick = jest.fn();
    const handleNavigateSignInClick = jest.fn();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUp
            handleNavigateSignIn={handleNavigateSignInClick}
            handleAuthButtonClick={handleAuthButtonClick}
          />
        </AuthProvider>
      </BrowserRouter>,
    );
    const nameInput = screen.getByPlaceholderText(
      SIGNUP_NAME_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'testname123' } });
    fireEvent.blur(nameInput);
    expect(screen.getByText(NAME_HELPER_TEXT)).toBeInTheDocument;

    const emailInput = screen.getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
    fireEvent.change(emailInput, { target: { value: 'test@exa' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(EMAIL_HELPER_TEXT)).toBeInTheDocument;

    const passwordInput = screen.getByPlaceholderText(
      SIGNIN_PASSWORD_PLACEHOLDER,
    );
    fireEvent.change(passwordInput, { target: { value: 'testPassw' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(PASSWORD_HELPER_TEXT)).toBeInTheDocument;
  });
});
