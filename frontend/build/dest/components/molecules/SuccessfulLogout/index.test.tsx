import { render, screen } from '@testing-library/react';
import SuccessfulLogout from '.';
import { SUCCESS_MESSAGE } from '../../../utils/constants';

describe('Tests Successful logout component', () => {
  it('should render successful logout', () => {
    render(<SuccessfulLogout />);
    expect(screen.getByTestId('successful-logout')).toBeInTheDocument;
    expect(screen.getByText(SUCCESS_MESSAGE)).toBeInTheDocument;
  });
});
