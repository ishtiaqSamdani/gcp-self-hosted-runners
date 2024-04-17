import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BillingSection from '.';

export default {
  title: 'Organisms/BillingSection',
  component: BillingSection,
} as Meta;

const Template: StoryFn<BillingSection> = (args) => (
  <BillingSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onDelete: () => {},
  handleBillable: () => {},
};
