import { Box, Stack, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import {
  ADDED_BY,
  APPROVED_BY,
  AUTO_APPROVED,
  ESTIMATED_ARRIVAL,
  ONE_LAST_LOOK,
  PAY,
  PAYMENT_METHOD,
  PAYMENT_OPTIONS,
  RANDOM_MONEY,
  SAVING_ACCOUNT,
  SCHEDULED_DATE,
  SEND_TO,
  SEND_TO_VALUE,
  TO,
  WITHDRAW_FROM,
  WITHDRAW_FROM_VALUE,
} from '../../../utils/constants';
import TextField from '../../atoms/Textfield';
import IconComponent from '../../atoms/Icon';
import CheckIcon from '../../../../public/assets/icons/check.svg';
import InfoIcon from '../../../../public/assets/icons/info.svg';
import { NewBillFormData } from '../../../utils/types';

export interface BillInfoProps {
  formState: NewBillFormData;
}

const MainContainer = styled(Stack)({
  flexDirection: 'column',
  width: '100%',
});

const TypographySection = styled(Stack)({
  flexDirection: 'row',
  marginTop: theme.spacing(2),
  alignItems: 'flex-end',
  gap: theme.spacing(1),
});

const InputFieldSection = styled(Stack)({
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(4),
});

const SubTypographyText = styled(Stack)({
  flexDirection: 'row',
  marginLeft: theme.spacing(1.5),
  gap: theme.spacing(1),
});

const ApprovalBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.75rem',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: theme.palette.white.main,
  border: `1px solid ${theme.palette.neutral[100]}`,
  width: '20.875rem',
  alignItems: 'center',
  margin: '0.75rem 0',
});

const ApprovalContainer = styled(Stack)({
  marginTop: theme.spacing(4),
});

const BillInfoLastLook = ({ formState }: BillInfoProps) => {
  return (
    <MainContainer>
      <Typography variant={'body2'} color={theme.palette.mediumEmphasis.main}>
        {ONE_LAST_LOOK}
      </Typography>
      <TypographySection>
        <Typography variant={'body3'} color={theme.palette.mediumEmphasis.main}>
          {PAY}
        </Typography>
        <Typography
          variant={'subtitle2'}
          color={theme.palette.highEmphasis.main}
        >
          {`$${formState.invoiceTotal > 0 ? formState.invoiceTotal : 0}.00`}
        </Typography>
        <Typography variant={'body3'} color={theme.palette.mediumEmphasis.main}>
          {TO}
        </Typography>
        <Typography
          variant={'subtitle2'}
          color={theme.palette.highEmphasis.main}
        >
          {formState.employeeName}
        </Typography>
      </TypographySection>
      <InputFieldSection>
        <Typography variant={'body2'} color={theme.palette.mediumEmphasis.main}>
          {PAYMENT_METHOD}
        </Typography>
        <TextField
          variant={'outlined'}
          placeholder={PAYMENT_METHOD}
          width="100%"
          height="28px"
          borderRadius="8px"
          value={formState.paymentType ?? PAYMENT_OPTIONS[0].head}
        />
      </InputFieldSection>
      <InputFieldSection>
        <Typography variant={'body2'} color={theme.palette.mediumEmphasis.main}>
          {SCHEDULED_DATE}
        </Typography>
        <TextField
          variant={'outlined'}
          placeholder={SCHEDULED_DATE}
          width="100%"
          height="28px"
          borderRadius="8px"
          value={formState.billDueDate}
        />
        <SubTypographyText>
          <Typography
            variant={'caption2'}
            color={theme.palette.lowEmphasis.main}
          >
            {ESTIMATED_ARRIVAL}
          </Typography>
          <Typography
            variant={'caption1'}
            color={theme.palette.mediumEmphasis.main}
          >
            {formState.billDueDate}
          </Typography>
        </SubTypographyText>
      </InputFieldSection>
      <InputFieldSection>
        <Typography variant={'body2'} color={theme.palette.mediumEmphasis.main}>
          {SEND_TO}
        </Typography>
        <TextField
          variant={'outlined'}
          placeholder={SEND_TO}
          width="100%"
          height="28px"
          borderRadius="8px"
          value={SEND_TO_VALUE}
        />
        <SubTypographyText>
          <Typography
            variant={'caption2'}
            color={theme.palette.lowEmphasis.main}
          >
            {ADDED_BY}
          </Typography>
          <Typography
            variant={'caption1'}
            color={theme.palette.mediumEmphasis.main}
          >
            {formState.employeeName}
          </Typography>
        </SubTypographyText>
      </InputFieldSection>
      <InputFieldSection>
        <Typography variant={'body2'} color={theme.palette.mediumEmphasis.main}>
          {WITHDRAW_FROM}
        </Typography>
        <TextField
          variant={'outlined'}
          placeholder={WITHDRAW_FROM}
          width="100%"
          height="28px"
          borderRadius="8px"
          value={WITHDRAW_FROM_VALUE}
        />
        <SubTypographyText>
          <Typography
            variant={'caption2'}
            color={theme.palette.lowEmphasis.main}
          >
            {SAVING_ACCOUNT}
          </Typography>
          <Typography
            variant={'caption1'}
            color={theme.palette.mediumEmphasis.main}
          >
            {RANDOM_MONEY}
          </Typography>
        </SubTypographyText>
      </InputFieldSection>
      <ApprovalContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {APPROVED_BY}
        </Typography>
        <ApprovalBox>
          <IconComponent
            src={CheckIcon}
            iconAlt={'check'}
            width={'0.75rem'}
            height={'0.75rem'}
          />
          <Typography color={theme.palette.accent.green100} variant={'body2'}>
            {AUTO_APPROVED}
          </Typography>
          <IconComponent
            src={InfoIcon}
            iconAlt={'info'}
            width={'0.75rem'}
            height={'0.75rem'}
          />
        </ApprovalBox>
      </ApprovalContainer>
    </MainContainer>
  );
};

export default BillInfoLastLook;
