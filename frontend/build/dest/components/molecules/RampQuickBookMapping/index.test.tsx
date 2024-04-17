import { render, screen } from '@testing-library/react';
import RampQuickBookMapping from '.';
import {
  QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
  RAMP_CATEGORY_DATA,
} from '../../../utils/constants';

describe('Tests ramp quick book mapping', () => {
  it('should render unmapped ramp quick book category', () => {
    const handleQuickBookChange = jest.fn();
    render(
      <RampQuickBookMapping
        quickbookItems={QUICKBOOKS_CATEGORY_SELECT_OPTIONS}
        rampPlaceholder={RAMP_CATEGORY_DATA[3]}
        handleQuickBookChange={handleQuickBookChange}
        quickBookValue=""
        mappedRamp={false}
      />,
    );

    expect(screen.getByTestId('ramp-quickbook')).toBeInTheDocument;
  });

  it('should render mapped ramp quick book category', () => {
    const handleQuickBookChange = jest.fn();
    render(
      <RampQuickBookMapping
        quickbookItems={[]}
        rampPlaceholder={RAMP_CATEGORY_DATA[0]}
        handleQuickBookChange={handleQuickBookChange}
        quickBookValue={QUICKBOOKS_CATEGORY_SELECT_OPTIONS[0]}
        mappedRamp={true}
      />,
    );

    expect(screen.getByTestId('ramp-quickbook')).toBeInTheDocument;
  });
});
