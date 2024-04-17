import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
  RAMP_CATEGORY_DATA,
} from '../../../utils/constants';
import RampQuickBookMapping from '.';

const meta: Meta<typeof RampQuickBookMapping> = {
  title: 'Molecules/RampQuickBookMapping',
  component: RampQuickBookMapping,
};
const onChangeAction = action('changed');
export default meta;
type Story = StoryObj<typeof RampQuickBookMapping>;

export const InactiveRampQuickbook: Story = {
  args: {
    quickbookItems: QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
    rampPlaceholder: RAMP_CATEGORY_DATA[3],
    handleQuickBookChange: onChangeAction,
    quickBookValue: '',
    mappedRamp: false,
  },
};

export const ActiveRampQuickbook: Story = {
  args: {
    quickbookItems: [],
    rampPlaceholder: RAMP_CATEGORY_DATA[0],
    handleQuickBookChange: () => {},
    quickBookValue: QUICKBOOKS_CATEGORY_SELECT_OPTIONS[0],
    mappedRamp: true,
  },
};
