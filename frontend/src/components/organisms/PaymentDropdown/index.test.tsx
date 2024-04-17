import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaymentTypeDropdown from './';
import {
  AUTO_APPROVED,
  PAYMENT_OPTIONS,
  SELECT,
} from '../../../utils/constants';

describe('PaymentTypeDropdown', () => {
  test('test renders without crashing', () => {
    const handleSelectedOption = jest.fn();
    render(<PaymentTypeDropdown handleSelectedOption={handleSelectedOption} />);
    expect(screen.getByPlaceholderText(SELECT)).toBeInTheDocument();
  });

  test('test dropdown opens and selects an option', () => {
    const handleSelectedOption = jest.fn();
    render(<PaymentTypeDropdown handleSelectedOption={handleSelectedOption} />);
    const dropdownToggle = screen.getByPlaceholderText('Select');
    userEvent.click(dropdownToggle);
    expect(screen.getByText(PAYMENT_OPTIONS[0].head)).toBeInTheDocument();
    const option = screen.getByText(PAYMENT_OPTIONS[0].head);
    fireEvent.click(option);
    expect(screen.getByText(AUTO_APPROVED)).toBeInTheDocument();
  });
});
