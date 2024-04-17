import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CreateRampCategory, { CreateRampCategoryProps } from '.';

export default {
  title: 'Organisms/CreateRampCategory',
  component: CreateRampCategory,
} as Meta;

const Template: StoryFn<CreateRampCategoryProps> = (args) => (
  <CreateRampCategory {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onCancelClick: () => console.log('Cancel clicked'),
};
