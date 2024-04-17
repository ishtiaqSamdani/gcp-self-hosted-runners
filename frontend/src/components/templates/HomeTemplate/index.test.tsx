import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomeTemplate from '.';
import { RampTabsContextProvider } from '../../../contexts/RampTabsContext';

describe('HomeTemplate component', () => {
  it('shoudld render without crashing', () => {
    render(
      <BrowserRouter>
        <RampTabsContextProvider>
          <HomeTemplate content={<div>Test Content</div>} />
        </RampTabsContextProvider>
      </BrowserRouter>,
    );
  });

  it('should render NavBar', () => {
    const { getByText } = render(
      <BrowserRouter>
        <RampTabsContextProvider>
          <HomeTemplate content={<div>Test Content</div>} />
        </RampTabsContextProvider>
      </BrowserRouter>,
    );

    expect(getByText(/Setup guide/i)).toBeInTheDocument();
  });

  it('should render content', () => {
    const { getByText } = render(
      <BrowserRouter>
        <RampTabsContextProvider>
          <HomeTemplate content={<div>Test Content</div>} />
        </RampTabsContextProvider>
      </BrowserRouter>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply styling correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <RampTabsContextProvider>
          <HomeTemplate content={<div>Test Content</div>} />
        </RampTabsContextProvider>
      </BrowserRouter>,
    );

    const header = container.querySelector('.MuiGrid-item');
    expect(header).toHaveStyle('height: 5.25rem');
  });
});
