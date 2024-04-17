import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BillingSection from '.';
import { BillDetails } from '../../../utils/types';
import {
  AMOUNT,
  CATEGORY,
  CLASS,
  CUSTOM_JOB,
  QUICKBOOK_DESCRIPTION,
} from '../../../utils/constants';

describe('BillingSection component', () => {
  test('test renders with initial values', () => {
    const onDeleteMock = jest.fn();
    const handleBillableMock = jest.fn();
    const mockAmountInput = jest.fn();
    const formDataMock: BillDetails = {
      amount: 100,
      quickbookDescription: 'Test description',
      category: 'TestCategory',
      class: 'TestClass',
      customJob: 'TestCustomJob',
      id: 22,
    };

    render(
      <BillingSection
        formdata={formDataMock}
        onDelete={onDeleteMock}
        handleBillable={handleBillableMock}
        onInputChange={mockAmountInput}
      />,
    );

    expect(screen.getByPlaceholderText(/amount/i)).toHaveValue(100);
    expect(screen.getByPlaceholderText(/quickbook description/i)).toHaveValue(
      'Test description',
    );
    expect(screen.getByPlaceholderText(/category/i)).toHaveValue(
      'TestCategory',
    );
    expect(screen.getByPlaceholderText(/class/i)).toHaveValue('TestClass');
    expect(screen.getByPlaceholderText(CUSTOM_JOB)).toHaveValue(
      'TestCustomJob',
    );
  });

  test('test calls onDelete when the delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    const handleBillableMock = jest.fn();
    const mockAmountInput = jest.fn();

    render(
      <BillingSection
        onDelete={onDeleteMock}
        handleBillable={handleBillableMock}
        onInputChange={mockAmountInput}
      />,
    );

    fireEvent.click(screen.getByAltText(/trash-icon/i));

    expect(onDeleteMock).toHaveBeenCalled();
  });

  test('test calls handleBillable when the billable button is clicked', () => {
    const onDeleteMock = jest.fn();
    const handleBillableMock = jest.fn();
    const mockAmountInput = jest.fn();

    render(
      <BillingSection
        onDelete={onDeleteMock}
        handleBillable={handleBillableMock}
        onInputChange={mockAmountInput}
      />,
    );

    fireEvent.click(screen.getByText(/billable/i));

    expect(handleBillableMock).toHaveBeenCalled();
  });

  test('test updates state on input changes', () => {
    const onDeleteMock = jest.fn();
    const handleBillableMock = jest.fn();
    const mockAmountInput = jest.fn();
    render(
      <BillingSection
        onDelete={onDeleteMock}
        handleBillable={handleBillableMock}
        onInputChange={mockAmountInput}
      />,
    );

    const testData = {
      amount: 200,
      quickbookDescription: 'Updated description',
      category: 'UpdatedCategory',
      class: 'UpdatedClass',
      customJob: 'UpdatedCustomJob',
    };

    fireEvent.change(screen.getByPlaceholderText(AMOUNT), {
      target: { value: testData.amount },
    });
    const amountInput = screen.getByPlaceholderText(AMOUNT);
    fireEvent.change(amountInput, { target: { value: 500 } });
    fireEvent.change(screen.getByPlaceholderText(QUICKBOOK_DESCRIPTION), {
      target: { value: testData.quickbookDescription },
    });
    fireEvent.change(screen.getByPlaceholderText(CATEGORY), {
      target: { value: testData.category },
    });
    fireEvent.change(screen.getByPlaceholderText(CLASS), {
      target: { value: testData.class },
    });
    fireEvent.change(screen.getByPlaceholderText(CUSTOM_JOB), {
      target: { value: testData.customJob },
    });

    expect(onDeleteMock).not.toHaveBeenCalled();
    expect(handleBillableMock).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText(AMOUNT)).toHaveValue(500);
    expect(screen.getByPlaceholderText(QUICKBOOK_DESCRIPTION)).toHaveValue(
      testData.quickbookDescription,
    );
    expect(screen.getByPlaceholderText(CATEGORY)).toHaveValue(
      testData.category,
    );
    expect(screen.getByPlaceholderText(CLASS)).toHaveValue(testData.class);
    expect(screen.getByPlaceholderText(CUSTOM_JOB)).toHaveValue(
      testData.customJob,
    );
  });
});
