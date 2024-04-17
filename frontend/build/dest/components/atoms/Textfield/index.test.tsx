import { fireEvent, render, screen } from '@testing-library/react';
import TextField from '.';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '../../../../public/assets/icons/searchicon.svg';

describe('Tests Textfield component', () => {
  it('should render textfield component', () => {
    render(<TextField variant={'outlined'} width={'334px'} height={'44px'} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument;
  });

  it('should render textfield with starticon and end icon', () => {
    const handleChange = jest.fn((event) => {
      return {
        target: {
          value: event.target.value,
        },
      };
    });

    render(
      <TextField
        variant={'outlined'}
        iconStart={<img src={SearchIcon} alt="search" />}
        iconEnd={<VisibilityOffIcon />}
        onChange={handleChange}
      />,
    );
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument;
    fireEvent.change(textbox, { target: { value: 'email' } });
    expect(handleChange).toHaveBeenCalled();
    const call = handleChange.mock.calls[0][0];
    expect(call.target.value).toEqual('email');
  });
});
