import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReimbursementTab from '.';
import { RampTabsContextProvider } from '../../contexts/RampTabsContext';
import { AuthProvider } from '../../contexts/AuthContext';

test('renders Reimbursement component', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <RampTabsContextProvider>
          <ReimbursementTab />
        </RampTabsContextProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
  expect(screen.getByTestId('reimbursement-tab')).toBeInTheDocument;
});
