import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReimbursementTab from '.';
import { RampTabsContextProvider } from '../../contexts/RampTabsContext';

test('renders Reimbursement component', () => {
  render(
    <BrowserRouter>
      <RampTabsContextProvider>
        <ReimbursementTab />
      </RampTabsContextProvider>
    </BrowserRouter>,
  );
  expect(screen.getByTestId('reimbursement-tab')).toBeInTheDocument;
});
