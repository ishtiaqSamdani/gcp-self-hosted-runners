import { useEffect, useState } from 'react';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  EMAIL_HELPER_TEXT,
  PASSWORD_HELPER_TEXT,
} from '../../../utils/constants';
import { validateInput } from '../../../utils/functins';

const useSignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [staySignedIn, setStaySignedIn] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [disableContinueButton, setDisableContinueButton] =
    useState<boolean>(true);

  useEffect(() => {
    validateFields();
  }, [emailTouched, passwordTouched, passwordErrorMessage, emailErrorMessage]);

  const validateEmail = (value: string) => {
    setEmailTouched(true);
    const isValid = EMAIL_REGEX.test(value);
    setIsEmailValid(isValid);
    setEmailErrorMessage(isValid ? '' : EMAIL_HELPER_TEXT);
  };

  const validatePassword = (value: string) => {
    setPasswordTouched(true);
    const isValid = validateInput(value, PASSWORD_REGEX);
    setIsPasswordValid(isValid);
    setPasswordErrorMessage(isValid ? '' : PASSWORD_HELPER_TEXT);
  };

  const validateFields = () => {
    const hasErrors = emailErrorMessage !== '' || passwordErrorMessage !== '';
    if (email !== '' && password !== '') {
      setDisableContinueButton(hasErrors);
    } else {
      setDisableContinueButton(true);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    setIsEmailValid,
    isPasswordValid,
    setIsPasswordValid,
    staySignedIn,
    setStaySignedIn,
    passwordVisible,
    setPasswordVisible,
    emailErrorMessage,
    passwordErrorMessage,
    validateEmail,
    validatePassword,
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    disableContinueButton,
  };
};

export default useSignIn;
