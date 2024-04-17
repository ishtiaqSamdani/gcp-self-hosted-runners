import type { Meta, StoryObj } from '@storybook/react';
import Typography from '.';
import theme from '../../../theme';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: 'h1',
    color: theme.palette.accent[100],
    children: 'typography',
  },
};
