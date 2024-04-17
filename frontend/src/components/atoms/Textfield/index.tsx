import styled from '@emotion/styled';
import {
  InputAdornment,
  TextField as MuiTextField,
  OutlinedTextFieldProps,
} from '@mui/material';
import React from 'react';
import theme from '../../../theme';

interface TextFieldStyleProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

interface CustomTextFieldProps
  extends OutlinedTextFieldProps,
    TextFieldStyleProps {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

const StyledTextField = styled(MuiTextField)(
  ({ width, height, borderRadius }: TextFieldStyleProps) => ({
    width: width ?? '20.875rem',
    height: height ?? '2.75rem',
    input: {
      '&::placeholder': {
        color: theme.palette.lowEmphasis.main,
        opacity: 1,
        fontFamily: theme.typography.body3.fontFamily,
        fontSize: theme.typography.body3.fontSize,
        fontWeight: theme.typography.body3.fontWeight,
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '100%',
      width: '100%',
      padding: '1.031rem 0rem',
      fieldset: {
        border: `1px solid ${theme.palette.stroke[50]}`,
        borderRadius: borderRadius,
      },
      '&:hover': {
        '& fieldset': {
          borderColor: theme.palette.stroke[50],
        },
      },
      '&.Mui-focused': {
        '& fieldset': {
          borderColor: theme.palette.stroke[50],
        },
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.stroke[50],
    },
    '& .MuiInputBase-root': {
      padding: '0.3rem 0.5rem',
      color: `${theme.palette.highEmphasis.main}`,
      fontFamily: theme.typography.body3.fontFamily,
      fontSize: theme.typography.body3.fontSize,
      fontWeight: theme.typography.body3.fontWeight,
      '&::placeholder': {
        color: theme.palette.lowEmphasis.main,
      },
      input: {
        padding: '1.031rem 0rem',
        marginTop: '-0.063rem',
      },
    },
  }),
);

const TextField = ({ iconEnd, iconStart, ...props }: CustomTextFieldProps) => {
  const TextfieldStyles = {
    backgroundColor: theme.palette.white.main,
    borderRadius: props.borderRadius,
  };
  return (
    <StyledTextField
      style={TextfieldStyles}
      {...props}
      variant="outlined"
      InputProps={{
        startAdornment: iconStart && (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ),
        endAdornment:
          iconEnd && props.type !== 'date' ? (
            <InputAdornment position="end">{iconEnd}</InputAdornment>
          ) : (
            ''
          ),
      }}
      width={props.width}
      height={props.height}
      borderRadius={props.borderRadius}
    />
  );
};

export default TextField;
