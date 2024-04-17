import React from 'react';
import { render } from '@testing-library/react';
import SavingsCard, { SavingsCardProps } from '.';

describe('SavingsCard Component', () => {
  const defaultProps: SavingsCardProps = {
    amount: 5000,
  };

  it('renders with default props', () => {
    const { getByText, getByAltText } = render(
      <SavingsCard {...defaultProps} />,
    );

    expect(getByText('Potential Savings')).toBeInTheDocument();
    expect(getByText('$5,000.00')).toBeInTheDocument();
    expect(getByAltText('aws')).toBeInTheDocument();
  });

  it('renders with custom amount', () => {
    const customProps: SavingsCardProps = {
      amount: 250,
    };
    const { getByText } = render(<SavingsCard {...customProps} />);
    expect(getByText('$250.00')).toBeInTheDocument();
  });
});
