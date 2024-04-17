import React from 'react';
import { Grid, styled } from '@mui/material';
import NavBar from '../../organisms/NavBar';

export interface HomeTemplateProps {
  content: React.ReactNode;
}

const WholeContainer = styled(Grid)({
  height: '100vh',
  flexDirection: 'column',
});

const Header = styled(Grid)({
  height: '5.25rem',
});

const Content = styled(Grid)({
  height: 'calc(100vh - 5.25rem)',
  overflowY: 'auto',
});

const HomeTemplate = ({ content }: HomeTemplateProps) => {
  return (
    <WholeContainer container>
      <Header item>
        <NavBar />
      </Header>
      <Content item>{content}</Content>
    </WholeContainer>
  );
};

export default HomeTemplate;
