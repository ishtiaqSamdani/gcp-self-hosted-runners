import React from 'react';
import { render } from '@testing-library/react';
import DividerComponent from '.';

describe('DividerComponent', () => {
  it('renders with custom props', () => {
    const { container } = render(
      <DividerComponent orientation="vertical" variant="inset" />,
    );
    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();

    render(<DividerComponent />);
    expect(divider).toBeInTheDocument();
  });
});
