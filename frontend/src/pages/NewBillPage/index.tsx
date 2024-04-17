import React, { useEffect, useMemo, useState } from 'react';
import NewBillTemplate from '../../components/templates/NewBillTemplate';
import NewBillForm from '../../components/organisms/NewBillForm';
import PDFViewer from '../../components/organisms/PDFViewer';
import { Stack, styled } from '@mui/material';
import Typography from '../../components/atoms/Typography';
import theme from '../../theme';
import Button from '../../components/atoms/Button';
import {
  CREATE_BILL,
  EDIT,
  EMPTY_DATE,
  GET_STARTED,
  NAVIGATE_DASHBOARD,
  NEW_BILL,
  REVIEW,
  SAVE_CHANGES,
  TAB_HEADINGS,
} from '../../utils/constants';
import IconComponent from '../../components/atoms/Icon';
import DividerComponent from '../../components/atoms/Divider';
import CancelIcon from '../../../public/assets/icons/cancel.svg';
import BillInfoLastLook from '../../components/organisms/BillInfo';
import {
  extractInvoiceInfo,
  mapBillData,
  mapPrefilledData,
} from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { useRampTabsContext } from '../../contexts/RampTabsContext';
import { useAuth } from '../../contexts/AuthContext';
import { InvoiceInfoType, NewBillFormData } from '../../utils/types';
import { createNewBill } from '../../services/transaction-service';

const HeaderStack = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  height: theme.spacing(17.25),
  gap: theme.spacing(4),
  marginLeft: theme.spacing(4),
});

const ButtonStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: theme.spacing(15),
  paddingRight: theme.spacing(5),
  gap: theme.spacing(3),
});

const FormStack = styled(Stack)({
  marginTop: theme.spacing(5),
  maxHeight: theme.spacing(102),
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  alignItems: 'center',
  scrollbarWidth: 'thin',
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': {
    width: theme.spacing(2),
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
  },
});

const StyledDivider = styled(DividerComponent)({
  height: theme.spacing(5),
  marginTop: theme.spacing(6),
  borderWidth: '1px',
});

const NewBillPage = () => {
  const [pdfText, setPdfText] = useState<string>('');
  const [isBillInfoVisible, setIsBillInfoVisible] = useState<boolean>(true);
  const [prefilledFormData, setPrefilledFormData] = useState<NewBillFormData>();
  const [formState, setFormState] = useState<NewBillFormData>({
    invoiceTotal: 0,
    invoiceNumber: '',
    employeeContact: '',
    invoiceDate: EMPTY_DATE,
    billDueDate: EMPTY_DATE,
    memo: '',
    employeeName: '',
    quickBookLocation: '',
    paymentType: '',
  });
  console.log(formState);
  useEffect(() => {
    const prefilledData: InvoiceInfoType = extractInvoiceInfo(pdfText);

    setPrefilledFormData(mapPrefilledData(prefilledData));
  }, [pdfText]);

  const navigate = useNavigate();

  const { setCurrentTab } = useRampTabsContext();
  const { user } = useAuth();

  const navigateToDraftPage = () => {
    navigate(NAVIGATE_DASHBOARD);
    setCurrentTab(TAB_HEADINGS[6]);
  };

  const handleReview = async () => {
    if (isBillInfoVisible) {
      setIsBillInfoVisible(false);
      console.log('in review');
    } else {
      try {
        console.log(formState);
        const mappedData = mapBillData(formState, user?.id ?? 0);
        await createNewBill(mappedData);
        navigateToDraftPage();
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleEdit = () => {
    setIsBillInfoVisible(true);
  };
  const isReviewButtonDisabled = useMemo(() => {
    const {
      employeeName,
      quickBookLocation,
      invoiceDate,
      billDueDate,
      invoiceNumber,
      employeeContact,
      invoiceTotal,
      paymentType,
    } = formState;

    return (
      !employeeName ||
      !quickBookLocation ||
      !invoiceDate ||
      !billDueDate ||
      !invoiceNumber ||
      !employeeContact ||
      invoiceTotal <= 0 ||
      !paymentType
    );
  }, [formState]);

  const renderHeader = () => {
    return (
      <HeaderStack>
        <IconComponent
          src={CancelIcon}
          iconAlt={'cancel'}
          width={theme.spacing(4)}
          height={theme.spacing(4)}
          onClick={navigateToDraftPage}
        />
        <StyledDivider orientation="vertical" />
        <Typography color={theme.palette.mediumEmphasis.main} variant={'body2'}>
          {GET_STARTED}
        </Typography>
      </HeaderStack>
    );
  };

  const renderLeftContent = () => {
    return (
      <Stack>
        <Typography color={theme.palette.highEmphasis.main} variant={'h1'}>
          {NEW_BILL}
        </Typography>
        <FormStack>
          {isBillInfoVisible ? (
            <NewBillForm
              formData={prefilledFormData}
              formState={formState}
              setFormState={setFormState}
            />
          ) : (
            <BillInfoLastLook formState={formState} />
          )}
        </FormStack>
        <ButtonStack>
          <Button
            variant="outlined"
            label={isBillInfoVisible ? SAVE_CHANGES : EDIT}
            backgroundColor={'white'}
            width={'102px'}
            labelColor={theme.palette.highEmphasis.main}
            onClick={handleEdit}
          />
          <Button
            backgroundColor={'primary500'}
            width={'61px'}
            labelColor={theme.palette.white.main}
            label={isBillInfoVisible ? REVIEW : CREATE_BILL}
            variant="contained"
            onClick={handleReview}
            disabled={isReviewButtonDisabled}
          />
        </ButtonStack>
      </Stack>
    );
  };
  return (
    <NewBillTemplate
      header={renderHeader()}
      leftContent={renderLeftContent()}
      rightContent={<PDFViewer setPdfText={setPdfText} />}
    />
  );
};

export default React.memo(NewBillPage);
