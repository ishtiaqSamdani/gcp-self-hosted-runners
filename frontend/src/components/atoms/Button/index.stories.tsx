import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '.';
import {
  BUTTON_CLICKED,
  CREATE_CATEGORY_RULE,
  CREATE_RULE,
  SYNC_HISTORY,
} from '../../../utils/constants';
import theme from '../../../theme';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};
const handleClickAction = action(BUTTON_CLICKED);

export default meta;
type Story = StoryObj<typeof Button>;

export const ContainedButton: Story = {
  args: {
    variant: 'contained',
    label: CREATE_CATEGORY_RULE,
    labelColor: theme.palette.white.main,
    backgroundcolor: 'primary500',
    onClick: handleClickAction,
    width: '130px',
  },
};

export const DisabledButton: Story = {
  args: {
    variant: 'contained',
    label: CREATE_RULE,
    labelColor: theme.palette.white.main,
    backgroundcolor: 'primary500',
    onClick: handleClickAction,
    width: '86px',
    disabled: true,
  },
};

export const OutlinedButton: Story = {
  args: {
    variant: 'outlined',
    label: SYNC_HISTORY,
    labelColor: theme.palette.mediumEmphasis.main,
    backgroundcolor: 'white',
    onClick: handleClickAction,
    width: '94px',
  },
};
