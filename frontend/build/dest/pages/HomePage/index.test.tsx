import React from 'react';
import HomePage from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DRAFTS, REPORTING_DATA, TAB_HEADINGS } from '../../utils/constants';
import { RampTabsContextProvider } from '../../contexts/RampTabsContext';
import { AuthProvider } from '../../contexts/AuthContext';

test('renders HomePage component', () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthProvider>
        <RampTabsContextProvider>
          <HomePage />
        </RampTabsContextProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
  expect(getByText(/reporting/i)).toBeInTheDocument();
});

test('renders ReportingCardStack with data', () => {
  const { getAllByText } = render(
    <BrowserRouter>
      <AuthProvider>
        <RampTabsContextProvider>
          <HomePage />
        </RampTabsContextProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
  expect(getAllByText(REPORTING_DATA[0].heading)[0]).toBeInTheDocument();
  expect(getAllByText(REPORTING_DATA[0].textContent)[0]).toBeInTheDocument();
  expect(
    getAllByText(REPORTING_DATA[0].amount.toString())[0],
  ).toBeInTheDocument();
});

test('renders Reimbursement and Accounting Tab', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <RampTabsContextProvider>
          <HomePage />
        </RampTabsContextProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
  const reimbursement = screen.getByText(TAB_HEADINGS[6]);
  fireEvent.click(reimbursement);
  expect(screen.getByText(DRAFTS)).toBeInTheDocument;

  fireEvent.click(screen.getByText(TAB_HEADINGS[7]));
  expect(screen.queryByText(DRAFTS)).toBeNull;
});
