import { StoryFn, Meta } from '@storybook/react';
import CustomDatePicker, { DatePickerProps } from '.';
import React from 'react';

export default {
  title: 'Atoms/DatePicker',
  component: CustomDatePicker,
} as Meta<typeof CustomDatePicker>;
const template: StoryFn<typeof CustomDatePicker> = (args: DatePickerProps) => (
  <CustomDatePicker {...args} />
);

export const EmptyDatePicker = template.bind({});
EmptyDatePicker.args = {
  text: 'Date',
  isSelected: false,
  width: '170px',
};

export const FilledDatePicker = template.bind({});
FilledDatePicker.args = {
  text: '09/12/23',
  isSelected: true,
  width: '170px',
};
