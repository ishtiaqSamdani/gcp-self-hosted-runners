import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TypographyWithIcon, { TypographyWithIconProps } from '.';
import SettingsIcon from '../../../../public/assets/icons/settings.svg';
import RightArrowIcon from '../../../../public/assets/icons/right_arrow.svg';

export default {
  title: 'Molecules/TypographyWithIcon',
  component: TypographyWithIcon,
} as Meta;

const Template: StoryFn<TypographyWithIconProps> = (args) => (
  <TypographyWithIcon {...args} />
);

export const IconAtStart = Template.bind({});
IconAtStart.args = {
  text: 'Hello, World!',
  iconSrc: SettingsIcon,
  iconAlt: 'Icon',
  iconPosition: 'start',
  typographyProps: { variant: 'body1', color: 'primary' },
  iconProps: { width: '24px', height: '24px' },
};

export const IconAtEnd = Template.bind({});
IconAtEnd.args = {
  text: 'Go to partner reward',
  iconSrc: RightArrowIcon,
  iconAlt: 'Icon',
  iconPosition: 'end',
  typographyProps: { variant: 'body1', color: 'primary' },
  iconProps: { width: '24px', height: '24px' },
};
