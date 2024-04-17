import React from 'react';
import theme from '../../theme';
import { styled, Stack } from '@mui/material';
import IconComponent from '../../components/atoms/Icon';
import Typography from '../../components/atoms/Typography';
import { REPORTING_DATA, REPORTING, TAB_HEADINGS } from '../../utils/constants';
import HomeTemplate from '../../components/templates/HomeTemplate';
import IllustrationIcon from '../../../public/assets/icons/Illustration.svg';
import HomePageReportingCard from '../../components/molecules/HomePageReportingCard';
import GraphWithSearchFilter from '../../components/molecules/GraphWithSearchFilter';
import { useRampTabsContext } from '../../contexts/RampTabsContext';
import ReimbursementTab from '../ReimbursementTab';
import AccountingPage from '../AccountingPage';

const ContentStack = styled(Stack)({
  flexDirection: 'column',
  marginLeft: '3rem',
});

const HeaderStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(3.25),
  marginBottom: theme.spacing(2.75),
});

const ReportingCardStack = styled(Stack)({
  flexDirection: 'row',
  marginRight: theme.spacing(20),
  gap: theme.spacing(15.75),
});

const GraphStack = styled(Stack)({
  marginRight: theme.spacing(20),
  marginTop: theme.spacing(9.5),
});

const renderContent = (activeTab: string) => {
  switch (activeTab) {
    case TAB_HEADINGS[0]:
      return (
        <ContentStack>
          <HeaderStack>
            <Typography variant="h1" color={theme.palette.highEmphasis.main}>
              {REPORTING}
            </Typography>
            <IconComponent
              src={IllustrationIcon}
              iconAlt={'illustration'}
              width={theme.spacing(36)}
              height={theme.spacing(20.25)}
            />
          </HeaderStack>

          <ReportingCardStack>
            {REPORTING_DATA.map((card) => {
              return (
                <HomePageReportingCard
                  key={card.id}
                  headingContent={card.heading}
                  textContent={card.textContent}
                  amount={card.amount}
                />
              );
            })}
          </ReportingCardStack>
          <GraphStack>
            <GraphWithSearchFilter />
          </GraphStack>
        </ContentStack>
      );
    case TAB_HEADINGS[6]:
      return <ReimbursementTab />;
    case TAB_HEADINGS[7]:
      return <AccountingPage />;
  }
};

const HomePage = () => {
  const { activeTab } = useRampTabsContext();
  return <HomeTemplate content={renderContent(activeTab)} />;
};

export default HomePage;
