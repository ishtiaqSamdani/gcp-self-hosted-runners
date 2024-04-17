import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import Button from '../../atoms/Button';
import IconComponent from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import SearchComponent, { StyledApprovalBox } from '../SearchComponent';
import DraftReimbursementCard from '../../molecules/DraftReimbursementCard';
import TypographyWithIcon from '../../molecules/TypographyWithIcon';
import theme from '../../../theme';
import MoreIcon from '../../../../public/assets/icons/more.svg';
import DownloadIcon from '../../../../public/assets/icons/download.svg';
import {
  DRAFTS_TABLE_HEADS,
  NEW_BILL,
  DOWNLOAD,
  DRAFTS,
  APPROVE,
  REJECT,
  SCROLLBAR_STYLES,
} from '../../../utils/constants';
import { DraftType } from '../../../utils/types';
import {
  getAllDraftedBills,
  updateDraftedBillWithStatus,
} from '../../../services/transaction-service';
import { formatDate } from '../../../utils/formatters';
import { renderFooter } from '../AllPayments';
import { useAuth } from '../../../contexts/AuthContext';

export interface BillsProps {
  handleNewBillClick: () => void;
}

const StyledDownloadButton = styled(Stack)({
  width: theme.spacing(27),
  height: theme.spacing(8),
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.boxShadow.main}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  boxShadow: `0px 1px 1px 0 ${theme.palette.boxShadow.main}`,
  margin: '0px',
});

const TableHeaders = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '12% 14% 12.23% 12.6% 10.43% 10.83% 13.8% 10.8%',
  width: '100%',
  alignItems: 'center',
  height: theme.spacing(9),
});

export const BodyContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  // maxHeight: '23.125rem',
  overflow: 'auto',
  ...SCROLLBAR_STYLES,
});

const DraftsBox = styled(Stack)({
  gap: theme.spacing(3),
});

const HeaderBox = styled(Stack)({
  width: '100%',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(9.5),
});

const StyledTypography = styled(Stack)({
  padding: theme.spacing(2),
});

const ActionsContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const TableContainer = styled(Stack)({
  flexDirection: 'column',
  borderTop: `1px solid ${theme.palette.stroke[50]}`,
  width: '100%',
  minHeight: '28rem',
  maxHeight: '28rem',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: theme.spacing(2),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'darkgrey',
    borderRadius: theme.spacing(2),
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'lightgrey',
    borderRadius: theme.spacing(2),
  },
});

const IconStyles = { width: '1.25rem', height: '1.25rem' };

const AllDrafts = ({ handleNewBillClick }: BillsProps) => {
  const [drafts, setDrafts] = useState<DraftType[]>([]);
  const [filteredDrafts, setFilteredDrafts] = useState<DraftType[]>([]);
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);
  const [selectedBillIds, setSelectedBillIds] = useState<number[]>([]);

  const { userState } = useAuth();

  const fetchDraftBillsData = async () => {
    try {
      const response = await getAllDraftedBills(userState?.id ?? 0);
      setDrafts(response);
      setFilteredDrafts(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchDraftBillsData();
  }, []);

  useEffect(() => {
    setCheckboxes(Array(drafts.length).fill(false));
  }, [drafts]);

  const handleCheckboxClick = useCallback((billId: number, index: number) => {
    setCheckboxes(
      (prevCheckboxes) =>
        prevCheckboxes?.map((checked, checkBoxIndex) => {
          if (checkBoxIndex === index) {
            if (!checked) {
              setSelectedBillIds((prevBillIds) => [...prevBillIds, billId]);
            } else {
              setSelectedBillIds((prevIds) =>
                prevIds.filter((id) => id !== billId),
              );
            }

            return !checked;
          }

          return checked;
        }),
    );
  }, []);

  const handleSearch = (searchQuery: string) => {
    const filteredDraftBills = drafts?.filter((data) =>
      data.employeeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredDrafts(filteredDraftBills);
  };

  const handleApproveClick = async () => {
    try {
      await Promise.all(
        selectedBillIds.map(async (billId) => {
          await updateDraftedBillWithStatus(billId);
        }),
      );

      await fetchDraftBillsData();
      setSelectedBillIds([]);
    } catch (error) {
      console.error('Error ', error);
    }
  };

  return (
    <DraftsBox>
      <HeaderBox>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Typography variant="h1" color={theme.palette.highEmphasis.main}>
            {DRAFTS}
          </Typography>
          <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(4)}>
            {selectedBillIds.length > 0 && (
              <StyledApprovalBox>
                <Typography
                  variant="body2"
                  color={theme.palette.lowEmphasis.main}
                >
                  {REJECT}
                </Typography>
                <Typography variant="body2" color={theme.palette.primary[500]}>
                  {APPROVE}
                </Typography>
              </StyledApprovalBox>
            )}
            <IconComponent
              src={MoreIcon}
              iconAlt="more"
              width="1.5rem"
              height="1.5rem"
            />
            <Button
              variant="outlined"
              backgroundColor={'white'}
              width={'4.3125rem'}
              labelColor={theme.palette.mediumEmphasis.main}
              labelVariant="body2"
              label={NEW_BILL}
              onClick={handleNewBillClick}
            />
          </Stack>
        </Stack>
        <ActionsContainer>
          <SearchComponent
            onSearchItemClick={handleSearch}
            selectedBill={selectedBillIds.length > 0}
            handleApproveClick={handleApproveClick}
            showRightButtons={false}
          />
          <StyledDownloadButton>
            <TypographyWithIcon
              text={DOWNLOAD}
              iconSrc={DownloadIcon}
              iconAlt={'download'}
              iconProps={IconStyles}
              typographyProps={{
                variant: 'body2',
                color: theme.palette.mediumEmphasis.main,
              }}
            />
          </StyledDownloadButton>
        </ActionsContainer>
      </HeaderBox>
      <TableContainer>
        <Stack
          direction={'row'}
          width={'100%'}
          borderBottom={`1px solid ${theme.palette.stroke[50]}`}
        >
          <Box
            width={'3.5%'}
            height={theme.spacing(9)}
            padding={theme.spacing(2)}
          />
          <TableHeaders>
            {DRAFTS_TABLE_HEADS.map((text) => {
              return (
                <StyledTypography key={text}>
                  <Typography
                    variant="caption1"
                    color={theme.palette.highEmphasis.main}
                  >
                    {text}
                  </Typography>
                </StyledTypography>
              );
            })}
          </TableHeaders>
        </Stack>
        <BodyContainer>
          {filteredDrafts?.map(
            (
              {
                employeeName,
                amount,
                dueDate,
                invoiceDate,
                invoiceNumber,
                accountNumber,
                transactionDate,
                id,
              },
              index,
            ) => {
              return (
                <DraftReimbursementCard
                  employeeName={employeeName}
                  employeeDate={transactionDate}
                  amount={amount}
                  dueDate={formatDate(dueDate)}
                  invoiceDate={formatDate(invoiceDate)}
                  invoiceNo={invoiceNumber}
                  accountNo={accountNumber}
                  key={id}
                  checked={checkboxes[index]}
                  handleCheckboxClick={() => {
                    handleCheckboxClick(id, index);
                  }}
                />
              );
            },
          )}
        </BodyContainer>
      </TableContainer>
      {renderFooter(filteredDrafts.length)}
    </DraftsBox>
  );
};

export default AllDrafts;
