import { render, screen } from '@testing-library/react';
import RampCardData from '.';

describe('Test Ramp card data component', () => {
  it('should render ramp card data', () => {
    render(
      <RampCardData
        countersData={{
          missingItemsCount: 73,
          merchantRuleCount: 3,
          categoryRuleCount: 2,
        }}
      />,
    );
    expect(screen.getByTestId('counter-box')).toBeInTheDocument;
  });
});
