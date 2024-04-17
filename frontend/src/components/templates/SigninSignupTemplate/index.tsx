import { Box, styled } from '@mui/material';
import React from 'react';
import Background from '../../../../public/assets/images/RampSignup.svg';

interface SigninSignupTemplateProps {
  element: React.ReactNode;
}

const backgroundImageUrl = `url(${Background})`;

const MainContainer = styled(Box)({
  height: '100vh',
  width: '100vw',
  backgroundImage: backgroundImageUrl,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const SigninSignupTemplate: React.FC<SigninSignupTemplateProps> = ({
  element,
}) => {
  return <MainContainer>{element}</MainContainer>;
};

export default React.memo(SigninSignupTemplate);
