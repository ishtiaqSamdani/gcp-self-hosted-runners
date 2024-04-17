import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../../theme';
import Typography from '../Typography';
import { TypographyVariant } from '../../../utils/types';

interface IButtonProps extends ButtonProps {
  backgroundColor: string;
  width?: string;
  labelColor: string;
  label: string;
  className?: string;
  labelVariant?: TypographyVariant;
}

const StyledButton = styled(MuiButton)(
  ({ backgroundColor, ...rest }: IButtonProps) => ({
    borderRadius: theme.spacing(1),
    height: theme.spacing(8),
    textTransform: 'none',
    backgroundColor: backgroundColor,
    '&:hover': {
      backgroundColor:
        rest.variant === 'outlined' || rest.variant === 'text'
          ? backgroundColor
          : theme.palette.primary[500],
      border:
        rest.variant === 'outlined' || rest.variant === 'text'
          ? `1px solid ${theme.palette.boxShadow.main}`
          : `1px solid ${theme.palette.primary[500]}`,
    },
    border:
      rest.variant === 'outlined'
        ? `1px solid ${theme.palette.boxShadow.main}`
        : `1px solid ${theme.palette.primary[500]}`,
    padding: '3px 8px 5px 8px',
    ':disabled': {
      background:
        backgroundColor === theme.palette.primary[500]
          ? theme.palette.stroke[100]
          : theme.palette.primary[500],
      color: theme.palette.stroke[100],
      border: `1px solid ${theme.palette.stroke[100]}`,
      opacity: '50%',
    },
    boxShadow:
      rest.variant === 'outlined'
        ? `0px 1px 1px 0 ${theme.palette.boxShadow.main}`
        : 'none',
  }),
);

const Button = ({
  backgroundColor,
  labelVariant,
  width = '5.375rem',
  ...props
}: IButtonProps) => {
  return (
    <StyledButton
      {...props}
      backgroundColor={backgroundColor}
      width={width}
      data-testid="button-element"
      className={props.className}
    >
      <Typography variant={labelVariant} color={props.labelColor}>
        {props.label}
      </Typography>
    </StyledButton>
  );
};

export default Button;
