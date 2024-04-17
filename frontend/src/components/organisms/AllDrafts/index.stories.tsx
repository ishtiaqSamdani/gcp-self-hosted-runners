import { Meta, StoryObj } from '@storybook/react';
import AllDrafts from '.';

const meta: Meta = {
  title: 'Organisms/AllDrafts',
  component: AllDrafts,
};

export default meta;
type Story = StoryObj<typeof AllDrafts>;

export const Default: Story = {
  args: {},
};
