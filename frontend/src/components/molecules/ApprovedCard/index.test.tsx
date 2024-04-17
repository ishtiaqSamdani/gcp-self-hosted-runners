import { render, screen } from '@testing-library/react';
import ApprovedCard from '.';
import { PAYMENT_DATA } from '../../../utils/constants';

describe('Test Approved card', () => {
  it('should render Approved card', () => {
    render(<ApprovedCard paymentData={PAYMENT_DATA[0]} />);
    expect(screen.getByTestId('approved-card')).toBeInTheDocument();
  });
});
