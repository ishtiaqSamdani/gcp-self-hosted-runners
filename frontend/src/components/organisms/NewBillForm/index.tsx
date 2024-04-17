import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Box, Stack, styled, InputAdornment } from '@mui/material';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/Textfield';
import Button from '../../atoms/Button';
import BillingSection, { StyledTextField } from '../BillingSection';
import PaymentTypeDropdown from '../PaymentDropdown';
import EditIcon from '../../../../public/assets/icons/edit.svg';
import ContractIcon from '../../../../public/assets/icons/contract.svg';
import ThunderIcon from '../../../../public/assets/icons/thunder.svg';

import theme from '../../../theme';
import {
  ADD_OTHER_LINE,
  BILL_DUE_DATE,
  BILL_DUE_DATE_PLACEHOLDER,
  EMPLOYEE_CONTACT,
  INVOICE_DATE,
  INVOICE_DATE_PLACEHOLDER,
  INVOICE_NUMBER,
  INVOICE_TOTAL,
  LOCATION,
  MEMO,
  NEW_VENDOR_TEXT,
  PAYMENT_DETAILS,
  QUICKBOOKS_LOCATION,
  VENDOR_CONTACT,
  WHAT_FOR,
  WHOS_IT_FOR,
  EMPLOYEE_NAME,
  PREFILLING_SUCCESS,
} from '../../../utils/constants';

import { BillDetails, NewBillFormData } from '../../../utils/types';
import UpDownIcon from '../../../../public/assets/icons/up-dowm.svg';
import CalendarIcon from '../../../../public/assets/icons/calendar.svg';
import BankIcon from '../../../../public/assets/icons/bank.svg';
import AddIcon from '../../../../public/assets/icons/add.svg';
import IconComponent from '../../atoms/Icon';

interface BillFormProps {
  formData?: NewBillFormData;
  formState: NewBillFormData;
  setFormState: Dispatch<SetStateAction<NewBillFormData>>;
}

