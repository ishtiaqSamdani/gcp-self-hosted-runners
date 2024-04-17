import { StoryFn, Meta } from '@storybook/react';
import DividerComponent, { DividerProps } from '.';
import React from 'react';

export default {
  title: 'Atoms/Divider',
  component: DividerComponent,
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof DividerComponent>;
const template: StoryFn<typeof DividerComponent> = (args: DividerProps) => (
  <DividerComponent {...args} />
);

export const HorizontalDivider = template.bind({});
HorizontalDivider.args = {};

export const VerticalDivider = template.bind({});
VerticalDivider.args = {
  orientation: 'vertical',
  sx: { marginRight: '1300px', height: '200px' },
};
