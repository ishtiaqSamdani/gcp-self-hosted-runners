import React from 'react';
import { styled } from '@mui/material';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  ALREADY_HAVE_AN_ACCOUNT,
  EMAIL_ID,
  FULL_NAME,
  GOOGLE_AUTH_SIGNUP_TEXT,
  OR,
  PASSWORD,
  RAMP,
  SIGNIN,
  SIGNIN_BUTTON_TEXT,
  SIGNIN_EMAIL_PLACEHOLDER,
  SIGNIN_PASSWORD_PLACEHOLDER,
  SIGNUP_NAME_PLACEHOLDER,
  SIGN_UP_TEXT,
} from '../../../utils/constants';
import Button from '../../atoms/Button';
import TextField from '../../atoms/Textfield';
import Auth0Button from '../../molecules/Auth0Button';
import useSignUp from './hooks';
import {
  WrapperContainer,
  MainContainer,
  InputFieldContainer,
  SubContainer,
  PasswordVisibilityIconStyles,
  ButtonsContainer,
  ActionContainer,
} from '../SignIn';

interface ISignUpProps {
  handleNavigateSignIn: () => void;
  handleAuthButtonClick: () => void;
}

const StyledHeadText = styled(Typography)({
  marginBottom: '1.5625rem',
  marginLeft: '1.25rem',
});

const StyledTextField = styled(TextField)({
  width: '20.875rem',
  height: '2.75rem',
  borderRadius: '.5rem',
});

const StyledSignInButton = styled(Button)({
  paddingLeft: '0px',
  border: 'none',
  paddingBottom: '2px',
});

const StyledButtonsContainer = styled(ButtonsContainer)({
  marginTop: '.4rem',
});

const SignUp = ({
  handleNavigateSignIn,
  handleAuthButtonClick,
}: ISignUpProps) => {
  const {
    signUpData,
    errorMessages,
    handleTextFieldsChange,
    passwordVisible,
    handleEyeIconClick,
    handleContinueButtonClick,
    validateEmail,
    validateName,
    validatePassword,
    disableContinueButton,
  } = useSignUp();

  const { emailInput, password, name } = signUpData;
  const {
    emailErrorMessage,
    nameErrorMessage,
    passwordErrorMessage,
    otherErrorMessage,
  } = errorMessages;

  return (
    <WrapperContainer data-testid="sign-up">
      <StyledHeadText color={theme.palette.highEmphasis.main} variant={'h1'}>
        {RAMP}
      </StyledHeadText>
      {otherErrorMessage && (
        <Typography variant={'caption1'} color={theme.palette.error.light}>
          {otherErrorMessage}
        </Typography>
      )}
      <MainContainer>
        <Typography color={theme.palette.highEmphasis.main} variant={'h2'}>
          {SIGN_UP_TEXT}
        </Typography>
        <InputFieldContainer>
          <Typography
            color={theme.palette.mediumEmphasis.main}
            variant={'body2'}
          >
            {FULL_NAME}
          </Typography>
          <StyledTextField
            variant={'outlined'}
            placeholder={SIGNUP_NAME_PLACEHOLDER}
            name={'name'}
            onChange={handleTextFieldsChange}
            value={name}
            error={!!nameErrorMessage}
            helperText={nameErrorMessage}
            onBlur={validateName}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Typography
            color={theme.palette.mediumEmphasis.main}
            variant={'body2'}
          >
            {EMAIL_ID}
          </Typography>
          <TextField
            variant={'outlined'}
            name={'emailInput'}
            placeholder={SIGNIN_EMAIL_PLACEHOLDER}
            onChange={handleTextFieldsChange}
            value={emailInput}
            error={!!emailErrorMessage}
            helperText={emailErrorMessage}
            onBlur={validateEmail}
          />
        </InputFieldContainer>
        <SubContainer>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {PASSWORD}
            </Typography>
            <TextField
              variant={'outlined'}
              placeholder={SIGNIN_PASSWORD_PLACEHOLDER}
              name={'password'}
              onChange={handleTextFieldsChange}
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              error={!!passwordErrorMessage}
              helperText={passwordErrorMessage}
              onBlur={validatePassword}
              iconEnd={
                passwordVisible ? (
                  <VisibilityIcon
                    onClick={handleEyeIconClick}
                    style={PasswordVisibilityIconStyles}
                  />
                ) : (
                  <VisibilityOffIcon
                    data-testid={'password-visibility-icon'}
                    onClick={handleEyeIconClick}
                    style={PasswordVisibilityIconStyles}
                  />
                )
              }
            />
          </InputFieldContainer>
        </SubContainer>
        <StyledButtonsContainer>
          <Button
            backgroundColor={theme.palette.primary[500]}
            width={'20.875rem'}
            labelColor={theme.palette.white.main}
            label={SIGNIN}
            variant={'text'}
            disabled={disableContinueButton}
            onClick={handleContinueButtonClick}
          />
          <Typography
            color={theme.palette.lowEmphasis.main}
            variant={'caption2'}
          >
            {OR}
          </Typography>
          <Auth0Button
            buttonText={GOOGLE_AUTH_SIGNUP_TEXT}
            onClick={handleAuthButtonClick}
          />
        </StyledButtonsContainer>
      </MainContainer>
      <ActionContainer>
        <Typography color={theme.palette.lowEmphasis.main} variant={'body2'}>
          {ALREADY_HAVE_AN_ACCOUNT}
        </Typography>
        <StyledSignInButton
          backgroundColor={'white'}
          labelColor={theme.palette.primary[500]}
          label={SIGNIN_BUTTON_TEXT}
          variant={'text'}
          onClick={handleNavigateSignIn}
        />
      </ActionContainer>
    </WrapperContainer>
  );
};

export default React.memo(SignUp);
