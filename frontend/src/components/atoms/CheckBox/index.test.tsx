import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckBox from '.';

describe('CheckBox', () => {
  test('renders checkbox and handles change', () => {
    const handleCheckBoxChangeMock = jest.fn();
    const { getByRole } = render(
      <CheckBox
        checked={false}
        handleCheckBoxChange={handleCheckBoxChangeMock}
      />,
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toHaveProperty('checked', false);
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox).toHaveProperty('checked', true);
  });
});
