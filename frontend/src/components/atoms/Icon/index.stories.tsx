import IconComponent, { IconProps } from '.';
import { Meta, StoryFn } from '@storybook/react';
import Google from '../../../../public/assets/icons/google.svg';
import Trash from '../../../../public/assets/icons/trash.svg';
import React from 'react';

const meta: Meta = {
  title: 'atoms/Icon',
  component: IconComponent,
};
export default meta;

const Template: StoryFn<IconProps> = (args) => <IconComponent {...args} />;

export const TrashIcon = Template.bind({});
TrashIcon.args = {
  src: Trash,
  iconAlt: 'trash-icon',
  height: '1.5rem',
  width: '1.5rem',
};

export const GoogleIcon = Template.bind({});
GoogleIcon.args = {
  src: Google,
  iconAlt: 'google-icon',
  height: '12.5rem',
  width: '12.5rem',
};
