import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import AwsIcon from '../../../../public/assets/icons/awsicon.svg';
import {
  GO_TO_PARTNER_REWARD,
  POTENTIAL_SAVINGS,
} from '../../../utils/constants';
import RightArrow from '../../../../public/assets/icons/rightarrow.svg';

interface IHomePageProps {
  headingContent: string;
  textContent: string;
  amount: string;
}

const StyledColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledRowBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const StyledIconBox = styled(StyledRowBox)({
  gap: '8px',
});

const StyledIconWithText = styled(StyledRowBox)({
  gap: '10px',
});

const StyledMainBox = styled(StyledColumnBox)({
  gap: '12px',
  backgroundColor: theme.palette.white.main,
});

const StyledInnerContentBox = styled(StyledColumnBox)({
  gap: '8px',
});

const StyledTextContentBox = styled(StyledInnerContentBox)({
  padding: '4px 0px 0px 0px',
});

const StyledIconTextBox = styled(StyledColumnBox)({
  gap: '5px',
});

const HomePageReportingCard = ({
  headingContent,
  textContent,
  amount,
}: IHomePageProps) => {
  return (
    <StyledMainBox data-testid="reporting">
      <StyledTextContentBox>
        <Typography variant="subtitle2" color={theme.palette.highEmphasis.main}>
          {headingContent}
        </Typography>
        <Typography
          variant="subtitle3"
          color={theme.palette.mediumEmphasis.main}
        >
          {textContent}
        </Typography>
      </StyledTextContentBox>
      <StyledIconBox>
        <img src={AwsIcon} alt={'aws'} />
        <StyledIconTextBox>
          <Typography
            color={theme.palette.mediumEmphasis.main}
            variant={'caption2'}
          >
            {POTENTIAL_SAVINGS}
          </Typography>
          <Typography
            color={theme.palette.accent.green100}
            variant={'subtitle2'}
          >
            {amount}
          </Typography>
        </StyledIconTextBox>
      </StyledIconBox>
      <StyledIconWithText>
        <Typography color={theme.palette.primary[500]} variant={'body2'}>
          {GO_TO_PARTNER_REWARD}
        </Typography>
        <img src={RightArrow} alt={'arrow'} />
      </StyledIconWithText>
    </StyledMainBox>
  );
};

export default HomePageReportingCard;
