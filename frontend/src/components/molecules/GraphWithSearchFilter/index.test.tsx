import { render, screen } from '@testing-library/react';
import GraphWithSearchFilter from '.';

describe('Tests Graph with search component', () => {
  it('should render Graph with search', () => {
    render(<GraphWithSearchFilter />);
    expect(screen.getByTestId('graph-with-search')).toBeInTheDocument;

    const textfield = screen.getByRole('textbox');
    expect(textfield).toBeInTheDocument;
  });
});
