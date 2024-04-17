import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CreateCategoryRule from '.';

const meta: Meta<typeof CreateCategoryRule> = {
  title: 'Organisms/CreateCategoryRule',
  component: CreateCategoryRule,
};

export default meta;
type Story = StoryObj<typeof CreateCategoryRule>;

export const CategoryRuleModal: Story = {
  args: {
    handleCancelClick: () => {},
  },
};
