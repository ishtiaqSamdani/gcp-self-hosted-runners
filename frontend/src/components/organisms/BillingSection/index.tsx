import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/Textfield';
import Button from '../../atoms/Button';
import IconComponent from '../../atoms/Icon';
import theme from '../../../theme';
import {
  AMOUNT,
  BILLABLE,
  CATEGORY,
  CLASS,
  CUSTOM_JOB,
  QUICKBOOK_DESCRIPTION,
} from '../../../utils/constants';
import TrashIcon from '../../../../public/assets/icons/trash.svg';
import RemoveIcon from '../../../../public/assets/icons/remove.svg';
import UpDownIcon from '../../../../public/assets/icons/up-dowm.svg';
import { BillDetails } from '../../../utils/types';

interface BillingSection {
  formdata?: BillDetails;
  onDelete: () => void;
  handleBillable: () => void;
  onInputChange: (value: number) => void;
}

const MainContainer = styled(Box)({
  border: `1px solid ${theme.palette.stroke[50]}`,
  backgroundColor: theme.palette.structural[50],
  padding: '0 0.5rem',
  width: 'fit-content',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '0.5rem',
  paddingTop: '0.5rem',
  paddingBottom: '1rem',
});

const InputFieldContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '.25rem',
});

const ActionsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: '100%',
});

const ActionButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%',
});

const SyledButton = styled(Button)({
  borderRadius: '6.25rem',
  height: '1.5rem',
  border: `1px solid ${theme.palette.stroke[50]}`,
});

const StyledIcon = styled('img')({ marginLeft: '4px' });

export const StyledTextField = styled(TextField)({
  border: `1px solid ${theme.palette.stroke[100]}`,
});

const BillingSection: React.FC<BillingSection> = ({
  formdata,
  handleBillable,
  onDelete,
  onInputChange,
}) => {
  const initialFormData: BillDetails = {
    amount: formdata?.amount ?? Infinity,
    quickbookDescription: formdata?.quickbookDescription ?? '',
    category: formdata?.category ?? '',
    class: formdata?.class ?? '',
    customJob: formdata?.customJob ?? '',
    id: formdata?.id ?? 0,
  };
  const [formData, setFormData] = useState<BillDetails>(initialFormData);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof BillDetails,
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {}, [formdata]);

  return (
    <MainContainer>
      <InputFieldContainer>
        <ActionsContainer>
          <IconComponent
            src={TrashIcon}
            iconAlt="trash-icon"
            onClick={onDelete}
            width={'1rem'}
            height={'1rem'}
          />
        </ActionsContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {AMOUNT}
        </Typography>
        <StyledTextField
          variant={'outlined'}
          placeholder={AMOUNT}
          width="20.875rem"
          height="1.75rem"
          borderRadius="0.5rem"
          onChange={(e) => onInputChange(parseInt(e.target.value))}
          value={formdata?.amount}
          type={'number'}
        />
      </InputFieldContainer>
      <InputFieldContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {QUICKBOOK_DESCRIPTION}
        </Typography>
        <StyledTextField
          variant={'outlined'}
          placeholder={QUICKBOOK_DESCRIPTION}
          width="20.875rem"
          height="1.75rem"
          borderRadius="0.5rem"
          onChange={(e) => handleInputChange(e, 'quickbookDescription')}
          value={formData.quickbookDescription}
        />
      </InputFieldContainer>
      <InputFieldContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {CATEGORY}
        </Typography>
        <StyledTextField
          variant={'outlined'}
          placeholder={CATEGORY}
          width="20.875rem"
          height="1.75rem"
          borderRadius="0.5rem"
          onChange={(e) => handleInputChange(e, 'category')}
          value={formData.category}
          iconEnd={<img src={UpDownIcon} alt="up-down" />}
        />
      </InputFieldContainer>
      <InputFieldContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {CLASS}
        </Typography>
        <StyledTextField
          variant={'outlined'}
          placeholder={CLASS}
          width="20.875rem"
          height="1.75rem"
          borderRadius="0.5rem"
          onChange={(e) => handleInputChange(e, 'class')}
          value={formData.class}
          iconEnd={<img src={UpDownIcon} alt="up-down" />}
        />
      </InputFieldContainer>
      <InputFieldContainer>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {CUSTOM_JOB}
        </Typography>
        <StyledTextField
          variant={'outlined'}
          placeholder={CUSTOM_JOB}
          width="20.875rem"
          height="1.75rem"
          borderRadius="0.5rem"
          onChange={(e) => handleInputChange(e, 'customJob')}
          value={formData.customJob}
          iconEnd={<img src={UpDownIcon} alt="up-down" />}
        />
      </InputFieldContainer>
      <ActionButtonsContainer>
        <SyledButton
          startIcon={<StyledIcon src={RemoveIcon} alt="add" />}
          backgroundColor={'transparent'}
          width={'8.9375rem'}
          labelColor={theme.palette.primary[500]}
          label={BILLABLE}
          variant="outlined"
          labelVariant="caption1"
          onClick={handleBillable}
        />
      </ActionButtonsContainer>
    </MainContainer>
  );
};

export default BillingSection;
