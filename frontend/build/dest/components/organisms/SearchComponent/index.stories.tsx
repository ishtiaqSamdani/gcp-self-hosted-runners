import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchComponent from '.';
import { SEARCH_ITEM_CLICK_TEXT } from '../../../utils/constants';

const meta: Meta<typeof SearchComponent> = {
  title: 'Organisms/SearchComponent',
  component: SearchComponent,
};

export default meta;
type Story = StoryObj<typeof SearchComponent>;

const searchItemClickAction = action(SEARCH_ITEM_CLICK_TEXT);
export const SearchComponentStory: Story = {
  args: {
    onSearchItemClick: searchItemClickAction,
  },
};
