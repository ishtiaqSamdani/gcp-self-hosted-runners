import React from 'react';

import styled from '@emotion/styled';
import { Box } from '@mui/material';
import IconComponent from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import theme from '../../../theme';
import { ENTER_RAMP_CATEGORY, RAMP_CATEGORY } from '../../../utils/constants';
import TextField from '../../atoms/Textfield';
import CloseIcon from '../../../../public/assets/icons/closeicon.svg';

interface IRampQuickbookProps {
  rampValue: string;
  handleRampChange: (value: string) => void;
  onCancelClick?: () => void;
}

const StyledMainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  backgroundColor: theme.palette.accent.main,
  alignItems: 'center',
  width: '100%',
});

const StyledTextfieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  width: '80%',
});

const StyledIconTextfieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});

const IconBox = styled(Box)({
  marginTop: '0.4rem',
  cursor: 'pointer',
});

const TextfieldStyles = {
  width: '100%',
  height: '1.75rem',
  borderRadius: '0.5rem',
};

const IconStyles = {
  width: '1rem',
  height: '1rem',
};

const RampCardSelector = ({
  rampValue,
  handleRampChange,
  onCancelClick,
}: IRampQuickbookProps) => {
  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    handleRampChange(newValue);
  };
  return (
    <StyledMainBox data-testid="ramp-selector">
      <StyledTextfieldBox>
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {RAMP_CATEGORY}
        </Typography>
        <StyledIconTextfieldBox>
          <TextField
            variant={'outlined'}
            width={TextfieldStyles.width}
            height={TextfieldStyles.height}
            borderRadius={TextfieldStyles.borderRadius}
            value={rampValue}
            onChange={handleTextInputChange}
            placeholder={ENTER_RAMP_CATEGORY}
          />
          <IconBox onClick={onCancelClick}>
            <IconComponent
              src={CloseIcon}
              iconAlt="close-icon"
              width={IconStyles.width}
              height={IconStyles.height}
            />
          </IconBox>
        </StyledIconTextfieldBox>
      </StyledTextfieldBox>
    </StyledMainBox>
  );
};

export default React.memo(RampCardSelector);
