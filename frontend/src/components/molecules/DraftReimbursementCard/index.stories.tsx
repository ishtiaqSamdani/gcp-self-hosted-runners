import { Meta, StoryFn } from '@storybook/react';
import DraftReimbursementCard, { DraftReimbursementCardProps } from '.';
import React from 'react';

const meta: Meta = {
  title: 'Molecules/DraftReimbursementCard',
  component: DraftReimbursementCard,
};

export default meta;

const Template: StoryFn<DraftReimbursementCardProps> = (args) => (
  <DraftReimbursementCard {...args} />
);

export const CheckedCheckbox = Template.bind({});
CheckedCheckbox.args = {
  employeeName: 'Julie Mendez',
  employeeDate: '2011-04-09',
  amount: 47000,
  dueDate: '2011-02-09',
  invoiceDate: '2011-03-09',
  invoiceNo: '#526587',
  accountNo: '3910793817',
};
