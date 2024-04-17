import React, { useState } from 'react';
import { Grid, styled, Stack } from '@mui/material';
import theme from '../../../theme';
import SkipPrefillingModal from '../../molecules/SkipPrefillingModal';

export interface NewBillTemplateProps {
  header: React.ReactNode;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const WholeContainer = styled(Grid)({
  height: '100vh',
  backgroundColor: theme.palette.structural[50],
  flexDirection: 'column',
});

const Header = styled(Grid)({
  height: theme.spacing(17),
});

const Content = styled(Stack)(
  ({ skipPrefilling }: { skipPrefilling: boolean }) => ({
    width: '100%',
    height: 'calc(100vh - 68px)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: skipPrefilling
      ? theme.palette.modalBackground.light
      : theme.palette.structural[50],
  }),
);

const FormContainer = styled(Stack)({
  flexDirection: 'row',
  gap: theme.spacing(12),
  justifyContent: 'center',
  width: '67%',
  maxHeight: '516px',
});

const LeftContainer = styled(Stack)(
  ({ skipPrefilling }: { skipPrefilling: boolean }) => ({
    maxWidth: theme.spacing(90),
    flexGrow: 1,
    backgroundColor: skipPrefilling
      ? theme.palette.modalBackground.light
      : theme.palette.structural[50],
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: skipPrefilling
        ? theme.palette.modalBackground.light
        : 'transparent',
      pointerEvents: 'none',
    },
  }),
);

const RightContainer = styled(Grid)({
  maxWidth: theme.spacing(108),
  height: theme.spacing(129),
  flexGrow: 1,
  backgroundColor: 'white',
});

const SkipPrefillingContainer = styled(Stack)({
  position: 'absolute',
  top: '46%',
  right: '90%',
});

const NewBillTemplate = ({
  header,
  leftContent,
  rightContent,
}: NewBillTemplateProps) => {
  const [skipPrefilling, setSkipPrefilling] = useState<boolean>(true);
  const handleSkipPrefilling = () => {
    setSkipPrefilling(false);
  };

  return (
    <WholeContainer container>
      <Header item>{header}</Header>
      <Content skipPrefilling={skipPrefilling}>
        <FormContainer>
          <LeftContainer skipPrefilling={skipPrefilling}>
            {leftContent}
          </LeftContainer>
          <RightContainer>{rightContent}</RightContainer>
        </FormContainer>
        {skipPrefilling && (
          <SkipPrefillingContainer>
            <SkipPrefillingModal handleSkipButtonClick={handleSkipPrefilling} />
          </SkipPrefillingContainer>
        )}
      </Content>
    </WholeContainer>
  );
};

export default NewBillTemplate;
