import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from '.';
import { BrowserRouter } from 'react-router-dom';
import { RAMP_PERKS, TAB_HEADINGS } from '../../../utils/constants';
import { RampTabsContextProvider } from '../../../contexts/RampTabsContext';

describe('Tests Navbar component', () => {
  it('should render navbar', () => {
    render(
      <BrowserRouter>
        <RampTabsContextProvider>
          <NavBar />
        </RampTabsContextProvider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('tab')).toBeInTheDocument;
    expect(screen.getByTestId('header')).toBeInTheDocument;
    expect(screen.getByTestId('chip')).toBeInTheDocument;
    expect(screen.getByAltText('profile')).toBeInTheDocument;

    TAB_HEADINGS.map((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument;
    });

    expect(screen.getByText(RAMP_PERKS)).toBeInTheDocument;
  });

  it('should handle dropdown changes in navbar', () => {
    render(
      <BrowserRouter>
        <RampTabsContextProvider>
          <NavBar />
        </RampTabsContextProvider>
      </BrowserRouter>,
    );

    const reimbursement = screen.getByText(TAB_HEADINGS[6]);
    fireEvent.click(reimbursement);

    fireEvent.mouseDown(screen.getAllByRole('combobox')[6]);
    expect(screen.getAllByRole('option').length).toBe(2);

    fireEvent.click(screen.getAllByRole('option')[1]);

    fireEvent.mouseDown(screen.getAllByRole('combobox')[6]);
    fireEvent.click(screen.getAllByRole('option')[0]);

    const otherTabs = screen.getByText(TAB_HEADINGS[5]);
    fireEvent.click(otherTabs);

    const rampPerk = screen.getByText(RAMP_PERKS);
    fireEvent.click(rampPerk);

    const insights = screen.getByText(TAB_HEADINGS[0]);
    fireEvent.click(insights);

    const accounting = screen.getByText(TAB_HEADINGS[7]);
    fireEvent.click(accounting);
  });
});
