import type { Meta, StoryObj } from '@storybook/react';
import SignIn from '.';

const meta: Meta<typeof SignIn> = {
  title: 'Organisms/SignIn',
  component: SignIn,
};

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Primary: Story = {
  args: {
    handleSignUp: () => {},
    handleSignIn: () => {},
    handleGoogleAuthLogin: () => {},
  },
};
