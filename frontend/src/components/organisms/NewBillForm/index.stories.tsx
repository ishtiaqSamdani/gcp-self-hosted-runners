import type { Meta, StoryObj } from '@storybook/react';
import NewBillForm from '.';

const meta: Meta<typeof NewBillForm> = {
  title: 'Organisms/NewBillForm',
  component: NewBillForm,
};

export default meta;
type Story = StoryObj<typeof NewBillForm>;

export const Default: Story = {
  args: {},
};
