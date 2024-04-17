import { fireEvent, render, screen } from '@testing-library/react';
import RampCardSelector from '.';
import { AIRLINE, FUEL_AND_GAS, RAMP_CATEGORY } from '../../../utils/constants';

describe('Test Ramp Selector component', () => {
  it('should render ramp selector', () => {
    const handleRampChange = jest.fn();
    render(
      <RampCardSelector
        rampValue={AIRLINE}
        handleRampChange={handleRampChange}
      />,
    );
    expect(screen.getByTestId('ramp-selector')).toBeInTheDocument;
    expect(screen.getByText(RAMP_CATEGORY)).toBeInTheDocument;

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, { target: { value: FUEL_AND_GAS } });

    expect(handleRampChange).toHaveBeenCalled();
  });
});
