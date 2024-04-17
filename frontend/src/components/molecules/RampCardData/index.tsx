import React from 'react';
import { Box, styled } from '@mui/material';
import theme from '../../../theme';
import {
  CATEGORY_RULES,
  COUNTERS_HEADINGS,
  MERCHANT_RULES,
  MISSING_ITEMS,
} from '../../../utils/constants';
import { CounterBoxType } from '../../../utils/types';
import Typography from '../../atoms/Typography';

interface CounterBoxProps {
  countersData: CounterBoxType;
}

const StyledCountersBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '50%',
});

const StyledEachCounterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3 rem',
  height: '2.6875rem',
});

const RampCardData = ({ countersData }: CounterBoxProps) => {
  const getDualText = (
    topContent: string,
    bottomContent: number,
    bottomTextColor: string,
  ) => {
    return (
      <StyledEachCounterBox key={topContent}>
        <Typography variant={'body3'} color={theme.palette.highEmphasis.main}>
          {topContent}
        </Typography>
        <Typography variant={'body2'} color={bottomTextColor}>
          {bottomContent}
        </Typography>
      </StyledEachCounterBox>
    );
  };

  const SetColorForContent = (counterName: string) => {
    if (counterName === MERCHANT_RULES || counterName === CATEGORY_RULES) {
      return theme.palette.primary[500];
    } else if (counterName === MISSING_ITEMS) {
      return theme.palette.accent.red100;
    } else {
      return theme.palette.lowEmphasis.main;
    }
  };

  function setContent(counterName: string) {
    switch (counterName) {
      case MISSING_ITEMS:
        return countersData.missingItemsCount;
      case MERCHANT_RULES:
        return countersData.merchantRuleCount;
      case CATEGORY_RULES:
        return countersData.categoryRuleCount;
      default:
        return 0;
    }
  }

  return (
    <StyledCountersBox data-testid="counter-box">
      {COUNTERS_HEADINGS.map((row) =>
        getDualText(
          row.counterName,
          setContent(row.counterName),
          SetColorForContent(row.counterName),
        ),
      )}
    </StyledCountersBox>
  );
};

export default React.memo(RampCardData);
