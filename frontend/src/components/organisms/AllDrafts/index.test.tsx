import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import AllDrafts from '.';
import * as services from '../../../services/transaction-service';
import { APPROVE, DRAFTS_DATA, SEARCH_CARDS } from '../../../utils/constants';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('All drafts component', () => {
  it('test renders without crashing', () => {
    jest.spyOn(services, 'getAllDraftedBills').mockResolvedValue(DRAFTS_DATA);
    jest
      .spyOn(services, 'updateDraftedBillWithStatus')
      .mockResolvedValue(Promise.resolve());
    render(
      <BrowserRouter>
        <AuthProvider>
          <AllDrafts />
        </AuthProvider>
      </BrowserRouter>,
    );
  });

  it(' test displays the correct header text', () => {
    jest.spyOn(services, 'getAllDraftedBills').mockResolvedValue(DRAFTS_DATA);
    jest
      .spyOn(services, 'updateDraftedBillWithStatus')
      .mockResolvedValue(Promise.resolve());
    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <AllDrafts />
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(getByText('Drafts')).toBeInTheDocument();
  });

  it('test displays the correct number of draft reimbursement cards and handles functions', async () => {
    jest.spyOn(services, 'getAllDraftedBills').mockResolvedValue(DRAFTS_DATA);
    jest
      .spyOn(services, 'updateDraftedBillWithStatus')
      .mockResolvedValue(Promise.resolve());
    await act(() => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllDrafts />
          </AuthProvider>
        </BrowserRouter>,
      );
    });
    await waitFor(() => {
      const draftCards = screen.getAllByTestId('draft-reimbursement-card');
      expect(draftCards.length).toBe(3);
    });
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
      const approveButton = screen.getAllByText(APPROVE);
      expect(approveButton.length).toBe(2);
    });

    await act(async () => {
      fireEvent.click(screen.getAllByText(APPROVE)[1]);
    });

    await waitFor(() => {
      expect(services.updateDraftedBillWithStatus).toHaveBeenCalled();
    });
  });

  it('test the search functionality', async () => {
    jest.spyOn(services, 'getAllDraftedBills').mockResolvedValue(DRAFTS_DATA);
    jest
      .spyOn(services, 'updateDraftedBillWithStatus')
      .mockResolvedValue(Promise.resolve());
    await act(() => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllDrafts />
          </AuthProvider>
        </BrowserRouter>,
      );
    });
    await act(async () => {
      const textInput = screen.getByPlaceholderText(SEARCH_CARDS);
      fireEvent.change(textInput, { target: { value: 'Marvin' } });
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

  it('test the error conditions for get draft bills', async () => {
    jest
      .spyOn(services, 'getAllDraftedBills')
      .mockRejectedValue(new Error('Error'));
    await act(() => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllDrafts />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId('draft-reimbursement-card')).toBeNull();
    });
  });

  it('test the error conditions for update draft bills', async () => {
    jest.spyOn(services, 'getAllDraftedBills').mockResolvedValue(DRAFTS_DATA);
    jest
      .spyOn(services, 'updateDraftedBillWithStatus')
      .mockRejectedValue(new Error('error'));
    await act(() => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AllDrafts />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.queryAllByTestId('draft-reimbursement-card').length).toBe(
        3,
      );
    });

    await act(async () => {
      const checkboxes = screen.getAllByRole('checkbox');

      fireEvent.click(checkboxes[0]);
      fireEvent.click(screen.getAllByText(APPROVE)[1]);
    });

    await waitFor(() => {
      expect(services.updateDraftedBillWithStatus).toHaveBeenCalled();
    });
  });
});
