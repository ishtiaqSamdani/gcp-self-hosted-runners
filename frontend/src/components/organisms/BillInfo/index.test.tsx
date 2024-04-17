import React from 'react';
import { render } from '@testing-library/react';
import BillInfoLastLook from '.';
import { EMPTY_DATE } from '../../../utils/constants';

jest.mock('../../../utils/types', () => ({
  NewBillFormData: {},
}));

const mockFormData = {
  invoiceTotal: 500,
  invoiceNumber: 'abcd',
  employeeContact: 'abcd',
  invoiceDate: EMPTY_DATE,
  billDueDate: EMPTY_DATE,
  memo: 'abcd',
  employeeName: 'abcd',
  quickBookLocation: 'abcd',
  paymentType: 'abcd',
};

describe('BillInfoLastLook component', () => {
  it('renders without crashing', () => {
    const { container } = render(<BillInfoLastLook formState={mockFormData} />);
    expect(container).toBeInTheDocument();
  });

  it('renders the expected text elements', () => {
    const emptyFormData = {
      invoiceTotal: 0,
      invoiceNumber: 'abcd',
      employeeContact: 'abcd',
      invoiceDate: EMPTY_DATE,
      billDueDate: EMPTY_DATE,
      memo: 'abcd',
      employeeName: 'abcd',
      quickBookLocation: 'abcd',
    };
    const { getByText } = render(
      <BillInfoLastLook formState={emptyFormData} />,
    );

    expect(getByText('One last look')).toBeInTheDocument();
    expect(getByText('Pay')).toBeInTheDocument();
  });
});
