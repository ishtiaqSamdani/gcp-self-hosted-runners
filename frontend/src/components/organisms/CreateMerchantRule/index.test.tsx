import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateMerchantRuleComponent from '.';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const mockHandleCancelClick = jest.fn();
const mockHandleCreateRuleClick = jest.fn();
jest.mock('../../../services/transaction-service', () => ({
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
}));

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CreateMerchantRuleComponent
          onCancelClick={mockHandleCancelClick}
          onCreateRuleClick={mockHandleCreateRuleClick}
        />
      </AuthProvider>
    </BrowserRouter>,
  );
};

describe('CreateMerchantRuleComponent', () => {
  it('should render with default values', () => {
    renderComponent();
    expect(screen.getByText(/Create Merchant Rule/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText(/42 unsynced transactions/i)).toBeInTheDocument();
  });

  it('should update selected option on change', async () => {
    renderComponent();
    await waitFor(() => {
      const selectDropdown = screen.getByRole('combobox');
      fireEvent.mouseDown(selectDropdown);
      const travelButton = screen.getAllByText('Travel')[0];
      expect(travelButton).toBeInTheDocument();
      fireEvent.click(travelButton);
      expect(screen.getAllByText('Travel')[0]).toBeInTheDocument();
    });
  });

  it('should call handleCancelClick on cancel button click', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockHandleCancelClick).toHaveBeenCalled();
  });

  it('should call handleCreateRuleClick on create rule button click', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Create Rule/i));
    expect(mockHandleCreateRuleClick).toHaveBeenCalled();
  });
});
