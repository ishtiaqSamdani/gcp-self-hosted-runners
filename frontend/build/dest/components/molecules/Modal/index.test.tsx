import { render, screen } from '@testing-library/react';
import Modal from '.';
import { CREATE_MERCHANT_RULE } from '../../../utils/constants';

describe('Tests Modal component', () => {
  it('should render Modal component', () => {
    render(
      <Modal
        width="30%"
        headingContent={CREATE_MERCHANT_RULE}
        handleCancelClick={jest.fn()}
        handleCreateRuleClick={jest.fn()}
        textContent=""
      />,
    );
    expect(screen.getByTestId('modal')).toBeInTheDocument;
    expect(screen.getByText(CREATE_MERCHANT_RULE)).toBeInTheDocument;
    expect(screen.getAllByRole('button').length).toBe(2);
  });
});
