import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CustomDatePicker from '.';
import theme from '../../../theme';
import '@testing-library/jest-dom';

describe('DatePicker', () => {
  it('renders with props', () => {
    const { getByAltText, getByText } = render(
      <ThemeProvider theme={theme}>
        <CustomDatePicker text="Select Date" isSelected={true} width="200px" />
      </ThemeProvider>,
    );

    const calendarIcon = getByAltText('calendar');
    const textElement = getByText('Select Date');

    expect(calendarIcon).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle({ color: theme.palette.highEmphasis.main });
  });

  it('renders empty datepicker', () => {
    const { getByAltText, getByText } = render(
      <ThemeProvider theme={theme}>
        <CustomDatePicker text="Select Date" width="200px" />
      </ThemeProvider>,
    );

    const calendarIcon = getByAltText('calendar');
    const textElement = getByText('Select Date');

    expect(calendarIcon).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle({ color: theme.palette.lowEmphasis.main });
  });
});
