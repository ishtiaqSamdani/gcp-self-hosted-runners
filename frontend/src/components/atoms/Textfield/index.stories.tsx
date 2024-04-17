import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Textfield from '.';
import {
  EMAIL_PLACEHOLDER,
  RAMP_CATEGORY_PLACEHOLDER,
  SEARCH_CARDS,
} from '../../../utils/constants';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '../../../../public/assets/icons/searchicon.svg';

const meta: Meta<typeof Textfield> = {
  title: 'Atoms/Textfield',
  component: Textfield,
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const EmailInput: Story = {
  args: {
    placeholder: EMAIL_PLACEHOLDER,
    width: '334px',
    height: '44px',
    borderRadius: '8px',
    onChange: () => {},
  },
};

export const PassWordInputHidden: Story = {
  args: {
    placeholder: EMAIL_PLACEHOLDER,
    type: 'password',
    iconEnd: <VisibilityOffIcon />,
    width: '334px',
    height: '44px',
    borderRadius: '8px',
  },
};

export const RampCategory: Story = {
  args: {
    placeholder: RAMP_CATEGORY_PLACEHOLDER,
    width: '360px',
    height: '28px',
    borderRadius: '8px',
  },
};

export const SearchField: Story = {
  args: {
    placeholder: SEARCH_CARDS,
    width: '456px',
    height: '28px',
    iconStart: <img src={SearchIcon} alt="search" />,
    borderRadius: '12px',
  },
};
