import type { Meta, StoryObj } from '@storybook/react';
import RampCardData from '.';

const meta: Meta<typeof RampCardData> = {
  title: 'Molecules/RampCardData',
  component: RampCardData,
};

export default meta;
type Story = StoryObj<typeof RampCardData>;

export const RampCounters: Story = {
  args: {
    countersData: {
      categoryRuleCount: 3,
      merchantRuleCount: 4,
      missingItemsCount: 79,
    },
  },
};
