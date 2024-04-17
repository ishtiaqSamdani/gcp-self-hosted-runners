import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
  TRANSACTION_DATA,
} from '../../../utils/constants';
import TransactionCard from '.';

const meta: Meta<typeof TransactionCard> = {
  title: 'Molecules/TransactionCard',
  component: TransactionCard,
};
const onChangeAction = action('changed');
export default meta;
type Story = StoryObj<typeof TransactionCard>;

export const TransactionWithNoQuickbook: Story = {
  args: {
    quickBookData: QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
    handleCheckboxClick: onChangeAction,
    handleSelectChange: onChangeAction,
    dropdownValue: '',
    transactionRowData: TRANSACTION_DATA[0],
    checked: false,
  },
};

export const TransactionWithQuickbook: Story = {
  args: {
    quickBookData: [],
    handleCheckboxClick: onChangeAction,
    handleSelectChange: () => {},
    dropdownValue: 'Travel',
    transactionRowData: TRANSACTION_DATA[0],
    checked: true,
  },
};
