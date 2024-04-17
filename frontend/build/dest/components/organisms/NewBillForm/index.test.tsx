import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NewBillForm from './';
import {
  ADD_OTHER_LINE,
  VENDOR_CONTACT,
  INVOICE_NUMBER,
  MEMO,
  INVOICE_DATE_PLACEHOLDER,
  BILL_DUE_DATE_PLACEHOLDER,
  LOCATION,
  EMPTY_DATE,
  AMOUNT,
  PAYMENT_OPTIONS,
} from '../../../utils/constants';

const emptyFormData = {
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

describe('NewBillForm Component', () => {
  const mockSetFormState = jest.fn();
  test('test renders NewBillForm component', () => {
    render(
      <NewBillForm
        setFormState={mockSetFormState}
        formData={emptyFormData}
        formState={emptyFormData}
      />,
    );
  });

  test('test updates employee contact on input change', () => {
    const { getByPlaceholderText } = render(
      <NewBillForm setFormState={mockSetFormState} formState={emptyFormData} />,
    );
    const employeeContactInput = getByPlaceholderText(INVOICE_NUMBER);
    fireEvent.change(employeeContactInput, { target: { value: 'John Doe' } });
  });

  test('test adds a new billing section on button click', async () => {
    const { getByText, getAllByAltText } = render(
      <NewBillForm
        setFormState={mockSetFormState}
        formData={emptyFormData}
        formState={emptyFormData}
      />,
    );

    const addButton = getByText(ADD_OTHER_LINE);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    const deleteIcon = getAllByAltText('trash-icon');
    fireEvent.click(deleteIcon[1]);
    expect(getAllByAltText('trash-icon')).toHaveLength(2);
  });

  test('should change amount on handle change', async () => {
    const { getByPlaceholderText } = render(
      <NewBillForm
        setFormState={mockSetFormState}
        formData={emptyFormData}
        formState={emptyFormData}
      />,
    );

    const amountInput = getByPlaceholderText(AMOUNT);
    fireEvent.change(amountInput, { target: { value: 500 } });
    expect(screen.getByText(PAYMENT_OPTIONS[0].head)).toBeInTheDocument();
    const option = screen.getByText(PAYMENT_OPTIONS[0].head);
    fireEvent.click(option);
    expect(amountInput).toHaveValue(500);
  });

  test('test handles all onChange events', () => {
    const { getByPlaceholderText } = render(
      <NewBillForm setFormState={mockSetFormState} formState={emptyFormData} />,
    );

    const employeeContactInput = getByPlaceholderText(VENDOR_CONTACT);
    fireEvent.change(employeeContactInput, { target: { value: 'John Doe' } });

    const invoiceNumberInput = getByPlaceholderText(INVOICE_NUMBER);
    fireEvent.change(invoiceNumberInput, { target: { value: '123456' } });

    const invoiceDateInput = getByPlaceholderText(INVOICE_DATE_PLACEHOLDER);
    fireEvent.change(invoiceDateInput, { target: { value: '2023-01-01' } });

    const billDueDateInput = getByPlaceholderText(BILL_DUE_DATE_PLACEHOLDER);
    fireEvent.change(billDueDateInput, { target: { value: '2023-01-15' } });

    const quickBooksLocationInput = getByPlaceholderText(LOCATION);
    fireEvent.change(quickBooksLocationInput, {
      target: { value: 'Headquarters' },
    });

    const memoInput = getByPlaceholderText(MEMO);
    fireEvent.change(memoInput, { target: { value: 'Some memo text' } });
  });
});
