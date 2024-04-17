import type { Meta, StoryObj } from '@storybook/react';
import PaymentTypeDropdown from '.';

const meta: Meta<typeof PaymentTypeDropdown> = {
  title: 'Organisms/PaymentTypeDropdown',
  component: PaymentTypeDropdown,
};

export default meta;
type Story = StoryObj<typeof PaymentTypeDropdown>;

export const Default: Story = {
  args: {},
};
