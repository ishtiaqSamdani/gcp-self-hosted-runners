import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DraftReimbursementCard from '.';

describe('DraftReimbursementCard', () => {
  it('renders DraftReimbursementCard with provided data', () => {
    const mockData = {
      employeeName: 'John Doe',
      employeeDate: '2022-01-01',
      amount: 5000,
      dueDate: '2022-01-15',
      invoiceDate: '2022-01-10',
      invoiceNo: 'INV123',
      accountNo: '123456789',
    };

    render(<DraftReimbursementCard {...mockData} />);

    expect(screen.getByText(mockData.employeeName)).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });
});
