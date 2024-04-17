import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectComponent from '.';
import {
  QUICKBOOKS_CATEGORY_SELECT_OPTIONS,
  QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER,
} from '../../../utils/constants';

describe('SelectComponent', () => {
  const items = QUICKBOOKS_CATEGORY_SELECT_OPTIONS;
  const placeholder = QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER;
  const value = QUICKBOOKS_CATEGORY_SELECT_OPTIONS[0];

  it('renders the SelectComponent with placeholder initially', () => {
    const { getByTestId } = render(
      <SelectComponent items={items} value="" placeholder={placeholder} />,
    );

    const selectComponent = getByTestId('select-component');
    expect(selectComponent).toBeInTheDocument();
    expect(selectComponent).toHaveTextContent(placeholder);
  });

  it('renders the SelectComponent with value when given initially', () => {
    const { getByTestId } = render(
      <SelectComponent items={items} value={value} placeholder={placeholder} />,
    );
    const selectComponent = getByTestId('select-component');
    expect(selectComponent).toBeInTheDocument();
    expect(selectComponent).toHaveTextContent(value);
  });
});
