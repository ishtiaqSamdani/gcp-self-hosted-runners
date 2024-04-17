import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import CreateCategoryRule from '.';
import {
  ACTIVE_RULES,
  CATEGORY_RULES,
  CATEGORY_RULE_TEXT,
  CREATE_CATEGORY_RULE,
  QUICKBOOK_CATEGORIES,
  RECENT_CATEGORIES,
} from '../../../utils/constants';
import * as services from '../../../services/transaction-service';
import { CategoryRuleInformationType } from '../../../utils/types';
import { AuthProvider } from '../../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const CATEGORY_RULE_DATA: CategoryRuleInformationType = {
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
};

describe('Tests Category rule modal', () => {
  it('should render category rule modal', async () => {
    jest
      .spyOn(services, 'getCategoryRuleInformation')
      .mockResolvedValue(CATEGORY_RULE_DATA);
    jest.spyOn(services, 'createCategoryRule').mockResolvedValue();
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);

    const handleCancelClick = jest.fn();
    const handleCreateClick = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <CreateCategoryRule
              handleCancelClick={handleCancelClick}
              onCreateRuleClick={handleCreateClick}
            />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    const categoryRule = screen.getByTestId('modal');
    expect(categoryRule).toBeInTheDocument;
    expect(screen.getByText(CREATE_CATEGORY_RULE)).toBeInTheDocument;
    expect(screen.getByText(CATEGORY_RULES)).toBeInTheDocument;
    expect(screen.getByText(CATEGORY_RULE_TEXT)).toBeInTheDocument;
    expect(screen.getByText(ACTIVE_RULES)).toBeInTheDocument;
    expect(screen.getByText(RECENT_CATEGORIES)).toBeInTheDocument;
  });

  it('should handle textfield changes', async () => {
    jest
      .spyOn(services, 'getCategoryRuleInformation')
      .mockResolvedValue(CATEGORY_RULE_DATA);
    jest.spyOn(services, 'createCategoryRule').mockResolvedValue();
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);

    const handleCancelClick = jest.fn();
    const handleFetchCategoryRuleCount = jest.fn();
    const handleCreateClick = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <CreateCategoryRule
              handleCancelClick={handleCancelClick}
              onCreateRuleClick={handleCreateClick}
            />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(async () => {
      expect(screen.getAllByRole('combobox').length).toBe(2);
      fireEvent.mouseDown(screen.getAllByRole('combobox')[1]);
      fireEvent.click(screen.getAllByRole('option')[1]);
      expect(screen.getAllByText('Expense').length).toBe(2);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);

      fireEvent.click(buttons[1]);
      expect(services.createCategoryRule).toHaveBeenCalled;
      expect(handleFetchCategoryRuleCount).toHaveBeenCalled;
    });
  });

  it('should handle error from service calls', async () => {
    jest
      .spyOn(services, 'getCategoryRuleInformation')
      .mockRejectedValue(new Error('Error'));
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockRejectedValue(new Error('Error'));

    const handleCancelClick = jest.fn();
    const handleCreateClick = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <CreateCategoryRule
              handleCancelClick={handleCancelClick}
              onCreateRuleClick={handleCreateClick}
            />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(async () => {
      expect(services.getCategoryRuleInformation).toHaveBeenCalled;
      expect(services.getAllQuickBooks).toHaveBeenCalled;
    });
  });

  it('should handle for empty recent category', async () => {
    const CATEGORY_RULE_INCOMPLETE_DATA: CategoryRuleInformationType = {
      activeRules: [
        {
          rampId: 1,
          rampName: 'Aircraft',
          quickBookId: 1,
          quickBookName: 'Travel',
        },
      ],
      recentCategory: [],
    };

    jest
      .spyOn(services, 'getCategoryRuleInformation')
      .mockResolvedValue(CATEGORY_RULE_INCOMPLETE_DATA);
    jest.spyOn(services, 'createCategoryRule').mockResolvedValue();
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);

    const handleCancelClick = jest.fn();
    const handleCreateClick = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <CreateCategoryRule
              handleCancelClick={handleCancelClick}
              onCreateRuleClick={handleCreateClick}
            />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(async () => {
      expect(screen.queryByText(RECENT_CATEGORIES)).toBeNull;
      expect(screen.getAllByRole('combobox').length).toBe(1);
    });
  });

  it('should handle for empty active rules category', async () => {
    const CATEGORY_RULE_INCOMPLETE_DATA: CategoryRuleInformationType = {
      activeRules: [],
      recentCategory: [
        {
          rampId: 2,
          rampName: 'Fuel and Gas',
          quickBookId: 0,
          quickBookName: '',
        },
      ],
    };

    jest
      .spyOn(services, 'getCategoryRuleInformation')
      .mockResolvedValue(CATEGORY_RULE_INCOMPLETE_DATA);
    jest.spyOn(services, 'createCategoryRule').mockResolvedValue();
    jest
      .spyOn(services, 'getAllQuickBooks')
      .mockResolvedValue(QUICKBOOK_CATEGORIES);

    const handleCancelClick = jest.fn();
    const handleCreateClick = jest.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <CreateCategoryRule
              handleCancelClick={handleCancelClick}
              onCreateRuleClick={handleCreateClick}
            />
          </AuthProvider>
        </BrowserRouter>,
      );
    });

    await waitFor(async () => {
      expect(screen.queryByText(ACTIVE_RULES)).toBeNull;
      expect(screen.getAllByRole('combobox').length).toBe(1);
    });
  });
});
