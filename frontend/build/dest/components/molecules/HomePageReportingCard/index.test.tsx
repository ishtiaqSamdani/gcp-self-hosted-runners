import { render, screen } from '@testing-library/react';
import HomePageReportingCard from '.';
import { REPORTING_DATA } from '../../../utils/constants';

describe('Tests Reporting component', () => {
  it('should render Reporting component', () => {
    render(
      <HomePageReportingCard
        headingContent={REPORTING_DATA[0].heading}
        textContent={REPORTING_DATA[0].textContent}
        amount={REPORTING_DATA[0].amount}
      />,
    );
    expect(screen.getByTestId('reporting')).toBeInTheDocument;
  });
});
