import React from 'react';
import styled from '@emotion/styled';
import { Box, SelectChangeEvent } from '@mui/material';
import IconComponent from '../../atoms/Icon';
import ThunderIcon from '../../../../public/assets/icons/thunder.svg';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import { QUICKBOOK_CATEGORY, RAMP_CATEGORY } from '../../../utils/constants';
import TextField from '../../atoms/Textfield';
import SelectComponent from '../SelectComponent';
import { QuickbookCategoriesType } from '../../../utils/types';

interface IRampQuickbookProps {
  rampPlaceholder: string;
  quickBookValue: string | number;
  handleQuickBookChange: (event: SelectChangeEvent<unknown>) => void;
  mappedRamp: boolean;
  quickbookItems: QuickbookCategoriesType[];
}

const StyledMainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  backgroundColor: theme.palette.accent.main,
  alignItems: 'center',
});

const StyledTextfieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '47%',
});

const IconBox = styled(Box)({
  marginTop: '2rem',
});

const StyledIcon = styled(IconComponent)({
  width: '20px',
  height: '20px',
});

const TextfieldStyles = {
  width: '100%',
  height: '1.75rem',
  borderRadius: '0.5rem',
};

const RampQuickBookMapping = ({
  rampPlaceholder,
  quickBookValue,
  handleQuickBookChange,
  quickbookItems,
  mappedRamp,
}: IRampQuickbookProps) => {
  return (
    <StyledMainBox data-testid="ramp-quickbook">
      <StyledTextfieldBox>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {RAMP_CATEGORY}
        </Typography>
        <TextField
          variant={'outlined'}
          width={TextfieldStyles.width}
          height={TextfieldStyles.height}
          borderRadius={TextfieldStyles.borderRadius}
          value={rampPlaceholder}
          disabled={mappedRamp}
        />
      </StyledTextfieldBox>
      <IconBox>
        <StyledIcon src={ThunderIcon} iconAlt={'thunder'} />
      </IconBox>
      <StyledTextfieldBox>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {QUICKBOOK_CATEGORY}
        </Typography>
        <SelectComponent
          items={quickbookItems}
          value={quickBookValue}
          placeholder={QUICKBOOK_CATEGORY}
          handleChange={handleQuickBookChange}
          width={TextfieldStyles.width}
          height={TextfieldStyles.height}
          disabled={mappedRamp}
        />
      </StyledTextfieldBox>
    </StyledMainBox>
  );
};

export default RampQuickBookMapping;
