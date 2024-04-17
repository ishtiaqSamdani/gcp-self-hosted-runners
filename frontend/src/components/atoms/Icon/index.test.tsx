import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconComponent from '.';
import google from '../../../../public/assets/icons/google.svg';

describe('Icon Component', () => {
  test('should render with correct src and alt attributes', () => {
    render(<IconComponent src={google} iconAlt="google-icon" />);
    const imageElement = screen.getByAltText('google-icon');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('alt', 'google-icon');
  });

  it('should not call onClick when Enter key is pressed but no onclick function', () => {
    const onClickMock = jest.fn();
    render(<IconComponent iconAlt="google-icon" src="path/to/icon.png" />);

    const imageElement = screen.getByAltText('google-icon');
    fireEvent.keyDown(imageElement, { key: 'Enter' });
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });

  it('should not call onClick when other key is pressed', () => {
    const onClickMock = jest.fn();
    render(<IconComponent iconAlt="google-icon" src="path/to/icon.png" />);

    const imageElement = screen.getByAltText('google-icon');
    fireEvent.keyDown(imageElement, { key: ' ' });
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
});
