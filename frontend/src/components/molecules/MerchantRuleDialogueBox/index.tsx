import { Box, styled } from '@mui/material';
import React from 'react';
import theme from '../../../theme';
import IconComponent from '../../atoms/Icon';
import InfoIcon from '../../../../public/assets/icons/info.svg';
import CancelIcon from '../../../../public/assets/icons/cancel.svg';
import Typorgaphy from '../../atoms/Typography';
import Button from '../../atoms/Button';
import { CREATE_RULE } from '../../../utils/constants';

interface MerchantRuleDiaogueBoxProps {
  onCreate: () => void;
  onClose: () => void;
  headText: string;
  description: string;
}

const MainContainer = styled(Box)({
  width: '19.5rem',
  borderRadius: '0.25rem',
  border: `1px solid ${theme.palette.neutral[100]}`,
  padding: '1rem',
  backgroundColor: theme.palette.accent.main,
  boxSizing: 'border-box',
});

const ContentContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '0.75rem',
});

const DescriptionContainer = styled(Box)({
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const ButtonContainer = styled(Box)({
  width: '5.375rem',
});

const InfoIconStyles = {
  marginTop: '0.625rem',
};
const CancelIconStyles = {
  marginTop: '0.5rem',
};
const StyledButton = styled(Button)({
  whiteSpace: 'nowrap',
});

const infoIconScale = '0.75rem';
const cancelIconScale = '1rem';
const createButtonWidth = '5.375rem';

const MerchantRuleDiaogueBox: React.FC<MerchantRuleDiaogueBoxProps> = ({
  onCreate,
  onClose,
  headText,
  description,
}) => {
  return (
    <MainContainer>
      <ContentContainer>
        <IconComponent
          src={InfoIcon}
          iconAlt={'info-icon'}
          height={infoIconScale}
          width={infoIconScale}
          style={InfoIconStyles}
        />
        <DescriptionContainer>
          <Box>
            <Typorgaphy
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {headText}
            </Typorgaphy>
            <Typorgaphy
              color={theme.palette.lowEmphasis.main}
              variant={'body3'}
            >
              {description}
            </Typorgaphy>
          </Box>
          <ButtonContainer>
            <StyledButton
              variant={'outlined'}
              backgroundColor={'white'}
              width={createButtonWidth}
              labelColor={theme.palette.mediumEmphasis.main}
              onClick={onCreate}
              label={CREATE_RULE}
            />
          </ButtonContainer>
        </DescriptionContainer>
        <IconComponent
          src={CancelIcon}
          iconAlt={'cancel-icon'}
          height={cancelIconScale}
          width={cancelIconScale}
          onClick={onClose}
          style={CancelIconStyles}
        />
      </ContentContainer>
    </MainContainer>
  );
};

export default MerchantRuleDiaogueBox;
