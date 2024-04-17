import { Box, Typography, styled } from '@mui/material';
import React, { Fragment, useCallback, useState } from 'react';
import theme from '../../../theme';
import {
  APPROVED_BY,
  AUTO_APPROVED,
  DATE,
  DELIVERY_TIME,
  MOCK_DATE,
  PAYMENT_OPTIONS,
  PAYMENT_TYPE,
  PAY_FROM,
  PAY_FROM_AC,
  PAY_TO,
  PAY_TO_AC,
  RECIEVE_DATE,
  SELECT,
  SEND_DATE,
  WORKING_DAYS,
} from '../../../utils/constants';
import TextField from '../../atoms/Textfield';
import UpDownIcon from '../../../../public/assets/icons/up-dowm.svg';
import IconComponent from '../../atoms/Icon';
import ArrowUpperIcon from '../../../../public/assets/icons/down_arrow_upper.svg';
import ArrowLowerIcon from '../../../../public/assets/icons/down_arrow_lower.svg';
import CheckIcon from '../../../../public/assets/icons/check.svg';
import InfoIcon from '../../../../public/assets/icons/info.svg';
import { StyledTextField } from '../BillingSection';

export interface DropDownItem {
  head: string;
  description: string;
}

interface DropDownProps {
  dropdownItems: DropDownItem[];
  onSelect: (selectedOption: string) => void;
}

interface PaymentTypeDropdownProps {
  handleSelectedOption: (selectedOption: string) => void;
}

const InputFieldContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  gap: '0.25rem',
});

const PaymentFlowContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '0.75rem',
  marginBottom: '0.75rem',
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

const PaymentFlowInnerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3125rem',
});

const DropDownContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '100%',
  left: 0,
  padding: '0.5rem',
  borderRadius: '0.375rem',
  backgroundColor: theme.palette.white.main,
  width: '20.875rem',
  boxShadow: theme.shadows[1],
  gap: '0.75rem',
  zIndex: 10,
});

const PaymentTypeDropdown: React.FC<PaymentTypeDropdownProps> = ({
  handleSelectedOption,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = useCallback((option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    handleSelectedOption(option);
  }, []);

  const onDropDown = useCallback(() => {
    setDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  }, []);

  const DropDown: React.FC<DropDownProps> = ({ dropdownItems, onSelect }) => {
    return (
      <DropDownContainer style={{ display: dropdownOpen ? 'flex' : 'none' }}>
        {dropdownItems.map(({ head, description }) => (
          <Box
            key={head}
            onClick={() => {
              onSelect(head);
              setDropdownOpen(false);
            }}
          >
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {head}
            </Typography>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'caption2'}
            >
              {description}
            </Typography>
          </Box>
        ))}
      </DropDownContainer>
    );
  };

  return (
    <>
      <InputFieldContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {PAYMENT_TYPE}
        </Typography>
        <StyledTextField
          variant={'outlined'}
          placeholder={SELECT}
          width="20.875rem"
          height="1.75rem"
          borderRadius="0.5rem"
          onClick={onDropDown}
          value={selectedOption}
          iconEnd={<img src={UpDownIcon} alt="up-down" />}
        />
        <DropDown
          dropdownItems={PAYMENT_OPTIONS}
          onSelect={handleOptionSelect}
        />
      </InputFieldContainer>
      {selectedOption !== '' && (
        <PaymentFlowContainer>
          <PaymentFlowInnerContainer>
            <InputFieldContainer>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'body2'}
              >
                {SEND_DATE}
              </Typography>
              <TextField
                variant={'outlined'}
                placeholder={DATE}
                width="9.625rem"
                height="1.75rem"
                borderRadius="0.5rem"
                value={MOCK_DATE}
              />
            </InputFieldContainer>
            <IconComponent
              src={ArrowUpperIcon}
              iconAlt={'arrow-upper'}
              width={'1.5rem'}
              height={'1.5rem'}
            />
            <InputFieldContainer>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'body2'}
              >
                {DELIVERY_TIME}
              </Typography>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'caption1'}
              >
                {WORKING_DAYS}
              </Typography>
            </InputFieldContainer>
            <IconComponent
              src={ArrowLowerIcon}
              iconAlt={'arrow-lower'}
              width={'1.5rem'}
              height={'1.5rem'}
            />
            <InputFieldContainer>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'body2'}
              >
                {RECIEVE_DATE}
              </Typography>
              <TextField
                variant={'outlined'}
                placeholder={DATE}
                width="9.625rem"
                height="1.75rem"
                borderRadius="0.5rem"
                value={MOCK_DATE}
              />
            </InputFieldContainer>
          </PaymentFlowInnerContainer>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {PAY_FROM}
            </Typography>
            <TextField
              variant={'outlined'}
              placeholder={PAY_FROM}
              width="20.875rem"
              height="1.75rem"
              borderRadius="0.5rem"
              value={PAY_FROM_AC}
            />
          </InputFieldContainer>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {PAY_TO}
            </Typography>
            <TextField
              variant={'outlined'}
              placeholder={PAY_TO}
              width="20.875rem"
              height="1.75rem"
              borderRadius="0.5rem"
              value={PAY_TO_AC}
            />
          </InputFieldContainer>
          <Fragment>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {APPROVED_BY}
            </Typography>
            <ApprovalBox>
              <IconComponent
                src={CheckIcon}
                iconAlt={'check'}
                width={'0.75rem'}
                height={'0.75rem'}
              />
              <Typography
                color={theme.palette.accent.green100}
                variant={'body2'}
              >
                {AUTO_APPROVED}
              </Typography>
              <IconComponent
                src={InfoIcon}
                iconAlt={'info'}
                width={'0.75rem'}
                height={'0.75rem'}
              />
            </ApprovalBox>
          </Fragment>
        </PaymentFlowContainer>
      )}
    </>
  );
};

export default React.memo(PaymentTypeDropdown);
