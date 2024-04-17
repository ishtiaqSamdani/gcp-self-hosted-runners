import { fireEvent, render, screen } from '@testing-library/react';
import SkipPrefillingModal from '.';

describe('Tests SkipPrefillingModal', () => {
  it('should render SkipPrefilling modal', () => {
    const mockSkipButtonHandler = jest.fn();
    render(
      <SkipPrefillingModal handleSkipButtonClick={mockSkipButtonHandler} />,
    );

    expect(screen.getByTestId('skip-prefilling')).toBeInTheDocument;

    const skipButton = screen.getByRole('button');
    fireEvent.click(skipButton);
    expect(mockSkipButtonHandler).toHaveBeenCalled;
  });
});
