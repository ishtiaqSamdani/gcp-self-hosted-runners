import React, { useCallback, useState, useMemo, useEffect } from 'react';
import {
  TRANSACTION_COUNT,
  CREATE_MERCHANT_RULE,
  UNSYNCED_TRANSACTIONS,
  QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER,
} from '../../../utils/constants';
import theme from '../../../theme';
import Modal from '../../molecules/Modal';
import Typography from '../../atoms/Typography';
import SelectComponent from '../../molecules/SelectComponent';
import { SelectChangeEvent, Stack, styled } from '@mui/material';
import { getAllQuickBooks } from '../../../services/transaction-service';
import { QuickbookCategoriesType } from '../../../utils/types';
import {
  getMerchantRuleModalBody,
  getQuickbookIdByName,
} from '../../../utils/functions';

export interface CreateMerchantRuleComponentProps {
  onCancelClick: () => void;
  onCreateRuleClick: (
    vendorName: string,
    quickbooksId: number,
  ) => Promise<void>;
}

const MerchantRuleContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
});

const CreateMerchantRuleComponent: React.FC<
  CreateMerchantRuleComponentProps
> = ({ onCancelClick, onCreateRuleClick }) => {
  const storedJsonString =
    localStorage.getItem('merchantRule') ??
    JSON.stringify({ vendorName: 'Lyft', quickbookName: 'Travel' });
  const ruleDetails = JSON.parse(storedJsonString);
  const [selectedRampCategory, setSelectedRampCategory] = useState<string>(
    ruleDetails.quickbookName,
  );
  const [quickbooksCategories, setQuickbooksCategories] = useState<
    QuickbookCategoriesType[]
  >([]);
  const [quickbooksId, setQuickbooksId] = useState<number>(0);

  useEffect(() => {
    const fetchQuickbooksCategories = async () => {
      const response = await getAllQuickBooks();
      setQuickbooksCategories(response);
    };
    fetchQuickbooksCategories();
  }, []);

  useEffect(() => {
    setQuickbooksId(
      getQuickbookIdByName(quickbooksCategories, selectedRampCategory),
    );
  }, [selectedRampCategory, quickbooksCategories]);

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string;
    setSelectedRampCategory(selectedValue);
  }, []);

  const memoizedTextContent = useMemo(
    () => (
      <Typography variant="body2" color={theme.palette.highEmphasis.main}>
        {getMerchantRuleModalBody()}
      </Typography>
    ),
    [],
  );

  const getTextFieldContent = () => {
    return (
      <MerchantRuleContainer>
        <SelectComponent
          placeholder={QUICKBOOKS_CATEGORY_SELECT_PLACEHOLDER}
          handleChange={handleChange}
          value={selectedRampCategory}
          width={'69.6%'}
          height={theme.spacing(7)}
          items={quickbooksCategories.map((quickbook) => quickbook.name)}
        />
        <Typography variant="caption1" color={theme.palette.accent.red100}>
          {`${TRANSACTION_COUNT} ${UNSYNCED_TRANSACTIONS}`}
        </Typography>
      </MerchantRuleContainer>
    );
  };

  return (
    <Modal
      width="30%"
      headingContent={CREATE_MERCHANT_RULE}
      handleCancelClick={onCancelClick}
      handleCreateRuleClick={() =>
        onCreateRuleClick(ruleDetails.vendorName, quickbooksId)
      }
      textContent={memoizedTextContent}
      textFieldContents={getTextFieldContent()}
    />
  );
};

CreateMerchantRuleComponent.displayName = 'CreateMerchantRuleComponent';

export default CreateMerchantRuleComponent;
