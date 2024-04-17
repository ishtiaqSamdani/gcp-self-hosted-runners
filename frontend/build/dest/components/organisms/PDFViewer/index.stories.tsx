import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PDFViewer from '.';

export default {
  title: 'Organisms/PDFViewer',
  component: PDFViewer,
} as Meta;

const Template: StoryFn = (args) => (
  <PDFViewer setPdfText={jest.fn()} {...args} />
);

export const EmptyPDFViewer = Template.bind({});
