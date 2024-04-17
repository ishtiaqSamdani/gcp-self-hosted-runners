import React from 'react';
import { render } from '@testing-library/react';
import RotatingSpinner from '.';

describe('RotatingSpinner', () => {
  it('renders without crashing', () => {
    const { getByAltText } = render(<RotatingSpinner />);
    const spinnerImage = getByAltText('Loading...');
    expect(spinnerImage).toBeInTheDocument();
  });
});
