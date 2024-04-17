import { Stack, Typography, styled } from '@mui/material';
import React from 'react';
import IconComponent from '../Icon';
import CalendarIcon from '../../../../public/assets/icons/calendar.svg';
import theme from '../../../theme';

export interface DatePickerProps {
  text?: string;
  isSelected?: boolean;
  width?: string;
}

const DatePickerContainer = styled(Stack)({
  flexDirection: 'row',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  gap: theme.spacing(2),
  alignItems: 'center',
  border: `1px solid ${theme.palette.stroke[50]}`,
  borderRadius: theme.spacing(3),
  height: theme.spacing(7),
});

const CustomDatePicker = ({ text, isSelected, width }: DatePickerProps) => {
  const textColor = isSelected
    ? theme.palette.highEmphasis.main
    : theme.palette.lowEmphasis.main;
  return (
    <DatePickerContainer
      width={`calc(${width ?? '8rem'} - ${theme.spacing(4)})`}
    >
      <IconComponent
        src={CalendarIcon}
        iconAlt="calendar"
        width={theme.spacing(3)}
        height={theme.spacing(3)}
      />
      <Typography variant="caption2" color={textColor}>
        {text}
      </Typography>
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
