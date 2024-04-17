import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import React from 'react';
import theme from '../../../theme';
import {
  CANCEL,
  CREATE_RULE,
  SCROLLBAR_STYLES,
} from '../../../utils/constants';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';

interface ModalStyleProps {
  width: string;
  height?: string;
}

interface ModalProps extends ModalStyleProps {
  headingContent: string;
  handleCancelClick: () => void;
  handleCreateRuleClick: () => void;
  textContent: React.ReactNode;
  textFieldContents?: React.ReactNode;
}

const MainGrid = styled(Grid)(({ width, height }: ModalStyleProps) => ({
  display: 'flex',
  width: width,
  borderRadius: '6px',
  zIndex: 9999,
  backgroundColor: theme.palette.white.main,
  minHeight: height,
}));

const LayoutGrid = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.modalBackground.main,
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 900,
});

const ModalGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const StyledHeaderBox = styled(Box)({
  borderBottom: `1px solid ${theme.palette.stroke[100]}`,
  alignItems: 'center',
  backgroundColor: theme.palette.accent.white,
  padding: '16px 20px',
});

const ContentGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '24px',
  gap: '16px',
  overflow: 'auto',
  ...SCROLLBAR_STYLES,
});

const InnerContentGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const FooterContainer = styled(Box)({
  display: 'flex',
  borderTop: `1px solid ${theme.palette.stroke[100]}`,
  padding: '14px 20px 14px 20px',
  justifyContent: 'end',
  alignItems: 'center',
  marginTop: 'auto',
});

const FooterButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
});

const Modal = ({
  headingContent,
  handleCancelClick,
  handleCreateRuleClick,
  textContent,
  textFieldContents,
  width,
  height,
}: ModalProps) => {
  return (
    <LayoutGrid>
      <MainGrid width={width} height={height}>
        <ModalGrid data-testid="modal">
          <StyledHeaderBox data-testid="popup-header">
            <Typography variant="body2" color={theme.palette.highEmphasis.main}>
              {headingContent}
            </Typography>
          </StyledHeaderBox>
          <ContentGrid>
            <InnerContentGrid>{textContent}</InnerContentGrid>
            <InnerContentGrid>{textFieldContents}</InnerContentGrid>
          </ContentGrid>
          <FooterContainer>
            <FooterButtonsContainer>
              <Button
                variant="outlined"
                label={CANCEL}
                labelColor={theme.palette.mediumEmphasis.main}
                backgroundColor="white"
                onClick={handleCancelClick}
                width="58px"
              />
              <Button
                backgroundColor={'primary500'}
                width={'86px'}
                labelColor={theme.palette.white.main}
                label={CREATE_RULE}
                variant="contained"
                onClick={handleCreateRuleClick}
              />
            </FooterButtonsContainer>
          </FooterContainer>
        </ModalGrid>
      </MainGrid>
    </LayoutGrid>
  );
};

export default Modal;
