import React from 'react';
import { Stack, styled } from '@mui/material';
import theme from '../../../theme';
import CheckBox from '../../atoms/CheckBox';
import IconComponent from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import { REVIEW } from '../../../utils/constants';
import { formatDateToEnUs, formatCurrency } from '../../../utils/functions';
import MoreIcon from '../../../../public/assets/icons/more.svg';
import InvoiceIcon from '../../../../public/assets/icons/invoice.svg';

const DraftCardContainer = styled('div')({
  display: 'grid',
  width: '100%',
  minHeight: '60px',
  alignItems: 'center',
  gridTemplateColumns:
    '3.7% 11.6% 13.56% 12.23% 12.6% 10.43% 10.83% 13.8% 10.8%',
});

const ReviewButtonWrapper = styled(Stack)({
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(21),
  height: theme.spacing(8),
  borderRadius: theme.spacing(1),
  border: `1px solid rgba(60, 66, 87, 0.12)`,
});

const MoreIconStyles = {
  width: theme.spacing(5),
  height: theme.spacing(5),
};

export interface DraftReimbursementCardProps {
  employeeName: string;
  employeeDate: string;
  amount: number;
  dueDate: string;
  invoiceDate: string;
  invoiceNo: string;
  accountNo: string;
  checked: boolean;
  handleCheckboxClick: () => void;
}

const DraftReimbursementCard = ({
  employeeName,
  employeeDate,
  amount,
  dueDate,
  invoiceDate,
  invoiceNo,
  accountNo,
  checked,
  handleCheckboxClick,
}: DraftReimbursementCardProps) => {
  const data = [
    { text: formatCurrency(amount).slice(0, -3) },
    { text: formatDateToEnUs(dueDate) },
    { text: formatDateToEnUs(invoiceDate) },
    { text: invoiceNo },
  ];
  return (
    <DraftCardContainer data-testid={'draft-reimbursement-card'}>
      <CheckBox checked={checked} handleCheckBoxChange={handleCheckboxClick} />
      <Stack>
        <Typography variant="body2" color={theme.palette.highEmphasis.main}>
          {employeeName}
        </Typography>
        <Typography variant="body3" color={theme.palette.mediumEmphasis.main}>
          {formatDateToEnUs(employeeDate)}
        </Typography>
      </Stack>
      {data.map((item) => {
        return (
          <Typography
            key={item.text}
            variant="body2"
            color={theme.palette.highEmphasis.main}
          >
            {item.text}
          </Typography>
        );
      })}

      <IconComponent iconAlt="invoice" src={InvoiceIcon} {...MoreIconStyles} />

      <Typography variant="body2" color={theme.palette.highEmphasis.main}>
        {accountNo}
      </Typography>
      <Stack direction={'row'} gap={theme.spacing(3)} alignItems={'center'}>
        <ReviewButtonWrapper>
          <Typography variant="body2" color={theme.palette.mediumEmphasis.main}>
            {REVIEW}
          </Typography>
        </ReviewButtonWrapper>
        <IconComponent iconAlt="more" src={MoreIcon} {...MoreIconStyles} />
      </Stack>
    </DraftCardContainer>
  );
};

export default DraftReimbursementCard;
