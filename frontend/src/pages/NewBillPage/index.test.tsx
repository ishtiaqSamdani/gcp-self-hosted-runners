import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBillPage from '.';
import {
  BILL_DUE_DATE_PLACEHOLDER,
  INVOICE_DATE_PLACEHOLDER,
  INVOICE_NUMBER,
  LOCATION,
  PAYMENT_OPTIONS,
  VENDOR_CONTACT,
} from '../../utils/constants';
import { createNewBill } from '../../services/transaction-service';
import { BrowserRouter } from 'react-router-dom';
import { RampTabsContextProvider } from '../../contexts/RampTabsContext';
import { AuthProvider } from '../../contexts/AuthContext';

jest.mock('../../services/transaction-service', () => ({
  createNewBill: jest.fn(),
}));

describe('NewBillPage Component', () => {
  test('should render NewBillPage component', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <NewBillPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  test('should handle review and edit actions', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <NewBillPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const skipPrefilling = screen.getByText(/Skip Prefilling/i);
    expect(skipPrefilling).toBeInTheDocument();
    fireEvent.click(skipPrefilling);

    const employeeContactInput = screen.getByPlaceholderText(VENDOR_CONTACT);
    fireEvent.change(employeeContactInput, {
      target: { value: 'john@gmail.com' },
    });

    const invoiceNumberInput = screen.getByPlaceholderText(INVOICE_NUMBER);
    fireEvent.change(invoiceNumberInput, { target: { value: '123456' } });

    const invoiceDateInput = screen.getByPlaceholderText(
      INVOICE_DATE_PLACEHOLDER,
    );
    fireEvent.change(invoiceDateInput, { target: { value: '2023-01-01' } });

    const billDueDateInput = screen.getByPlaceholderText(
      BILL_DUE_DATE_PLACEHOLDER,
    );
    fireEvent.change(billDueDateInput, { target: { value: '2023-01-15' } });

    const quickBooksLocationInput = screen.getByPlaceholderText(LOCATION);
    fireEvent.change(quickBooksLocationInput, {
      target: { value: 'Headquarters' },
    });
    const amountInput = screen.getByPlaceholderText(/amount/i);
    fireEvent.change(amountInput, {
      target: { value: 100 },
    });
    fireEvent.click(screen.getByText(/Save changes/i));

    const dropdownToggle = screen.getByPlaceholderText('Select');
    userEvent.click(dropdownToggle);
    expect(screen.getByText(PAYMENT_OPTIONS[0].head)).toBeInTheDocument();
    const option = screen.getByText(PAYMENT_OPTIONS[0].head);
    fireEvent.click(option);
    const reviewButton = screen.getByText('Review');
    expect(reviewButton).toBeInTheDocument();
    await waitFor(() => {
      userEvent.click(reviewButton);
      expect(screen.getByText(/One last look/i)).toBeInTheDocument();
    });

    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
    await waitFor(() => {
      userEvent.click(reviewButton);
      expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    });
  }, 10000);

  test('should create new bill on clicking on Create Bill button', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <NewBillPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const skipPrefilling = screen.getByText(/Skip Prefilling/i);
    expect(skipPrefilling).toBeInTheDocument();
    fireEvent.click(skipPrefilling);

    const employeeContactInput = screen.getByPlaceholderText(VENDOR_CONTACT);
    fireEvent.change(employeeContactInput, {
      target: { value: 'john@gmail.com' },
    });

    const invoiceNumberInput = screen.getByPlaceholderText(INVOICE_NUMBER);
    fireEvent.change(invoiceNumberInput, { target: { value: '123456' } });

    const invoiceDateInput = screen.getByPlaceholderText(
      INVOICE_DATE_PLACEHOLDER,
    );
    fireEvent.change(invoiceDateInput, { target: { value: '2023-01-01' } });

    const billDueDateInput = screen.getByPlaceholderText(
      BILL_DUE_DATE_PLACEHOLDER,
    );
    fireEvent.change(billDueDateInput, { target: { value: '2023-01-15' } });

    const quickBooksLocationInput = screen.getByPlaceholderText(LOCATION);
    fireEvent.change(quickBooksLocationInput, {
      target: { value: 'Headquarters' },
    });
    const amountInput = screen.getByPlaceholderText(/amount/i);
    fireEvent.change(amountInput, {
      target: { value: 100 },
    });
    fireEvent.click(screen.getByText(/Save changes/i));

    const dropdownToggle = screen.getByPlaceholderText('Select');
    userEvent.click(dropdownToggle);
    expect(screen.getByText(PAYMENT_OPTIONS[0].head)).toBeInTheDocument();
    const option = screen.getByText(PAYMENT_OPTIONS[0].head);
    fireEvent.click(option);
    const reviewButton = screen.getByText('Review');
    expect(reviewButton).toBeInTheDocument();
    await waitFor(() => {
      userEvent.click(reviewButton);
      expect(screen.getByText(/One last look/i)).toBeInTheDocument();
      const createBillButton = screen.getByText(/Create bill/i);
      expect(createBillButton).toBeInTheDocument();
      userEvent.click(createBillButton);
      expect(createNewBill).toHaveBeenCalledTimes(1);
    });
  }, 10000);

  test('shoud disable the Review button when required fields are not filled', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <NewBillPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );

    const skipPrefilling = screen.getByText(/Skip Prefilling/i);
    expect(skipPrefilling).toBeInTheDocument();
    fireEvent.click(skipPrefilling);

    const employeeContactInput = screen.getByPlaceholderText(VENDOR_CONTACT);
    fireEvent.change(employeeContactInput, {
      target: { value: 'john@gmail.com' },
    });

    const invoiceNumberInput = screen.getByPlaceholderText(INVOICE_NUMBER);
    fireEvent.change(invoiceNumberInput, { target: { value: '123456' } });
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });
});
