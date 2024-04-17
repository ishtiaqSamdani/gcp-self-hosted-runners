import React from 'react';
import { Meta } from '@storybook/react';
import HomePageReportingCard from '.';
import { REPORTING_DATA } from '../../../utils/constants';
import { Box } from '@mui/material';

const meta: Meta<typeof HomePageReportingCard> = {
  title: 'Molecules/HomePageReportingCard',
  component: HomePageReportingCard,
};

export default meta;

export const PartnerRewardFound = () => {
  return (
    <Box width={'25%'}>
      <HomePageReportingCard
        headingContent={REPORTING_DATA[0].heading}
        textContent={REPORTING_DATA[0].textContent}
        amount={REPORTING_DATA[0].amount}
      />
    </Box>
  );
};
