import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SavingsCard, { SavingsCardProps } from '.';

export default {
  title: 'Molecules/SavingsCard',
  component: SavingsCard,
} as Meta;

const Template: StoryFn<SavingsCardProps> = (args) => <SavingsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  amount: 1000,
};
