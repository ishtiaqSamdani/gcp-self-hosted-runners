import React from 'react';
import { Box, styled } from '@mui/material';
import { QuickbookCategoriesType } from '../../../utils/types';
import theme from '../../../theme';
import Typography from '../../atoms/Typography';
import {
  NEXT,
  PREVIOUS,
  RESULTS,
  TRANSACTION_TABLE_HEAD,
  SCROLLBAR_STYLES,
} from '../../../utils/constants';
import TransactionCard, {
  CheckboxContainer,
  getTableColumn,
} from '../../molecules/TransactionCard';
import useTransactions from './hooks';
import SearchComponent from '../SearchComponent';
import Button from '../../atoms/Button';

interface RampCardsProps {
  handleQuickBookSelect: (
    selectedQuickBook: QuickbookCategoriesType | undefined,
    vendor: string,
  ) => void;
}

const StyledMainRampBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
});

const MainContainer = styled(Box)({
  width: '100%',
  height: '400px',
  marginTop: theme.spacing(2),
});

const SubMainContainer = styled(Box)({
  width: '100%',
});

const HeadContainer = styled(Box)({
  width: '100%',
  height: '36px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderTop: '1px solid',
  borderColor: theme.palette.stroke[50],
});

const BodyContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '23.125rem',
  overflow: 'auto',
  ...SCROLLBAR_STYLES,
});

const StyledFooterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.accent.white,
  alignItems: 'center',
  borderRadius: '0rem 0rem 0.375rem 0.375rem',
  marginTop: theme.spacing(3),
});

const LeftStyledFooterBox = styled(Box)({
  width: '9.3%',
  display: 'flex',
});
const RightStyledFooterBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '.5rem',
});

const AllRampCards = ({ handleQuickBookSelect }: RampCardsProps) => {
  const {
    filteredTransactionData,
    quickBookData,
    dropdownValues,
    transactionCount,
    handleSelectChange,
    handleSearchClick,
    handleCheckboxClick,
    checkboxes,
    selectedTransactionIds,
    handleDeleteTransactionClick,
  } = useTransactions(handleQuickBookSelect);

  const getHeadingContent = (heading: string) => {
    return (
      <Typography variant="body2" color={theme.palette.highEmphasis.main}>
        {heading}
      </Typography>
    );
  };

  const getDropdownValue = (
    quickBook: QuickbookCategoriesType | undefined | null,
    dropdownValue: string,
  ) => {
    if (dropdownValue) {
      return dropdownValue;
    } else if (quickBook !== undefined && quickBook !== null) {
      return quickBook.name;
    } else {
      return '';
    }
  };

  return (
    <StyledMainRampBox data-testid="all-ramp-cards">
      <SearchComponent
        onSearchItemClick={handleSearchClick}
        selectedTransaction={selectedTransactionIds.length > 0}
        handleDeleteClick={handleDeleteTransactionClick}
        showRightButtons={true}
      />
      <MainContainer data-testid="transaction-table">
        <SubMainContainer>
          <HeadContainer>
            <CheckboxContainer />
            {TRANSACTION_TABLE_HEAD.map((eachHead) =>
              getTableColumn(eachHead, getHeadingContent(eachHead)),
            )}
          </HeadContainer>
          <BodyContainer>
            {filteredTransactionData.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                quickBookData={quickBookData}
                handleCheckboxClick={() => {
                  handleCheckboxClick(transaction.id, index);
                }}
                handleSelectChange={(event) =>
                  handleSelectChange(event, transaction, index)
                }
                dropdownValue={getDropdownValue(
                  transaction.quickBook,
                  dropdownValues[index],
                )}
                transactionRowData={transaction}
                checked={checkboxes ? checkboxes[index] : false}
              />
            ))}
          </BodyContainer>
        </SubMainContainer>
      </MainContainer>
      <StyledFooterBox>
        <LeftStyledFooterBox>
          <Typography variant="body2" color={theme.palette.mediumEmphasis.main}>
            {transactionCount}
            <Typography
              variant="body3"
              color={theme.palette.mediumEmphasis.main}
            >
              {RESULTS}
            </Typography>
          </Typography>
        </LeftStyledFooterBox>
        <RightStyledFooterBox>
          <Button
            backgroundColor={'white'}
            width="9.125rem"
            label={PREVIOUS}
            labelColor={theme.palette.lowEmphasis.main}
            variant="outlined"
          />
          <Button
            backgroundColor={'white'}
            width="9.125rem"
            label={NEXT}
            labelColor={theme.palette.lowEmphasis.main}
            variant="outlined"
          />
        </RightStyledFooterBox>
      </StyledFooterBox>
    </StyledMainRampBox>
  );
};

export default React.memo(AllRampCards);
