import type { Meta, StoryObj } from '@storybook/react';
import ApprovedCard from '.';
import { PAYMENT_DATA } from '../../../utils/constants';

const meta: Meta<typeof ApprovedCard> = {
  title: 'Molecules/ApprovedCard',
  component: ApprovedCard,
};

export default meta;
type Story = StoryObj<typeof ApprovedCard>;

export const PaymentRow: Story = {
  args: {
    paymentData: PAYMENT_DATA[0],
  },
};
