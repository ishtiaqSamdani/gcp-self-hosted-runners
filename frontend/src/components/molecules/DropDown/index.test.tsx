import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from '.';
import { REIMBURSEMENT } from '../../../utils/constants';

const mockHandleSelectClicks = jest.fn();
const mockHandleChange = jest.fn();

describe('DropdDown Component', () => {
  it('renders DropDown component with correct options and placeholder', async () => {
    render(
      <DropDown
        dropDownVariant={'active'}
        value={'Option1'}
        items={['Option1', 'Option2', 'Option3']}
        disabled={false}
        placeholder={REIMBURSEMENT}
        handleChange={mockHandleChange}
        onSelectClick={mockHandleSelectClicks}
      />,
    );
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText(REIMBURSEMENT)).toBeInTheDocument();
  });

  it('renders DropDown component with mousedown', async () => {
    render(
      <DropDown
        dropDownVariant={'active'}
        value={'Option1'}
        items={['Option1', 'Option2', 'Option3']}
        placeholder={REIMBURSEMENT}
        handleChange={mockHandleChange}
        onSelectClick={mockHandleSelectClicks}
      />,
    );
    const dropDownIcon = screen.getByText(REIMBURSEMENT);
    fireEvent.mouseDown(dropDownIcon);
    fireEvent.click(screen.getAllByRole('option')[1]);
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('should render the inactive and disabled dropdown variant', () => {
    render(
      <DropDown
        dropDownVariant={'inactive'}
        value={'Option1'}
        items={['Option1', 'Option2', 'Option3']}
        disabled={true}
        placeholder={REIMBURSEMENT}
        handleChange={mockHandleChange}
        onSelectClick={mockHandleSelectClicks}
      />,
    );
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(dropdown);
    expect(mockHandleSelectClicks).toHaveBeenCalled();
  });
});
