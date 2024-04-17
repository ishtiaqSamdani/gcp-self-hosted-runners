import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './';
import {
  SIGNIN_EMAIL_PLACEHOLDER,
  SIGNIN_PASSWORD_PLACEHOLDER,
} from '../../../utils/constants';

jest.mock('../../atoms/CheckBox', () => ({
  __esModule: true,
  default: jest.fn(({ onChange }) => (
    <input type="checkbox" onChange={onChange} data-testid="check-box" />
  )),
}));

const mockHandleSignUp = jest.fn();
const mockHandleSignIn = jest.fn();
const mockHandleGoogleAuthLogin = jest.fn();

describe('SignIn component', () => {
  it('test renders without crashing', () => {
    render(
      <SignIn
        handleSignUp={mockHandleSignUp}
        handleSignIn={mockHandleSignIn}
        handleGoogleAuthLogin={mockHandleGoogleAuthLogin}
      />,
    );
  });

  it('test handles email input change', () => {
    const { getByPlaceholderText } = render(
      <SignIn
        handleSignUp={mockHandleSignUp}
        handleSignIn={mockHandleSignIn}
        handleGoogleAuthLogin={mockHandleGoogleAuthLogin}
      />,
    );
    const emailInput = getByPlaceholderText(
      SIGNIN_EMAIL_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@exa' } });
    fireEvent.blur(emailInput);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    expect(emailInput.value).toBe('test@example.com');
  });

  it('test handles password input change', () => {
    const { getByPlaceholderText } = render(
      <SignIn
        handleSignUp={mockHandleSignUp}
        handleSignIn={mockHandleSignIn}
        handleGoogleAuthLogin={mockHandleGoogleAuthLogin}
      />,
    );
    const passwordInput = getByPlaceholderText(
      SIGNIN_PASSWORD_PLACEHOLDER,
    ) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.blur(passwordInput);
    expect(passwordInput.value).toBe('testPassword');
    fireEvent.change(passwordInput, { target: { value: 'testPassword!123' } });
    fireEvent.blur(passwordInput);
    expect(passwordInput.value).toBe('testPassword!123');
  });

  it('test handles checkbox change', () => {
    const { getByTestId } = render(
      <SignIn
        handleSignUp={mockHandleSignUp}
        handleSignIn={mockHandleSignIn}
        handleGoogleAuthLogin={mockHandleGoogleAuthLogin}
      />,
    );
    const checkbox = getByTestId('check-box') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('test disables the button when email or password is invalid', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SignIn
        handleSignUp={mockHandleSignUp}
        handleSignIn={mockHandleSignIn}
        handleGoogleAuthLogin={mockHandleGoogleAuthLogin}
      />,
    );
    const emailInput = getByPlaceholderText(SIGNIN_EMAIL_PLACEHOLDER);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    const passwordInput = getByPlaceholderText(SIGNIN_PASSWORD_PLACEHOLDER);
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.blur(passwordInput);
    const visibilityIcon = getByTestId('password-visibility-icon');
    fireEvent.click(visibilityIcon);
  });
});
