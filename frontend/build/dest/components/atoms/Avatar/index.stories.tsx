import React from 'react';
import { Meta, type StoryFn } from '@storybook/react';
import Avatar, { AvatarComponentProps } from './index';
import AwsAvatar from '../../../../public/assets/icons/avatar.svg';

export default {
  title: 'atoms/Avatar',
  component: Avatar,
} as Meta;

const Template: StoryFn<AvatarComponentProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarSrc: AwsAvatar,
  avatarAlt: 'Default Avatar',
  avatarSx: { width: 44, height: 44 },
};

export const Large = Template.bind({});
Large.args = {
  avatarSrc: AwsAvatar,
  avatarAlt: 'Large Avatar',
  avatarSx: { width: 80, height: 80 },
};
