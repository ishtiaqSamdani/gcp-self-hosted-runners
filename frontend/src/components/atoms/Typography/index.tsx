import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { TypographyVariant } from '../../../utils/types';

interface TypographyProps {
  color: string;
  children: React.ReactNode;
  variant: TypographyVariant;
  className?: string;
}

const TypographyStyles = {
  cursor: 'default',
};

const Typography = ({
  className,
  color,
  children,
  variant,
}: TypographyProps) => {
  return (
    <MuiTypography
      className={className}
      color={color}
      variant={variant}
      sx={TypographyStyles}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
