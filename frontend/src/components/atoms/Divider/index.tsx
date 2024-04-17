import React from 'react';
import { Divider, SxProps } from '@mui/material';

export interface DividerProps {
  variant?: 'fullWidth' | 'inset' | 'middle';
  orientation?: 'horizontal' | 'vertical';
  sx?: SxProps;
}

const DividerComponent = ({
  variant = 'fullWidth',
  orientation = 'horizontal',
  ...props
}: DividerProps) => {
  return (
    <Divider orientation={orientation} variant={variant} flexItem {...props} />
  );
};

export default DividerComponent;
