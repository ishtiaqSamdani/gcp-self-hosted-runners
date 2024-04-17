import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CreateMerchantRuleComponent, {
  CreateMerchantRuleComponentProps,
} from '.';

export default {
  title: 'Organisms/CreateMerchantRuleComponent',
  component: CreateMerchantRuleComponent,
} as Meta;

const Template: StoryFn<CreateMerchantRuleComponentProps> = (args) => (
  <CreateMerchantRuleComponent {...args} />
);

export const WithUnsyncedTransactions = Template.bind({});
WithUnsyncedTransactions.args = {
  onCancelClick: () => {},
  onCreateRuleClick: () => {},
};