const WrapperContainer = styled(Box)({
  borderBottom: `1px solid ${theme.palette.stroke[50]}`,
  backgroundColor: theme.palette.structural[50],
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const MainContainer = styled(Box)({
  width: 'fit-content',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '0.75rem',
});

const InputFieldContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

const DateContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5625rem',
});
const IconContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.625rem',
  marginLeft: '0.25rem',
});
const Section16 = styled(Box)({
  paddingTop: '0.5rem',
});
const Section12 = styled(Box)({
  paddingTop: '0.25rem',
});
const Section32 = styled(Box)({
  paddingTop: '1.5rem',
  display: 'flex',
  gap: '.5rem',
  flexDirection: 'column',
});
const StyledImage = styled('img')({
  marginLeft: '4px',
});
const NameContainer = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const NameEditIconContainer = styled(Stack)({
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'center',
});
const DataPrefilledContainer = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  height: theme.spacing(16.5),
  border: `1px solid var(--Borders-Flat, #E0E6EB)`,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(3),
});
const NewBillForm: React.FC<BillFormProps> = ({
  formData,
  formState,
  setFormState,
}) => {
  const emptyBillData: BillDetails[] = [
    {
      amount: 0,
      quickbookDescription: '',
      category: '',
      class: '',
      customJob: '',
      id: 2000,
    },
  ];

  const [billingSections, setBillingSections] = useState<BillDetails[]>([
    ...emptyBillData,
  ]);

  const {
    invoiceTotal,
    invoiceNumber,
    employeeContact,
    invoiceDate,
    billDueDate,
    quickBookLocation,
    memo,
    employeeName,
  } = formState;

  console.log(formState);

  useEffect(() => {
    setFormState({
      invoiceTotal: formData?.invoiceTotal || 0,
      invoiceNumber: formData?.invoiceNumber || '',
      employeeContact: formData?.employeeContact || '',
      invoiceDate: formData?.invoiceDate || '00-00-0000',
      billDueDate: formData?.billDueDate || '00-00-0000',
      quickBookLocation: formData?.quickBookLocation || '',
      employeeName: formData?.employeeName || 'Richard Glenn',
      memo: formData?.memo || '',
      paymentType: formData?.paymentType || '',
    });
    setBillingSections(formData?.bills || [...emptyBillData]);
  }, [formData]);

  const updateBillingSection = (id: number, value: number) => {
    setBillingSections((prevBillingSections) =>
      prevBillingSections.map((section) =>
        section.id === id ? { ...section, amount: value } : section,
      ),
    );
  };

  const renderBillSection = (billsData: BillDetails[]) => {
    const billSections = billsData.map((billData) => (
      <BillingSection
        key={billData.id}
        formdata={billData}
        onDelete={
          billsData.length > 1
            ? () => {
                removeBillingSection(billData.id);
              }
            : () => {}
        }
        handleBillable={() => {}}
        onInputChange={(value) => {
          updateBillingSection(billData.id, value);
        }}
      />
    ));
    return billSections;
  };
  const removeBillingSection = useCallback(
    (id: number) => {
      const updatedBillingSections = billingSections.filter(
        (billData) => billData.id !== id,
      );
      setBillingSections(updatedBillingSections);
    },
    [billingSections],
  );

  const addSection = useCallback(() => {
    const newId = Math.max(...billingSections.map((bill) => bill.id)) + 1;
    const newBillData: BillDetails = {
      id: newId,
      amount: 0,
      quickbookDescription: '',
      category: '',
      class: '',
      customJob: '',
    };
    setBillingSections([...billingSections, newBillData]);
  }, [billingSections]);

  useEffect(() => {
    const totalAmount = billingSections.reduce(
      (total, bill) => total + bill.amount,
      0,
    );
    const formattedTotal = totalAmount.toFixed(2);
    setFormState((prevFormState) => ({
      ...prevFormState,
      invoiceTotal: Number(formattedTotal),
      bills: billingSections,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingSections]);

  const handleEmployeeContactChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, employeeContact: e.target.value });
    },
    [formState, setFormState],
  );

  const handleInvoiceNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, invoiceNumber: e.target.value });
    },
    [formState, setFormState],
  );

  const handleInvoiceDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        invoiceDate: e.target.value,
      });
    },
    [formState, setFormState],
  );

  const handleBillDueDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        billDueDate: e.target.value,
      });
    },
    [formState, setFormState],
  );

  const handleQuickBookLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, quickBookLocation: e.target.value });
    },
    [formState, setFormState],
  );

  const handleMemoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, memo: e.target.value });
    },
    [formState, setFormState],
  );

  const handleSelectedPaymentOption = useCallback(
    (option: string) => {
      setFormState((prevFormState) => ({
        ...prevFormState,
        paymentType: option,
      }));
    },
    [setFormState],
  );

  return (
    <WrapperContainer>
      <MainContainer>
        {!!employeeName.length && (
          <DataPrefilledContainer>
            <IconComponent
              src={ThunderIcon}
              iconAlt={'thunder'}
              width={theme.spacing(6.5)}
              height={theme.spacing(6.5)}
            />
            <Stack maxWidth={theme.spacing(71)}>
              <Typography variant={'caption1'} color={theme.palette.icons[200]}>
                {PREFILLING_SUCCESS}
              </Typography>
            </Stack>
          </DataPrefilledContainer>
        )}
        <Typography variant={'body2'} color={theme.palette.mediumEmphasis.main}>
          {WHOS_IT_FOR}
        </Typography>
        {!!employeeName.length && (
          <NameContainer>
            <Typography
              variant={'subtitle2'}
              color={theme.palette.highEmphasis.main}
            >
              {employeeName || EMPLOYEE_NAME}
            </Typography>
            <NameEditIconContainer>
              <IconComponent
                src={ContractIcon}
                iconAlt={'cancel'}
                width={theme.spacing(4)}
                height={theme.spacing(4)}
              />
              <IconComponent
                src={EditIcon}
                iconAlt={'cancel'}
                width={theme.spacing(4)}
                height={theme.spacing(4)}
              />
            </NameEditIconContainer>
          </NameContainer>
        )}
        <Section12>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {EMPLOYEE_CONTACT}
            </Typography>
            <StyledTextField
              variant={'outlined'}
              placeholder={VENDOR_CONTACT}
              width="334px"
              height="28px"
              borderRadius="8px"
              onChange={handleEmployeeContactChange}
              value={employeeContact}
              iconEnd={<img src={UpDownIcon} alt="up-down" />}
            />
          </InputFieldContainer>
        </Section12>
        <Section16>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {INVOICE_NUMBER}
            </Typography>
            <StyledTextField
              variant={'outlined'}
              placeholder={INVOICE_NUMBER}
              width="334px"
              height="28px"
              borderRadius="8px"
              onChange={handleInvoiceNumberChange}
              value={invoiceNumber}
            />
          </InputFieldContainer>
        </Section16>
        <IconContainer>
          <img src={BankIcon} alt="bank" />
          <Typography
            color={theme.palette.mediumEmphasis.main}
            variant={'caption1'}
          >
            {NEW_VENDOR_TEXT}
          </Typography>
        </IconContainer>
        <Section32>
          <Typography
            variant={'body2'}
            color={theme.palette.mediumEmphasis.main}
          >
            {WHAT_FOR}
          </Typography>
        </Section32>

        <Section12>
          <DateContainer>
            <InputFieldContainer>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'body2'}
              >
                {INVOICE_DATE}
              </Typography>
              <TextField
                variant={'outlined'}
                width="156px"
                height="28px"
                borderRadius="12px"
                placeholder={INVOICE_DATE_PLACEHOLDER}
                onChange={handleInvoiceDateChange}
                type={'date'}
                value={invoiceDate}
                iconStart={<img src={CalendarIcon} alt="calendar" />}
              />
            </InputFieldContainer>
            <InputFieldContainer>
              <Typography
                color={theme.palette.mediumEmphasis.main}
                variant={'body2'}
              >
                {BILL_DUE_DATE}
              </Typography>
              <TextField
                variant={'outlined'}
                placeholder={BILL_DUE_DATE_PLACEHOLDER}
                width="170px"
                height="28px"
                borderRadius="12px"
                onChange={handleBillDueDateChange}
                type={'date'}
                value={billDueDate}
                iconStart={<img src={CalendarIcon} alt="calendar" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* You can use an empty div or any other element here */}
                      <div style={{ visibility: 'hidden' }}></div>
                    </InputAdornment>
                  ),
                }}
              />
            </InputFieldContainer>
          </DateContainer>
        </Section12>
        <Section16>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {QUICKBOOKS_LOCATION}
            </Typography>
            <StyledTextField
              variant={'outlined'}
              placeholder={LOCATION}
              width="334px"
              height="28px"
              borderRadius="8px"
              value={quickBookLocation}
              onChange={handleQuickBookLocationChange}
            />
          </InputFieldContainer>
        </Section16>
        <Section16>
          <InputFieldContainer>
            <Typography
              color={theme.palette.mediumEmphasis.main}
              variant={'body2'}
            >
              {MEMO}
            </Typography>
            <StyledTextField
              variant={'outlined'}
              placeholder={MEMO}
              width="334px"
              height="28px"
              borderRadius="8px"
              value={memo}
              onChange={handleMemoChange}
            />
          </InputFieldContainer>
        </Section16>
      </MainContainer>
      {renderBillSection(billingSections)}
      <MainContainer>
        <Section16>
          <Typography
            color={theme.palette.highEmphasis.main}
            variant={'caption2'}
          >
            {INVOICE_TOTAL}
          </Typography>
          <Typography
            color={theme.palette.highEmphasis.main}
            variant={'subtitle2'}
          >
            {'$' + (billingSections[0].amount.toFixed(2) ?? invoiceTotal)}
          </Typography>
        </Section16>
        <Section16>
          <Button
            startIcon={<StyledImage src={AddIcon} alt="add" />}
            backgroundColor={'white'}
            width={'143px'}
            labelColor={theme.palette.mediumEmphasis.main}
            label={ADD_OTHER_LINE}
            variant="outlined"
            labelVariant="body2"
            onClick={addSection}
          />
        </Section16>
        <Section32>
          <Typography
            color={theme.palette.mediumEmphasis.main}
            variant={'body2'}
          >
            {PAYMENT_DETAILS}
          </Typography>
          <Section12>
            <PaymentTypeDropdown
              handleSelectedOption={handleSelectedPaymentOption}
            />
          </Section12>
        </Section32>
      </MainContainer>
    </WrapperContainer>
  );
};

export default React.memo(NewBillForm);
