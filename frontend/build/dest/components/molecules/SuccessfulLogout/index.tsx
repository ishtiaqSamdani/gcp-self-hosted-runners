import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../theme';
import SuccessIcon from '../../../../public/assets/icons/successicon.svg';
import IconComponent from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import {
  CLICK,
  HERE,
  SUCCESS_MESSAGE,
  TO_LOGIN_AGAIN,
} from '../../../utils/constants';

const StyledSuccessBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.accent.main,
  borderRadius: '.3rem',
  height: '35rem',
  width: '30%',
  boxShadow: `0px 0px 8px 0px ${theme.palette.boxShadowCard.main}`,
  padding: '1rem',
});

const StyledSuccessContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
});

const StyledSuccessImageBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  alignItems: 'center',
  marginTop: '9rem',
});

const StyledSpan = styled('span')({
  color: theme.palette.primary[500],
});

const SuccessIconStyles = {
  width: '6rem',
  height: '6rem',
};

const SuccessfulLogout = () => {
  return (
    <StyledSuccessBox data-testid="successful-logout">
      <StyledSuccessContentBox>
        <StyledSuccessImageBox>
          <IconComponent
            src={SuccessIcon}
            iconAlt={'success-icon'}
            width={SuccessIconStyles.width}
            height={SuccessIconStyles.height}
          />
          <Typography
            color={theme.palette.highEmphasis.main}
            variant={'subtitle2'}
          >
            {SUCCESS_MESSAGE}
          </Typography>
        </StyledSuccessImageBox>
        <Typography color={theme.palette.lowEmphasis.main} variant={'body2'}>
          {CLICK} <StyledSpan>{HERE}</StyledSpan> {TO_LOGIN_AGAIN}
        </Typography>
      </StyledSuccessContentBox>
    </StyledSuccessBox>
  );
};

export default SuccessfulLogout;
