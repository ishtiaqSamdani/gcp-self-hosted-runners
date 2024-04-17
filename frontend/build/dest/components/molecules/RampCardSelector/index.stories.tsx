import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RampCardSelector from '.';
import { RAMP_CHANGED } from '../../../utils/constants';

const meta: Meta<typeof RampCardSelector> = {
  title: 'Molecules/RampCardSelector',
  component: RampCardSelector,
};

const handleRampCategoryChange = action(RAMP_CHANGED);

export default meta;
type Story = StoryObj<typeof RampCardSelector>;

export const AirlineRamp: Story = {
  args: {
    rampValue: 'Airline',
    handleRampChange: handleRampCategoryChange,
  },
};

export const EmptyRamp: Story = {
  args: {
    rampValue: '',
    handleRampChange: handleRampCategoryChange,
  },
};
