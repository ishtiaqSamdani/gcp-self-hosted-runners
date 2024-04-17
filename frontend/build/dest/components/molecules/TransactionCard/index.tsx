import { Box, Grid, SelectChangeEvent, styled } from '@mui/material';
import React, { ReactElement } from 'react';
import theme from '../../../theme';
import {
  EachTransactionType,
  QuickbookCategoriesType,
} from '../../../utils/types';
import IconsComponent from '../../atoms/Icon';
import EyeIcon from '../../../../public/assets/icons/eyeicon.svg';
import { CHOOSE_ONE, MAKE_READY, VIRTUAL_7007 } from '../../../utils/constants';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/CheckBox';
import Typography from '../../atoms/Typography';
import SelectComponent from '../SelectComponent';
import { formatDate } from '../../../utils/formatters';

interface TableCardProps {
  transactionRowData: EachTransactionType;
  handleSelectChange?: (event: SelectChangeEvent<unknown>) => void;
  dropdownValue: string | number;
  handleCheckboxClick: () => void;
  quickBookData: QuickbookCategoriesType[];
  checked: boolean;
}

export const MainGrid = styled(Grid)(() => ({
  width: '100%',
  height: '70px',
  gap: '0px',
  backgroundColor: theme.palette.accent.main,
  display: 'flex',
  flexDirection: 'row',
  borderTop: '1px solid',
  borderColor: theme.palette.stroke[50],
}));

export const TransactionBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const CheckboxContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.125%',
  height: '60px',
  padding: '8px',
});

export const StyledTableColumnBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '12.5%',
  height: '60px',
  padding: '8px',
  whiteSpace: 'nowrap',
});

export const StyledDualTextBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  height: '43px',
});

export const StyledIconBox = styled(Box)({
  marginTop: '1rem',
});

export const getDualTextContent = (content1: string, content2: string) => {
  return (
    <StyledDualTextBox>
      <Typography variant={'body2'} color={theme.palette.highEmphasis.main}>
        {content1}
      </Typography>
      <Typography variant={'body3'} color={theme.palette.lowEmphasis.main}>
        {content2}
      </Typography>
    </StyledDualTextBox>
  );
};
export const getTableColumn = (key: number | string, content: ReactElement) => {
  return <StyledTableColumnBox key={key}>{content}</StyledTableColumnBox>;
};

export const DropDownStyles = { height: '2rem' };

export const IconStyles = {
  width: '1rem',
  height: '1rem',
};

const StyledMakeReadyButton = styled(Button)({
  padding: '3px 18px 5px 18px',
});

const TransactionCard = ({
  transactionRowData,
  dropdownValue,
  quickBookData,
  handleCheckboxClick,
  handleSelectChange,
  checked,
}: TableCardProps) => {
  const contentMap = new Map<number, ReactElement>();

  const TransactionContent = (
    <TransactionBox>
      {getDualTextContent(
        transactionRowData.vendor?.displayName,
        transactionRowData.vendor?.shortName,
      )}
      <StyledIconBox>
        <IconsComponent
          width={IconStyles.width}
          height={IconStyles.height}
          src={EyeIcon}
          iconAlt={'eye'}
        />
      </StyledIconBox>
    </TransactionBox>
  );
  contentMap.set(0, TransactionContent);

  const AmountContent = (
    <Typography variant="body2" color={theme.palette.highEmphasis.main}>
      {transactionRowData.amount}
    </Typography>
  );
  contentMap.set(1, AmountContent);

  const DateColumn = (
    <Typography variant="body2" color={theme.palette.highEmphasis.main}>
      {formatDate(transactionRowData.date)}
    </Typography>
  );
  contentMap.set(2, DateColumn);

  const User = getDualTextContent(
    transactionRowData.employee?.name,
    VIRTUAL_7007,
  );
  contentMap.set(3, User);

  const QuickBookContent = (
    <SelectComponent
      width={'100%'}
      value={dropdownValue}
      handleChange={handleSelectChange}
      items={quickBookData}
      placeholder={CHOOSE_ONE}
      height={DropDownStyles.height}
    />
  );
  contentMap.set(4, QuickBookContent);

  const Receipt = (
    <Typography variant="body2" color={theme.palette.highEmphasis.main}>
      {transactionRowData.receipt}
    </Typography>
  );
  contentMap.set(5, Receipt);

  const Memo = (
    <Typography variant="body2" color={theme.palette.highEmphasis.main}>
      {transactionRowData.memo}
    </Typography>
  );
  contentMap.set(6, Memo);

  const Sync = (
    <StyledMakeReadyButton
      variant="outlined"
      label={MAKE_READY}
      backgroundColor={'white'}
      width={'100%'}
      labelColor={theme.palette.mediumEmphasis.main}
    />
  );
  contentMap.set(7, Sync);

  return (
    <MainGrid data-testid="transaction-card">
      <CheckboxContainer>
        <Checkbox
          handleCheckBoxChange={handleCheckboxClick}
          checked={checked}
        />
      </CheckboxContainer>
      {Array.from(contentMap, ([key, value]) => getTableColumn(key, value))}
    </MainGrid>
  );
};

export default TransactionCard;
