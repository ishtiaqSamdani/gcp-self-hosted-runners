import React from 'react';
import { styled, keyframes } from '@mui/material';
import Spinner from '../../../../public/assets/icons/spinner.svg';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerImage = styled('img')({
  width: 62,
  height: 62,
  animation: `${rotateAnimation} 1s linear infinite`,
});

const RotatingSpinner = () => {
  return (
    <SpinnerImage
      src={Spinner}
      data-testid="loading-spinner"
      alt="Loading..."
    />
  );
};

export default RotatingSpinner;
