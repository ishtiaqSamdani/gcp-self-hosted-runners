import React from 'react';
import BillInfoLastLook, { BillInfoProps } from '.';
import { EMPTY_DATE } from '../../../utils/constants';
import { NewBillFormData } from '../../../utils/types';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Organisms/BillInfoLastLook',
  component: BillInfoLastLook,
};

export default meta;
type Story = StoryObj<BillInfoProps>;

const mockFormData: NewBillFormData = {
  invoiceTotal: 500,
  invoiceNumber: 'abcd',
  employeeContact: 'abcd',
  invoiceDate: EMPTY_DATE,
  billDueDate: EMPTY_DATE,
  memo: 'abcd',
  employeeName: 'abcd',
  quickBookLocation: 'abcd',
  paymentType: 'abcd',
};

export const Default: Story = {
  args: { formState: mockFormData },
};
