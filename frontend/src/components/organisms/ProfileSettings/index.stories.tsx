import type { Meta, StoryObj } from '@storybook/react';
import ProfileSettings from '.';

const meta: Meta<typeof ProfileSettings> = {
  title: 'Organisms/ProfileSettings',
  component: ProfileSettings,
};

export default meta;
type Story = StoryObj<typeof ProfileSettings>;

export const Default: Story = {
  args: {},
};
