import { Stack, styled } from '@mui/material';
import React from 'react';
import IconComponent from '../../atoms/Icon';
import GoogleIcon from '../../../../public/assets/icons/google.svg';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';

export interface Auth0ButtonProps {
  buttonText: string;
  onClick: () => void;
}

const Auth0ButtonContainer = styled(Stack)({
  maxWidth: theme.spacing(83.5),
  height: theme.spacing(8.5),
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.stroke[100]}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
});

const Auth0Button = ({ buttonText, onClick }: Auth0ButtonProps) => {
  return (
    <Auth0ButtonContainer onClick={onClick}>
      <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(6)}>
        <IconComponent
          iconAlt="google"
          src={GoogleIcon}
          width="19.5px"
          height={theme.spacing(5)}
        />
        <Typography variant="body2" color={theme.palette.mediumEmphasis.main}>
          {buttonText}
        </Typography>
      </Stack>
    </Auth0ButtonContainer>
  );
};

export default Auth0Button;
