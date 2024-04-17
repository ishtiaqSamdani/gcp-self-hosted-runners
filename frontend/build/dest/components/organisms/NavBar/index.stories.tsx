import React from 'react';
import type { Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '.';

const meta: Meta<typeof NavBar> = {
  title: 'Organisms/NavBar',
  component: NavBar,
};

export default meta;

export const Navigation = () => {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
};
