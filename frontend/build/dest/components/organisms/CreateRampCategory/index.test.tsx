import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateRampCategory from '.';
import { createRampCategory } from '../../../services/ramp-category-service';

jest.mock('../../../services/ramp-category-service');

describe('CreateRampCategory', () => {
  const onCancelClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render CreateRampCategory component correctly', () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    expect(screen.getByText(/Create Ramp Category/i)).toBeInTheDocument();
  });

  it('should handle ramp value changes correctly', async () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    const rampInput = screen.getAllByRole('textbox');
    await waitFor(() => {
      fireEvent.change(rampInput[0], { target: { value: 'New Ramp' } });
      expect(screen.getAllByText(/Ramp Category/i)[0]).toBeInTheDocument();
    });
  });

  it('should add new card correctly', async () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    const addNewButton = screen.getByText(/Add new/i);
    userEvent.click(addNewButton);
    await waitFor(() => {
      const rampInputs = screen.getAllByRole('textbox');
      expect(rampInputs.length).toBe(4);
    });
  });

  it('should cancel card correctly', async () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    const cancelIcons = screen.getAllByAltText(/close-icon/i);
    userEvent.click(cancelIcons[0]);
    await waitFor(() => {
      const rampInputs = screen.getAllByRole('textbox');
      expect(rampInputs.length).toBe(2);
    });
  });

  it('should call createRampCategory for non-empty categories', async () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    const rampInput = screen.getAllByRole('textbox');
    fireEvent.change(rampInput[0], { target: { value: 'New Ramp' } });
    const createRuleButton = screen.getByText(/Create Rule/i);
    userEvent.click(createRuleButton);
    await waitFor(() => {
      expect(createRampCategory).toHaveBeenCalledWith('New Ramp');
      expect(createRampCategory).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call createRampCategory for empty categories', async () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);

    const createRuleButton = screen.getByText(/Create Rule/i);
    userEvent.click(createRuleButton);
    await waitFor(() => {
      expect(createRampCategory).not.toHaveBeenCalled();
    });
  });

  it('should handle errors in createRampCategory correctly', async () => {
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    const rampInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(rampInput, { target: { value: 'New Ramp' } });
    const globalCheckEmailAvailabilityMock =
      require('../../../services/ramp-category-service').createRampCategory;
    globalCheckEmailAvailabilityMock.mockRejectedValue(
      new Error('Mocked error'),
    );

    const createRuleButton = screen.getByText(/Create Rule/i);
    userEvent.click(createRuleButton);
    await waitFor(() => {
      expect(screen.getByText(/Ramp categories/i)).toBeInTheDocument();
    });
  });

  it('should handle errors in the outer try-catch block correctly', async () => {
    const globalCheckEmailAvailabilityMock =
      require('../../../services/ramp-category-service').createRampCategory;
    globalCheckEmailAvailabilityMock.mockRejectedValue(
      new Error('Error creating new ramp categories:'),
    );
    render(<CreateRampCategory onCancelClick={onCancelClickMock} />);
    const rampInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(rampInput, { target: { value: 'New Ramp' } });

    const createRuleButton = screen.getByText(/Create Rule/i);
    userEvent.click(createRuleButton);
    await waitFor(() => {
      expect(screen.getByText(/Ramp categories/i)).toBeInTheDocument();
    });
  });
});
