import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SigninSignupTemplate from '.';

const meta: Meta<typeof SigninSignupTemplate> = {
  title: 'Templates/SigninSignupTemplate',
  component: SigninSignupTemplate,
};

export default meta;
type Story = StoryObj<typeof SigninSignupTemplate>;

export const Primary: Story = {
  args: {
    element: (
      <div
        style={{ backgroundColor: 'grey', height: '800px', width: '460px' }}
      ></div>
    ),
  },
};
