import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AllRampCards from '.';

const meta: Meta<typeof AllRampCards> = {
  title: 'Organisms/AllRampCards',
  component: AllRampCards,
};

export default meta;
type Story = StoryObj<typeof AllRampCards>;

export const GraphAndSearch: Story = {
  args: {
    handleQuickBookSelect: () => {},
  },
};
