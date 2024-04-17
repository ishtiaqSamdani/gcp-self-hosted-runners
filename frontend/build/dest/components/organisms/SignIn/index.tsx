import React from 'react';
import { Box, styled } from '@mui/material';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  CHECKBOX_LABEL,
  EMAIL,
  FORGOT_PASSWORD_TEXT,
  GOOGLE_AUTH_SIGNIN_TEXT,
  OR,
  PASSWORD,
  RAMP,
  SIGNIN,
  SIGNIN_EMAIL_PLACEHOLDER,
  SIGNIN_INNER_HEAD,
  SIGNIN_PASSWORD_PLACEHOLDER,
  SIGNUP,
  SIGNUP_PRE_TEXT,
} from '../../../utils/constants';
import Button from '../../atoms/Button';
import TextField from '../../atoms/Textfield';
import CheckBox from '../../atoms/CheckBox';
import Auth0Button from '../../molecules/Auth0Button';
import useSignIn from './hook';

interface SignInProps {
  handleSignUp: () => void;
  handleSignIn: (email: string, password: string) => void;
  handleGoogleAuthLogin: () => void;
}

export const MainContainer = styled(Box)({
  width: '29.375rem',
  flexShrink: 0,
  borderRadius: '0.25rem',
  backgroundColor: theme.palette.white.main,
  boxShadow: `0px 0px 8px 0px ${theme.palette.boxShadowCard.main}`,
  padding: '2.75rem 4.25rem ',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const WrapperContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9375rem',
});

export const StyledHeadText = styled(Typography)({
  marginBottom: '1.5625rem',
  marginLeft: '1.25rem',
});

export const ActionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '3rem',
});

export const StyledButton = styled(Button)({
  border: 'none',
});

export const InputFieldContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '.25rem',
});

const FlexRowContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '334px',
});

export const SubContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const CheckBoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  alignItems: 'center',
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  textAlign: 'center',
});

export const PasswordVisibilityIconStyles = {
  cursor: 'pointer',
};

const HelperTypography = styled(Typography)({
  marginTop: '0.25rem',
});

const SignIn: React.FC<SignInProps> = ({
  handleSignIn,
  handleSignUp,
  handleGoogleAuthLogin,
}) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    isPasswordValid,
    staySignedIn,
    setStaySignedIn,
    passwordVisible,
    setPasswordVisible,
    emailErrorMessage,
    passwordErrorMessage,
    validateEmail,
    validatePassword,
    passwordTouched,
    emailTouched,
    disableContinueButton,
  } = useSignIn();

  const handleCheckBoxChange = () => {
    setStaySignedIn(!staySignedIn);
  };

  const handlePAsswordVisibilityChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <WrapperContainer>
      <StyledHeadText color={theme.palette.highEmphasis.main} variant={'h1'}>
        {RAMP}
      </StyledHeadText>
      <MainContainer>
        <Typography color={theme.palette.highEmphasis.main} variant={'h2'}>
          {SIGNIN_INNER_HEAD}
        </Typography>
        <InputFieldContainer>
          <Typography
            color={theme.palette.mediumEmphasis.main}
            variant={'body2'}
          >
            {EMAIL}
          </Typography>
          <TextField
            variant={'outlined'}
            placeholder={SIGNIN_EMAIL_PLACEHOLDER}
            width="334px"
            height="44px"
            borderRadius="8px"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            error={!isEmailValid && emailTouched}
            onBlur={(e) => {
              validateEmail(e.target.value);
            }}
          />
          {!isEmailValid && (
            <HelperTypography
              color={theme.palette.error.main}
              variant={'caption2'}
            >
              {emailErrorMessage}
            </HelperTypography>
          )}
        </InputFieldContainer>
        <SubContainer>
          <InputFieldContainer>
            <FlexRowContainer>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'body2'}
              >
                {PASSWORD}
              </Typography>
              <StyledButton
                backgroundColor={'white'}
                labelColor={theme.palette.primary[500]}
                label={FORGOT_PASSWORD_TEXT}
                variant={'text'}
              />
            </FlexRowContainer>
            <TextField
              variant={'outlined'}
              placeholder={SIGNIN_PASSWORD_PLACEHOLDER}
              width="334px"
              height="44px"
              borderRadius="8px"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              error={passwordTouched && !isPasswordValid}
              iconEnd={
                passwordVisible ? (
                  <VisibilityIcon
                    onClick={handlePAsswordVisibilityChange}
                    style={PasswordVisibilityIconStyles}
                  />
                ) : (
                  <VisibilityOffIcon
                    data-testid={'password-visibility-icon'}
                    onClick={handlePAsswordVisibilityChange}
                    style={PasswordVisibilityIconStyles}
                  />
                )
              }
              onBlur={(e) => {
                validatePassword(e.target.value);
              }}
            />
            {!isPasswordValid && (
              <HelperTypography
                color={theme.palette.error.main}
                variant={'caption2'}
              >
                {passwordErrorMessage}
              </HelperTypography>
            )}
          </InputFieldContainer>
          <CheckBoxContainer>
            <CheckBox
              checked={staySignedIn}
              handleCheckBoxChange={handleCheckBoxChange}
            />
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {CHECKBOX_LABEL}
            </Typography>
          </CheckBoxContainer>
        </SubContainer>
        <ButtonsContainer>
          <Button
            backgroundColor={theme.palette.primary[500]}
            width={'334px'}
            labelColor={theme.palette.white.main}
            label={SIGNIN}
            variant={'text'}
            disabled={disableContinueButton}
            onClick={() => {
              handleSignIn(email, password);
            }}
          />
          <Typography color={theme.palette.lowEmphasis.main} variant={'body2'}>
            {OR}
          </Typography>
          <Auth0Button
            buttonText={GOOGLE_AUTH_SIGNIN_TEXT}
            onClick={handleGoogleAuthLogin}
          />
        </ButtonsContainer>
      </MainContainer>
      <ActionContainer>
        <Typography color={theme.palette.highEmphasis.main} variant={'body2'}>
          {SIGNUP_PRE_TEXT}
        </Typography>
        <StyledButton
          backgroundColor={'white'}
          labelColor={theme.palette.primary[500]}
          label={SIGNUP}
          variant={'text'}
          onClick={handleSignUp}
        />
      </ActionContainer>
    </WrapperContainer>
  );
};

export default SignIn;
