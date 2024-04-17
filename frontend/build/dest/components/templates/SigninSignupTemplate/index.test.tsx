import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SigninSignupTemplate from './';

describe('SigninSignupTemplate', () => {
  it('shoudl render without crashing', () => {
    const { container } = render(<SigninSignupTemplate element={<div />} />);
    expect(container).toBeInTheDocument();
  });

  it('should render the provided element', () => {
    const testElement = <div data-testid="test-element" />;
    const { getByTestId } = render(
      <SigninSignupTemplate element={testElement} />,
    );
    expect(getByTestId('test-element')).toBeInTheDocument();
  });
});
