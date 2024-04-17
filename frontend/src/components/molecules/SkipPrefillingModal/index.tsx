import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../theme';
import InfoIcon from '../../../../public/assets/icons/info.svg';
import Typography from '../../atoms/Typography';
import {
  SAVE_TIME_UPLOADING_INVOICE,
  SKIP_PREFILLING,
  SKIP_PREFILLING_CONTENT,
} from '../../../utils/constants';
import Button from '../../atoms/Button';

interface IPrefillingProps {
  handleSkipButtonClick: () => void;
}

const StyledPrefillingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: theme.palette.accent.main,
  border: `1px solid ${theme.palette.neutral['100']}`,
  width: 472,
  height: 138,
  zIndex: 9999,
  position: 'absolute',
});

const StyledTextWithIconBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
});

const StyledIconBox = styled(Box)({
  marginTop: '1px',
});

const StyledTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledButtonBox = styled(StyledTextWithIconBox)({
  padding: '0px 0px 0px 24px',
});

const StyledIcon = styled('img')({
  width: '12px',
  height: '12px',
});

const ButtonStyles = {
  width: '104px',
};

const SkipPrefillingModal = ({ handleSkipButtonClick }: IPrefillingProps) => {
  return (
    <StyledPrefillingContainer data-testid="skip-prefilling">
      <StyledTextWithIconBox>
        <StyledIconBox>
          <StyledIcon src={InfoIcon} alt={'info'} />
        </StyledIconBox>
        <StyledTextBox>
          <Typography color={theme.palette.icons['200']} variant={'body2'}>
            {SAVE_TIME_UPLOADING_INVOICE}
          </Typography>
          <Typography color={theme.palette.lowEmphasis.main} variant={'body3'}>
            {SKIP_PREFILLING_CONTENT}
          </Typography>
        </StyledTextBox>
      </StyledTextWithIconBox>
      <StyledButtonBox>
        <Button
          variant="outlined"
          label={SKIP_PREFILLING}
          labelColor={theme.palette.mediumEmphasis.main}
          backgroundColor={'white'}
          onClick={handleSkipButtonClick}
          width={ButtonStyles.width}
        />
      </StyledButtonBox>
    </StyledPrefillingContainer>
  );
};

export default SkipPrefillingModal;
