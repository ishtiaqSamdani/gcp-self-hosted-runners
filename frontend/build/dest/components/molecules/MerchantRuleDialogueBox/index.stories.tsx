import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MerchantRuleDiaogueBox from '.';
import {
  MERCHANT_RULE_DESCRIPTION,
  MERCHANT_RULE_HEAD,
} from '../../../utils/constants';

const meta: Meta<typeof MerchantRuleDiaogueBox> = {
  title: 'Molecule/MerchantRuleDiaogueBox',
  component: MerchantRuleDiaogueBox,
};

const handleClose = action('close icon clicked !');
const handleButtonClick = action('create button clicked !');

export default meta;
type Story = StoryObj<typeof MerchantRuleDiaogueBox>;

export const Default: Story = {
  args: {
    onClose: handleClose,
    onCreate: handleButtonClick,
    headText: MERCHANT_RULE_HEAD,
    description: MERCHANT_RULE_DESCRIPTION,
  },
};
