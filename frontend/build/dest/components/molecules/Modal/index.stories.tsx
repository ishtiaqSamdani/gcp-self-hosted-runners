import React from 'react';
import { Meta } from '@storybook/react';
import Modal from '.';
import theme from '../../../theme';
import {
  CREATE_MERCHANT_RULE,
  MERCHANT_RULE_TEXT_LINE1,
  MERCHANT_RULE_TEXT_LINE2,
} from '../../../utils/constants';
import Typography from '../../atoms/Typography';

const MERCHANT_TEXT_CONTENT = (
  <Typography variant="body2" color={theme.palette.highEmphasis.main}>
    {MERCHANT_RULE_TEXT_LINE1 + MERCHANT_RULE_TEXT_LINE2}
  </Typography>
);

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
};

export default meta;

export const MerchantRuleModal = {
  args: {
    width: '30%',
    headingContent: CREATE_MERCHANT_RULE,
    handleCancelClick: () => {},
    handleCreateRuleClick: () => {},
    textContent: MERCHANT_TEXT_CONTENT,
  },
};
