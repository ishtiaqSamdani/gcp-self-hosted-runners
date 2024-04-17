import type { Meta, StoryObj } from '@storybook/react';
import SuccessfulLogout from '.';

const meta: Meta<typeof SuccessfulLogout> = {
  title: 'Molecules/SuccessfulLogout',
  component: SuccessfulLogout,
};

export default meta;
type Story = StoryObj<typeof SuccessfulLogout>;

export const LogoutCard: Story = {};
