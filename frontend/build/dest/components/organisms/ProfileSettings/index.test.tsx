import React from 'react';
import { render } from '@testing-library/react';
import ProfileSettings from '.';
import { ACTION_ITEMS, MY_RAMP_OPTIONS } from '../../../utils/constants';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('ProfileSettings component', () => {
  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileSettings />
        </AuthProvider>
      </BrowserRouter>,
    );
  });

  it('should render the head container with the correct text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileSettings />
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(getByText(/My Ramp/i)).toBeInTheDocument();
  });

  it('should render each option in MY_RAMP_OPTIONS', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileSettings />
        </AuthProvider>
      </BrowserRouter>,
    );
    MY_RAMP_OPTIONS.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should render each action item in ACTION_ITEMS', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ProfileSettings />
        </AuthProvider>
      </BrowserRouter>,
    );
    ACTION_ITEMS.forEach((item) => {
      expect(getByText(item.label)).toBeInTheDocument();
    });
  });
});
