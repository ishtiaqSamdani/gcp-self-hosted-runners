import { fireEvent, render, screen } from '@testing-library/react';
import TransactionCard from '.';
import {
  QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
  TRANSACTION_DATA,
} from '../../../utils/constants';

describe('Test Transaction card', () => {
  it('should render Transaction card', () => {
    const handleCheckBoxChange = jest.fn();
    const handleSelectChange = jest.fn();

    render(
      <TransactionCard
        quickBookData={QUICKBOOKS_CATEGORY_SELECT_OPTIONS}
        handleCheckboxClick={handleCheckBoxChange}
        handleSelectChange={handleSelectChange}
        dropdownValue=""
        transactionRowData={TRANSACTION_DATA[0]}
        checked={false}
      />,
    );

    expect(screen.getByTestId('transaction-card')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(handleCheckBoxChange).toHaveBeenCalled;

    const dropdown = screen.getByTestId('select-component');
    fireEvent.click(dropdown);
    expect(handleSelectChange).toHaveBeenCalled;
  });
});
