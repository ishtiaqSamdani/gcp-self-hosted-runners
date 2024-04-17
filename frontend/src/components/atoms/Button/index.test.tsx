import { fireEvent, render, screen } from '@testing-library/react';
import Button from '.';
import theme from '../../../theme';

describe('Tests Button component', () => {
  it('should render Button component', () => {
    render(
      <Button
        variant="contained"
        backgroundColor={'primary500'}
        width={'200px'}
        labelColor={theme.palette.white.main}
        label={''}
      />,
    );
    expect(screen.getByTestId('button-element')).toBeInTheDocument();
  });

  it('should handle Button click', () => {
    const handleClick = jest.fn();
    render(
      <Button
        variant="outlined"
        backgroundColor={'white'}
        width={'200px'}
        labelColor={theme.palette.mediumEmphasis.main}
        onClick={handleClick}
        label={''}
      />,
    );
    const buttonEle = screen.getByTestId('button-element');
    expect(buttonEle).toBeInTheDocument();
    fireEvent.click(buttonEle);
    expect(handleClick).toHaveBeenCalled();
  });
});
