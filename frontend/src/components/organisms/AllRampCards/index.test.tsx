import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import AllRampCards from '.';
import * as services from '../../../services/transaction-service';
import {
  TRANSACTION_DATA,
  QUICKBOOK_CATEGORIES,
  DELETE,
  CHOOSE_ONE,
  SEARCH_CARDS,
} from '../../../utils/constants';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('Tests All ramp cards ', () => {
  it('should render all ramp cards and handles clicks', async () => {
    jest
      .spyOn(services, 'getAllTransactions')
      .mockResolvedValue(TRANSACTION_DATA);
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);
    jest.spyOn(services, 'deleteTransactionById');
    jest.spyOn(services, 'addQuickbookIdToTransaction');

    const handleQuickBookSelect = jest.fn();
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllRampCards handleQuickBookSelect={handleQuickBookSelect} />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    const allRamp = screen.getByTestId('all-ramp-cards');
    expect(allRamp).toBeInTheDocument;
    expect(screen.getAllByTestId('transaction-card')).toBeInTheDocument;

    await act(async () => {
      const checkboxes = screen.getAllByRole('checkbox');

      expect(checkboxes[0]).toHaveProperty('checked', false);

      fireEvent.click(checkboxes[0]);
      expect(checkboxes[0]).toHaveProperty('checked', true);

      fireEvent.click(checkboxes[0]);
      expect(checkboxes[0]).toHaveProperty('checked', false);

      fireEvent.click(checkboxes[0]);
    });

    await waitFor(() => {
      const deleteButton = screen.getByText(DELETE);
      expect(deleteButton).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(DELETE));
    });

    await waitFor(() => {
      expect(services.deleteTransactionById).toHaveBeenCalled();
      expect(screen.queryByText('DELETE')).toBeNull();
    });

    await waitFor(async () => {
      const dropDownIcon = screen.getByText(CHOOSE_ONE);
      fireEvent.mouseDown(dropDownIcon);
      fireEvent.click(screen.getAllByRole('option')[1]);
      expect(services.addQuickbookIdToTransaction).toHaveBeenCalled();
      expect(handleQuickBookSelect).toHaveBeenCalled();
    });
  });

  it('should render all search', async () => {
    jest
      .spyOn(services, 'getAllTransactions')
      .mockResolvedValue(TRANSACTION_DATA);
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);
    jest.spyOn(services, 'deleteTransactionById');
    jest.spyOn(services, 'addQuickbookIdToTransaction');

    const handleQuickBookSelect = jest.fn();
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllRampCards handleQuickBookSelect={handleQuickBookSelect} />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await act(async () => {
      const textInput = screen.getByPlaceholderText(SEARCH_CARDS);
      fireEvent.change(textInput, { target: { value: 'Lyft' } });
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
      expect(screen.queryByTestId('search-box')).toBeInTheDocument;
    });
    await act(async () => {
      fireEvent.click(screen.getByAltText('delete'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('search-box')).toBeNull();
    });
  });

  it('should render transaction Errors', async () => {
    jest
      .spyOn(services, 'getAllTransactions')
      .mockRejectedValue(new Error('Error'));
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockRejectedValue(new Error('Error'));

    const handleQuickBookSelect = jest.fn();
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllRampCards handleQuickBookSelect={handleQuickBookSelect} />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    expect(services.getAllTransactions).toHaveReturned();
    expect(services.getAllQuickBooks).toHaveBeenCalled();
  });

  it('should render delete and select Errors', async () => {
    jest
      .spyOn(services, 'getAllTransactions')
      .mockResolvedValue(TRANSACTION_DATA);

    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);
    jest
      .spyOn(services, 'deleteTransactionById')
      .mockRejectedValue(new Error('error'));
    jest
      .spyOn(services, 'addQuickbookIdToTransaction')
      .mockRejectedValue(new Error('error'));

    const handleQuickBookSelect = jest.fn();
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllRampCards handleQuickBookSelect={handleQuickBookSelect} />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await act(async () => {
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
    });

    await waitFor(() => {
      const deleteButton = screen.getByText(DELETE);
      expect(deleteButton).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(DELETE));
    });

    await waitFor(() => {
      expect(services.deleteTransactionById).toHaveBeenCalled();
    });

    await waitFor(async () => {
      const dropDownIcon = screen.getByText(CHOOSE_ONE);
      fireEvent.mouseDown(dropDownIcon);
      fireEvent.click(screen.getAllByRole('option')[1]);
      expect(services.addQuickbookIdToTransaction).toHaveBeenCalled();
      expect(handleQuickBookSelect).toHaveBeenCalled();
    });
  });
});
