import React, { ReactElement } from 'react';
import { Box, styled } from '@mui/material';
import theme from '../../../theme';
import { EACH_PAYMENT_TYPE } from '../../../utils/types';
import IconComponent from '../../atoms/Icon';
import HomeIcon from '../../../../public/assets/icons/homeicon.svg';
import TickIcon from '../../../../public/assets/icons/tickicon.svg';
import { ACH, REVIEW, SCHEDULED } from '../../../utils/constants';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/CheckBox';
import Typography from '../../atoms/Typography';
import { formatDate } from '../../../utils/formatters';
import MoreIcon from '../../../../public/assets/icons/moreicon.svg';
import {
  StyledDualTextBox,
  StyledIconBox,
  MainGrid,
  CheckboxContainer,
  IconStyles,
} from '../TransactionCard';

interface TableCardProps {
  paymentData: EACH_PAYMENT_TYPE;
}

const StyledTableColumnBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '16.67%',
  height: '60px',
  padding: '8px',
});

const TransactionBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: '56px',
});

const StyledButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  paddingLeft: '15%',
});

const StyledReviewButton = styled(Button)({
  padding: '3px 18px 5px 18px',
});

const ApprovedCard = ({ paymentData }: TableCardProps) => {
  const renderDualTextContent = (topContent: string, bottomContent: string) => {
    return (
      <StyledDualTextBox>
        <Typography variant={'body2'} color={theme.palette.highEmphasis.main}>
          {topContent}
        </Typography>
        <Typography variant={'body3'} color={theme.palette.mediumEmphasis.main}>
          {bottomContent}
        </Typography>
      </StyledDualTextBox>
    );
  };

  const renderTableColumn = (key: number, content: ReactElement) => {
    return <StyledTableColumnBox key={key}>{content}</StyledTableColumnBox>;
  };

  const contentMap = new Map<number, ReactElement>();

  const TransactionContent = (
    <TransactionBox>
      {renderDualTextContent(paymentData.employee.name, paymentData.amount)}
      <StyledIconBox>
        <IconComponent
          width={IconStyles.width}
          height={IconStyles.height}
          src={HomeIcon}
          iconAlt={'home'}
        />
      </StyledIconBox>
    </TransactionBox>
  );
  contentMap.set(0, TransactionContent);

  const PaymentStatusContent = (
    <TransactionBox>
      {renderDualTextContent(ACH, SCHEDULED)}
      <StyledIconBox>
        <IconComponent
          width={IconStyles.width}
          height={IconStyles.height}
          src={TickIcon}
          iconAlt={'tick'}
        />
      </StyledIconBox>
    </TransactionBox>
  );
  contentMap.set(1, PaymentStatusContent);

  const renderDateColumn = (date: Date) => {
    return (
      <Typography variant="body2" color={theme.palette.highEmphasis.main}>
        {formatDate(date)}
      </Typography>
    );
  };

  contentMap.set(2, renderDateColumn(paymentData.paymentDate));
  contentMap.set(3, renderDateColumn(paymentData.dueDate));
  contentMap.set(4, renderDateColumn(paymentData.invoiceDate));

  const renderReviewColumn = () => {
    return (
      <StyledButtonBox>
        <StyledReviewButton
          variant="outlined"
          label={REVIEW}
          backgroundColor={'white'}
          width={'100%'}
          labelVariant="body2"
          labelColor={theme.palette.mediumEmphasis.main}
        />
        <IconComponent
          src={MoreIcon}
          iconAlt={'more'}
          height="1.25rem"
          width="1.25rem"
        />
      </StyledButtonBox>
    );
  };
  contentMap.set(5, renderReviewColumn());

  return (
    <MainGrid data-testid="approved-card">
      <CheckboxContainer>
        <Checkbox checked={false} />
      </CheckboxContainer>
      {Array.from(contentMap, ([key, value]) => renderTableColumn(key, value))}
    </MainGrid>
  );
};

export default ApprovedCard;
