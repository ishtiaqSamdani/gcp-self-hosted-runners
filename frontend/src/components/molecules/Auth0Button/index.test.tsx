import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Auth0Button from '.';

describe('Auth0Button', () => {
  test('renders Auth0Button with correct props', () => {
    const buttonText = 'Sign in with Google';
    const onClickMock = jest.fn();
    render(<Auth0Button buttonText={buttonText} onClick={onClickMock} />);
    const googleIcon = screen.getByAltText('google');
    const textElement = screen.getByText(buttonText);
    expect(googleIcon).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  test('should call onClick event on clicking Auth0Button', () => {
    const buttonText = 'Sign in with Google';
    const onClickMock = jest.fn();
    render(<Auth0Button buttonText={buttonText} onClick={onClickMock} />);
    const googleIcon = screen.getByAltText('google');
    const textElement = screen.getByText(buttonText);
    expect(googleIcon).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    fireEvent.click(googleIcon);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
