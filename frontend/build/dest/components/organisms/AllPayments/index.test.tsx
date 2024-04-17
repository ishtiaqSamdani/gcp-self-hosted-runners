import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
  within,
} from '@testing-library/react';
import AllPayments from '.';
import * as services from '../../../services/transaction-service';
import { PAYMENT_DATA } from '../../../utils/constants';

describe('AllPayments component', () => {
  test('should render without crashing', async () => {
    jest.spyOn(services, 'getAllPaymentBills').mockResolvedValue(PAYMENT_DATA);
    await act(() => {
      render(<AllPayments />);
    });
  });

  it('should display the correct header text', async () => {
    jest.spyOn(services, 'getAllPaymentBills').mockResolvedValue(PAYMENT_DATA);
    await act(() => {
      render(<AllPayments />);
    });
    expect(screen.getByText('Payments')).toBeInTheDocument();
  });

  test('should display the correct number of payment cards', async () => {
    jest.spyOn(services, 'getAllPaymentBills').mockResolvedValue(PAYMENT_DATA);
    await act(() => {
      render(<AllPayments />);
    });
    expect(screen.getAllByTestId('approved-card').length).toBe(7);
  });

  test('should handle search correctly', async () => {
    jest.spyOn(services, 'getAllPaymentBills').mockResolvedValue(PAYMENT_DATA);
    await act(() => {
      render(<AllPayments />);
    });
    await act(async () => {
      const searchInput = screen.getByPlaceholderText('Search cards');
      fireEvent.change(searchInput, { target: { value: 'Elena' } });
    });
    await waitFor(() => {
      const searchBox = screen.getByTestId('suggestion-card');
      expect(searchBox).toBeInTheDocument();
    });
    await act(async () => {
      const searchClick = within(
        screen.getByTestId('suggestion-card'),
      ).getByTestId('clickable-search-text');
      fireEvent.click(searchClick);
    });
    await waitFor(() => {
      expect(screen.getByText('Elena Wilkins')).toBeInTheDocument();
    });
  });

  test('should handle errors correctly', async () => {
    jest
      .spyOn(services, 'getAllPaymentBills')
      .mockRejectedValue(new Error('Error'));
    await act(() => {
      render(<AllPayments />);
    });
    await waitFor(() => {
      expect(screen.queryByTestId('approved-card')).toBeNull;
    });
  });
});
