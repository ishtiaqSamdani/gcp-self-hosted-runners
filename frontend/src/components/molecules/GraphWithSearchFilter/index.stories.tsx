import type { Meta, StoryObj } from '@storybook/react';
import GraphWithSearchFilter from '.';

const meta: Meta<typeof GraphWithSearchFilter> = {
  title: 'Molecules/GraphWithSearchFilter',
  component: GraphWithSearchFilter,
};

export default meta;
type Story = StoryObj<typeof GraphWithSearchFilter>;

export const GraphAndSearch: Story = {
  args: {},
};
