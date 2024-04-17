import { useCallback, useEffect, useState } from 'react';
import {
  SignUpDataType,
  SignUpErrorsType,
  UserType,
} from '../../../utils/types';
import { validateInput } from '../../../utils/functions';
import {
  EMAIL_HELPER_TEXT,
  EMAIL_REGEX,
  NAME_HELPER_TEXT,
  NAME_REGEX,
  PASSWORD_HELPER_TEXT,
  PASSWORD_REGEX,
} from '../../../utils/constants';
import { postUser } from '../../../services/auth-service';
import { useAuth } from '../../../contexts/AuthContext';

const useSignUp = () => {
  const { signup } = useAuth();

  const [signUpData, setSignUpData] = useState<SignUpDataType>({
    name: '',
    emailInput: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState<SignUpErrorsType>({
    nameErrorMessage: '',
    emailErrorMessage: '',
    passwordErrorMessage: '',
    otherErrorMessage: '',
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [disableContinueButton, setDisableContinueButton] =
    useState<boolean>(true);

  useEffect(() => {
    validateFields();
  }, [errorMessages]);

  const validateName = () => {
    const isValidName = validateInput(signUpData.name, NAME_REGEX);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      nameErrorMessage: !isValidName ? NAME_HELPER_TEXT : '',
    }));
  };

  const validateEmail = () => {
    const isValidEmail = validateInput(signUpData.emailInput, EMAIL_REGEX);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      emailErrorMessage: !isValidEmail ? EMAIL_HELPER_TEXT : '',
    }));
    return isValidEmail;
  };

  const validatePassword = () => {
    const isValidPassword = validateInput(signUpData.password, PASSWORD_REGEX);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      passwordErrorMessage: !isValidPassword ? PASSWORD_HELPER_TEXT : '',
    }));
    return isValidPassword;
  };

  const handleTextFieldsChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setSignUpData((prevSignupData) => ({
      ...prevSignupData,
      [name]: value,
    }));
  };

  const handleEyeIconClick = useCallback(() => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  }, []);

  const handleContinueButtonClick = useCallback(() => {
    handleSignupClick(
      signUpData.name,
      signUpData.emailInput,
      signUpData.password,
    );
  }, [signUpData]);

  const validateFields = () => {
    const hasErrors =
      errorMessages.nameErrorMessage !== '' ||
      errorMessages.emailErrorMessage !== '' ||
      errorMessages.passwordErrorMessage !== '';
    if (
      signUpData.name !== '' &&
      signUpData.emailInput !== '' &&
      signUpData.password !== ''
    ) {
      setDisableContinueButton(hasErrors);
    } else {
      setDisableContinueButton(true);
    }
  };

  const handleSignupClick = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      const signedUpUserData = (await postUser(
        name,
        email,
        password,
      )) as UserType;
      signup(signedUpUserData);
    } catch (error) {
      const errorMessage = String(error);
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        otherErrorMessage: errorMessage,
      }));
    }
  };

  return {
    signUpData,
    errorMessages,
    passwordVisible,
    handleTextFieldsChange,
    handleEyeIconClick,
    handleContinueButtonClick,
    validateEmail,
    validatePassword,
    validateName,
    disableContinueButton,
  };
};

export default useSignUp;
