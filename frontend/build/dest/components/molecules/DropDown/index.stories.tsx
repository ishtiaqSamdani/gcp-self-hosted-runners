import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropDown from '.';
import {
  REIMBURSEMENT,
  REIMBURSMENTS_DROPDOWN_OPTIONS,
} from '../../../utils/constants';

const meta: Meta<typeof DropDown> = {
  title: 'Molecules/DropDown',
  component: DropDown,
};
const handleChangeAction = action('option changed');
export default meta;
type Story = StoryObj<typeof DropDown>;

export const ActiveDropDown: Story = {
  args: {
    dropDownVariant: 'active',
    items: REIMBURSMENTS_DROPDOWN_OPTIONS,
    placeholder: REIMBURSEMENT,
    value: REIMBURSMENTS_DROPDOWN_OPTIONS[0],
    disabled: false,
    height: '24px',
    handleChange: handleChangeAction,
  },
};

export const InActiveDropDown: Story = {
  args: {
    dropDownVariant: 'inactive',
    items: REIMBURSMENTS_DROPDOWN_OPTIONS,
    placeholder: REIMBURSEMENT,
    value: REIMBURSMENTS_DROPDOWN_OPTIONS[0],
    disabled: true,
    height: '24px',
  },
};
