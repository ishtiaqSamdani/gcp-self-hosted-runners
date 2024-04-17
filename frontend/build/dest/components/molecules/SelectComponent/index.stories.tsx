import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SelectComponent from '.';
import {
  QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
  QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER,
} from '../../../utils/constants';

const meta: Meta<typeof SelectComponent> = {
  title: 'Molecules/SelectComponent',
  component: SelectComponent,
};
const onChangeAction = action('changed');
export default meta;
type Story = StoryObj<typeof SelectComponent>;

export const Select: Story = {
  args: {
    items: QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
    placeholder: QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER,
    handleChange: onChangeAction,
    value: '',
    width: '9.8%',
    height: '32px',
  },
};
