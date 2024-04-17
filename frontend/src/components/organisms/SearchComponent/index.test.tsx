import {
  screen,
  render,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchComponent from '.';
import {
  APPROVE,
  DELETE,
  REJECT,
  SEARCH_COMPONENT_PLACEHOLDER,
} from '../../../utils/constants';

const mockOnSearchItemClick = jest.fn();
const mockDeleteClick = jest.fn();
describe('SearchComponent component unit test', () => {
  it('should render search component', () => {
    render(
      <SearchComponent
        onSearchItemClick={mockOnSearchItemClick}
        selectedTransaction={false}
        handleDeleteClick={mockDeleteClick}
        showRightButtons={true}
      />,
    );
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });

  it('should fill search text and get the search suggestion card', () => {
    render(
      <SearchComponent
        onSearchItemClick={mockOnSearchItemClick}
        selectedTransaction={false}
        handleDeleteClick={mockDeleteClick}
        showRightButtons={true}
      />,
    );
    const searchInput = screen.getByPlaceholderText(
      SEARCH_COMPONENT_PLACEHOLDER,
    );
    fireEvent.change(searchInput, { target: { value: 'example' } });
    expect(screen.getByTestId('suggestion-card')).toBeInTheDocument();
  });

  it('should click the searched text and unmount the suggestion card', async () => {
    render(
      <SearchComponent
        onSearchItemClick={mockOnSearchItemClick}
        selectedTransaction={true}
        handleDeleteClick={mockDeleteClick}
        showRightButtons={true}
      />,
    );
    const searchInput = screen.getByPlaceholderText(
      SEARCH_COMPONENT_PLACEHOLDER,
    );
    fireEvent.change(searchInput, { target: { value: 'example' } });
    expect(screen.getByTestId('suggestion-card')).toBeInTheDocument();
    const clickableTextContainer = screen.getByTestId('clickable-search-text');
    fireEvent.click(clickableTextContainer);
    expect(screen.queryByTestId('suggestion-card')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(mockOnSearchItemClick).toHaveBeenCalled();
      expect(screen.queryByTestId('search-box')).toBeInTheDocument;
    });
    await act(async () => {
      fireEvent.click(screen.getByAltText('delete'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('search-box')).toBeNull();
    });

    const deleteButton = screen.getByText(DELETE);
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(screen.getByText(DELETE));
    expect(mockDeleteClick).toHaveBeenCalled();
  });

  it('should handle Approve button clicks', () => {
    const mockApproveClick = jest.fn();
    render(
      <SearchComponent
        onSearchItemClick={mockOnSearchItemClick}
        showRightButtons={false}
        handleApproveClick={mockApproveClick}
        selectedBill={true}
      />,
    );
    expect(screen.getByText(APPROVE)).toBeInTheDocument;
    expect(screen.getByText(REJECT)).toBeInTheDocument;

    fireEvent.click(screen.getByText(APPROVE));

    expect(mockApproveClick).toHaveBeenCalled;
  });
});
