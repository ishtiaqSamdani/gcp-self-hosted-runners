import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MerchantRuleDiaogueBox from './';
import { CREATE_RULE } from '../../../utils/constants';

describe('MerchantRuleDiaogueBox', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <MerchantRuleDiaogueBox
        onCreate={() => {}}
        onClose={() => {}}
        headText="Test Head Text"
        description="Test Description"
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should call onCreate when the create button is clicked', () => {
    const onCreateMock = jest.fn();
    const { getByText } = render(
      <MerchantRuleDiaogueBox
        onCreate={onCreateMock}
        onClose={() => {}}
        headText="Test Head Text"
        description="Test Description"
      />,
    );
    fireEvent.click(getByText(CREATE_RULE));
    expect(onCreateMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the cancel icon is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByAltText } = render(
      <MerchantRuleDiaogueBox
        onCreate={() => {}}
        onClose={onCloseMock}
        headText="Test Head Text"
        description="Test Description"
      />,
    );
    fireEvent.click(getByAltText('cancel-icon'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
