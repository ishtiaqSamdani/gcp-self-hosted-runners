import React, { useCallback, useEffect, useState } from 'react';
import { Stack, styled } from '@mui/material';
import theme from '../../../theme';
import Button from '../../atoms/Button';
import IconComponent from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import SearchComponent from '../SearchComponent';
import ApprovedCard from '../../molecules/ApprovedCard';
import { EACH_PAYMENT_TYPE } from '../../../utils/types';
import MoreIcon from '../../../../public/assets/icons/more.svg';
import TypographyWithIcon from '../../molecules/TypographyWithIcon';
import DownloadIcon from '../../../../public/assets/icons/download.svg';
import {
  PAYMENT_TABLE_HEADERS,
  PAYMENTS,
  NEW_BILL,
  NEXT_STEP,
  DOWNLOAD,
  PREVIOUS,
  RESULTS,
  NEXT,
} from '../../../utils/constants';
import { getAllPaymentBills } from '../../../services/transaction-service';
import { BillsProps, BodyContainer, TableContainer } from '../AllDrafts';

const AllPaymentsContainer = styled(Stack)({
  gap: theme.spacing(3),
});

const HeaderStack = styled(Stack)({
  width: '100%',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(9.5),
});

const StyledDownloadButton = styled(Stack)({
  width: theme.spacing(27),
  height: theme.spacing(8),
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.boxShadow.main}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  boxShadow: `0px 1px 1px 0 ${theme.palette.boxShadow.main}`,
});

const TableHeaders = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 16.67%)',
  width: '100%',
  alignItems: 'center',
  height: theme.spacing(9),
});

const StyledTypographyStack = styled(Stack)({
  padding: theme.spacing(2),
});

const HeaderTopStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});

const StyledNextStepStack = styled(Stack)({
  paddingLeft: '20%',
});

const HeadingSearchStack = styled(Stack)({
  width: '100%',
  flexDirection: 'row',
});

const CheckboxHeaderStack = styled(Stack)({
  width: '4.125%',
  height: theme.spacing(9),
  padding: theme.spacing(2),
});

const TableHeaderStack = styled(Stack)({
  flexDirection: 'row',
  width: '100%',
});

const FooterStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const renderFooter = (rowsCount: number) => (
  <FooterStack>
    <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(1)}>
      <Typography variant="body2" color={theme.palette.mediumEmphasis.main}>
        {rowsCount}
      </Typography>
      <Typography variant="body3" color={theme.palette.mediumEmphasis.main}>
        {RESULTS}
      </Typography>
    </Stack>
    <Stack direction={'row'} gap={'4px'}>
      <Button
        variant="outlined"
        backgroundColor={'white'}
        width={'4.438rem'}
        labelColor={theme.palette.lowEmphasis.main}
        label={PREVIOUS}
      />
      <Button
        variant="outlined"
        backgroundColor={'white'}
        width={'2.938rem'}
        labelColor={theme.palette.lowEmphasis.main}
        label={NEXT}
      />
    </Stack>
  </FooterStack>
);

const AllPayments = ({ handleNewBillClick }: BillsProps) => {
  const [payments, setPayments] = useState<EACH_PAYMENT_TYPE[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<EACH_PAYMENT_TYPE[]>(
    [],
  );

  const fetchPaymentBillsData = async () => {
    try {
      const response = await getAllPaymentBills();
      setPayments(response);
      setFilteredPayments(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchPaymentBillsData();
  }, []);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      const filteredPaymentBills = payments.filter((data) =>
        data.employee.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPayments(filteredPaymentBills);
    },
    [payments],
  );

  const renderHeader = () => (
    <HeaderStack>
      <HeaderTopStack>
        <Typography variant="h1" color={theme.palette.highEmphasis.main}>
          {PAYMENTS}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(4)}>
          <IconComponent
            src={MoreIcon}
            iconAlt="more"
            width="24px"
            height="24px"
          />
          <Button
            variant="outlined"
            backgroundColor={'white'}
            width={'69px'}
            labelColor={theme.palette.mediumEmphasis.main}
            label={NEW_BILL}
            onClick={handleNewBillClick}
          />
        </Stack>
      </HeaderTopStack>
      <HeadingSearchStack>
        <SearchComponent
          onSearchItemClick={handleSearch}
          showRightButtons={false}
        />
        <StyledDownloadButton>
          <TypographyWithIcon
            text={DOWNLOAD}
            iconSrc={DownloadIcon}
            iconAlt={'download'}
            iconProps={{ width: '1.25rem', height: '1.25rem' }}
            typographyProps={{
              variant: 'body2',
              color: theme.palette.mediumEmphasis.main,
            }}
          />
        </StyledDownloadButton>
      </HeadingSearchStack>
    </HeaderStack>
  );

  const renderTableData = () => (
    <TableContainer>
      <TableHeaderStack>
        <CheckboxHeaderStack />
        <TableHeaders>
          {PAYMENT_TABLE_HEADERS.map((text) => {
            return (
              <StyledTypographyStack key={text}>
                <Typography
                  variant="caption1"
                  color={theme.palette.highEmphasis.main}
                >
                  {text}
                </Typography>
              </StyledTypographyStack>
            );
          })}
          <StyledNextStepStack>
            <Typography
              variant="caption1"
              color={theme.palette.highEmphasis.main}
            >
              {NEXT_STEP}
            </Typography>
          </StyledNextStepStack>
        </TableHeaders>
      </TableHeaderStack>
      <BodyContainer>
        {filteredPayments.map((data: EACH_PAYMENT_TYPE) => {
          return <ApprovedCard paymentData={{ ...data }} key={data.id} />;
        })}
      </BodyContainer>
    </TableContainer>
  );

  return (
    <AllPaymentsContainer>
      {renderHeader()}
      {renderTableData()}
      {renderFooter(filteredPayments.length)}
    </AllPaymentsContainer>
  );
};

export default React.memo(AllPayments);
