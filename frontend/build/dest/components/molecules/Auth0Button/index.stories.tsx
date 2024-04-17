import { Meta, StoryFn } from '@storybook/react';
import Auth0Button, { Auth0ButtonProps } from '.';
import React from 'react';

const meta: Meta = {
  title: 'Molecules/Auth0Button',
  component: Auth0Button,
  argTypes: {
    buttonText: { control: 'text' },
  },
};
export default meta;

const Template: StoryFn<Auth0ButtonProps> = (args) => <Auth0Button {...args} />;

export const SignIn = Template.bind({});
SignIn.args = {
  buttonText: 'Sign in with Google',
  onClick: () => {},
};

export const SignUp = Template.bind({});
SignUp.args = {
  buttonText: 'Sign up with Google',
  onClick: () => {},
};
