import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountingPage from '.';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { RampTabsContextProvider } from '../../contexts/RampTabsContext';
import { AuthProvider } from '../../contexts/AuthContext';

jest.mock('../../services/rule-service', () => ({
  getAllMerchantRulesByUserId: jest.fn().mockResolvedValue([
    {
      vendorName: 'Renuar',
      id: 1,
      quickBookId: 2,
      userId: 1,
    },
  ]),
  getAllCategoryRulesByUserId: jest.fn().mockResolvedValue([
    {
      rampId: 4,
      quickBookId: 2,
      id: 2,
    },
  ]),
  createMerchantRule: jest.fn(),
}));
jest.mock('../../services/transaction-service', () => ({
  getAllQuickBooks: jest.fn().mockResolvedValue([
    {
      name: 'Travel',
      id: 1,
    },
    {
      name: 'Expense',
      id: 2,
    },
    {
      name: 'Travel Meals',
      id: 3,
    },
    {
      name: 'Hotels',
      id: 4,
    },
    {
      name: 'Automobile and Fuel',
      id: 5,
    },
    {
      name: 'Dues & Subscriptions',
      id: 6,
    },
  ]),
  getAllTransactions: jest.fn().mockResolvedValue([
    {
      id: 1,
      vendor: {
        id: 1,
        shortName: 'shop123',
        displayName: 'Lyft',
      },
      amount: '$42,000',
      date: new Date('04-04-2004'),
      employee: { id: 1, name: 'David' },
      receipt: '#200257',
      memo: '21-00006',
      quickBook: { id: 1, name: 'Travel' },
    },
    {
      id: 2,
      vendor: {
        id: 1,
        shortName: 'shop123',
        displayName: 'Lyft',
      },
      amount: '$42,000',
      date: new Date('04-04-2004'),
      employee: { id: 1, name: 'David' },
      receipt: '#200257',
      memo: '21-00006',
      quickBook: null,
    },
  ]),
  deleteTransactionById: jest.fn(),
  addQuickbookIdToTransaction: jest.fn(),
  createCategoryRule: jest.fn(),
  getCategoryRuleInformation: jest.fn().mockResolvedValue({
    activeRules: [
      {
        rampId: 1,
        rampName: 'Aircraft',
        quickBookId: 1,
        quickBookName: 'Travel',
      },
    ],
    recentCategory: [
      {
        rampId: 2,
        rampName: 'Fuel and Gas',
        quickBookId: 0,
        quickBookName: '',
      },
    ],
  }),
}));
global.alert = jest.fn();

describe('AccountingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the component correctly', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <AccountingPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText('Ramp cards')).toBeInTheDocument();
  });

  test('should open and close the create category rule modal', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <AccountingPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    await act(() => {
      fireEvent.click(screen.getAllByText(/Create category rule/i)[0]);
    });
    await waitFor(() => {
      expect(screen.getByText('Active rules')).toBeInTheDocument();
      expect(screen.getByText(/Recent categories/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText('Cancel'));
      expect(screen.getByText(/Ramp cards/i)).toBeInTheDocument();
    });
  });

  test('should call the necessary functions when creating a merchant rule', async () => {
    await act(() => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <RampTabsContextProvider>
              <AccountingPage />
            </RampTabsContextProvider>
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('transaction-card')[0]).toBeInTheDocument();
    });
    await act(() => {
      const selectElement = screen.getAllByRole('combobox')[1];
      fireEvent.mouseDown(selectElement);
    });
    await waitFor(() => {
      expect(screen.getByText('Hotels')).toBeInTheDocument();
    });
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('option')[2]);
      const createRuleButton = screen.getAllByText(/Create rule/i)[0];
      expect(createRuleButton).toBeInTheDocument();
      fireEvent.click(createRuleButton);
      expect(screen.getByText(/Create merchant rule/i)).toBeInTheDocument();
      const selectCategory = screen.getAllByRole('combobox')[2];
      fireEvent.mouseDown(selectCategory);
      fireEvent.click(screen.getByText(/Automobile and Fuel/i));
    });
    await waitFor(() => {
      fireEvent.click(screen.getAllByText(/Create rule/i)[1]);
      expect(screen.getByText(/Ramp cards/i)).toBeInTheDocument();
    });
  }, 10000);

  test('should close merchant rule dialog box when clicked on X mark', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <AccountingPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getAllByTestId('transaction-card')[0]).toBeInTheDocument();
    });
    await act(() => {
      const selectElement = screen.getAllByRole('combobox')[1];
      fireEvent.mouseDown(selectElement);
    });
    await waitFor(() => {
      expect(screen.getByText('Hotels')).toBeInTheDocument();
    });
    await act(() => {
      fireEvent.click(screen.getAllByText('Hotels')[0]);
    });
    await waitFor(() => {
      const cancelButton = screen.getByAltText('cancel-icon');
      expect(cancelButton).toBeInTheDocument();
      fireEvent.click(cancelButton);
      expect(screen.getByText(/Ramp cards/i)).toBeInTheDocument();
    });
  });

  test('should close merchant rule modal when clicked on cancel button', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <RampTabsContextProvider>
            <AccountingPage />
          </RampTabsContextProvider>
        </AuthProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getAllByTestId('transaction-card')[0]).toBeInTheDocument();
    });
    await act(() => {
      const selectElement = screen.getAllByRole('combobox')[1];
      fireEvent.mouseDown(selectElement);
    });
    await waitFor(() => {
      expect(screen.getByText('Hotels')).toBeInTheDocument();
    });
    await waitFor(() => {
      fireEvent.click(screen.getAllByRole('option')[2]);
      const createRuleButton = screen.getAllByText(/Create rule/i)[0];
      expect(createRuleButton).toBeInTheDocument();
      fireEvent.click(createRuleButton);
      expect(screen.getByText(/Create merchant rule/i)).toBeInTheDocument();
      const selectCategory = screen.getAllByRole('combobox')[2];
      fireEvent.mouseDown(selectCategory);
      fireEvent.click(screen.getByText(/Automobile and Fuel/i));
      fireEvent.click(screen.getAllByText(/Cancel/i)[0]);
      expect(screen.getByText(/Ramp cards/i)).toBeInTheDocument();
    });
  });
});
