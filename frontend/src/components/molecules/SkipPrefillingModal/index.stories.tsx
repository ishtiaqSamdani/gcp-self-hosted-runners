import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SkipPrefillingModal from '.';
import { BUTTON_CLICKED } from '../../../utils/constants';

const meta: Meta<typeof SkipPrefillingModal> = {
  title: 'Molecules/SkipPrefillingModal',
  component: SkipPrefillingModal,
};

const handleClickAction = action(BUTTON_CLICKED);

export default meta;
type Story = StoryObj<typeof SkipPrefillingModal>;

export const SkipPrefilling: Story = {
  args: {
    handleSkipButtonClick: handleClickAction,
  },
};
