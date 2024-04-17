import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AllPayments from '.';

export default {
  title: 'Organisms/AllPayments',
  component: AllPayments,
} as Meta;

const Template: StoryFn = () => <AllPayments />;

export const Default = Template.bind({});
