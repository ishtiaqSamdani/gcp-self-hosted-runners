import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, SelectChangeEvent, styled } from '@mui/material';
import theme from '../../../theme';
import {
  ACTIVE_RULES,
  CATEGORY_RULES,
  CATEGORY_RULE_TEXT,
  CREATE_CATEGORY_RULE,
  RECENT_CATEGORIES,
} from '../../../utils/constants';
import {
  CategoryRuleInformationType,
  CategoryRuleType,
  QuickbookCategoriesType,
  RampQuickBookMap,
} from '../../../utils/types';
import Modal from '../../molecules/Modal';
import RampQuickBookMapping from '../../molecules/RampQuickBookMapping';
import Typography from '../../atoms/Typography';
import {
  createCategoryRule,
  getAllQuickBooks,
  getCategoryRuleInformation,
} from '../../../services/transaction-service';

interface CategoryRuleProps {
  handleCancelClick: () => void;
}

const StyledHeadingBox = styled(Box)({
  width: '100%',
  height: '1.5rem',
});

const StyledColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledTextfieldBox = styled(StyledColumnBox)({
  gap: '1rem',
});

const StyledSubCategoryContentBox = styled(StyledColumnBox)({
  gap: '1.5rem',
});

const CreateCategoryRule = ({ handleCancelClick }: CategoryRuleProps) => {
  const [activeRulesData, setActiveRulesData] = useState<RampQuickBookMap[]>(
    [],
  );
  const [recentCategoryData, setRecentCategoryData] = useState<
    RampQuickBookMap[]
  >([]);
  const [rampQuickBookMap, setRampQuickBookMap] = useState<CategoryRuleType[]>(
    [],
  );
  const [quickBookData, setQuickBookData] = useState<QuickbookCategoriesType[]>(
    [],
  );
  const [dropdownValues, setDropdownValues] = useState<string[]>([]);

  const fetchQuickbookData = async () => {
    try {
      const quickBooks = await getAllQuickBooks();
      setQuickBookData(quickBooks);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchCategoryRuleData();
    fetchQuickbookData();
  }, []);

  const handleCreateCategoryRuleModal = useCallback(() => {
    rampQuickBookMap?.map(async (eachMap) => {
      try {
        await createCategoryRule(eachMap.rampId, eachMap.quickBookId);
      } catch (error) {
        alert(error);
      }
    });
    handleCancelClick();
  }, [rampQuickBookMap]);

  const handleChangeRampQuickbookSelection = (
    event: SelectChangeEvent<unknown>,
    rampId: number,
    index: number,
  ) => {
    const selectedQuickBookId = parseInt(event.target.value as string);

    const selectedQuickBook = quickBookData.find(
      (quickBook) => quickBook.id === selectedQuickBookId,
    );

    const newDropDownValues = { ...dropdownValues };
    newDropDownValues[index] = selectedQuickBook?.name ?? '';
    setDropdownValues(newDropDownValues);

    addQuickBookToMap(rampId, selectedQuickBookId);
  };

  const addQuickBookToMap = (rampId: number, selectedQuickBookId: number) => {
    const selectedRampQuickBookMap: CategoryRuleType = {
      rampId: rampId,
      quickBookId: selectedQuickBookId,
      id: 0,
    };

    setRampQuickBookMap((prevRampQuickBookMap) => [
      ...prevRampQuickBookMap,
      selectedRampQuickBookMap,
    ]);
  };

  const fetchCategoryRuleData = async () => {
    try {
      const categoryRules: CategoryRuleInformationType =
        await getCategoryRuleInformation();

      setActiveRulesData(categoryRules.activeRules);
      setRecentCategoryData(categoryRules.recentCategory);
    } catch (error) {
      alert(error);
    }
  };

  const renderCategoryRuleTextContent = useMemo(() => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="body2" color={theme.palette.highEmphasis.main}>
          {CATEGORY_RULES}
        </Typography>
        <Typography variant="body3" color={theme.palette.highEmphasis.main}>
          {CATEGORY_RULE_TEXT}
        </Typography>
      </Box>
    );
  }, []);

  const renderCategoryRuleTextFieldContent = () => {
    return (
      <StyledSubCategoryContentBox>
        <StyledTextfieldBox>
          {activeRulesData.length > 0 && (
            <StyledHeadingBox>
              <Typography
                color={theme.palette.highEmphasis.main}
                variant="body2"
              >
                {ACTIVE_RULES}
              </Typography>
            </StyledHeadingBox>
          )}
          <StyledTextfieldBox>
            {activeRulesData?.map((activeRule) => (
              <RampQuickBookMapping
                key={activeRule.rampName}
                rampPlaceholder={activeRule.rampName}
                quickBookValue={activeRule.quickBookName}
                handleQuickBookChange={() => {}}
                mappedRamp={true}
                quickbookItems={[]}
              />
            ))}
          </StyledTextfieldBox>
        </StyledTextfieldBox>
        <StyledTextfieldBox>
          {recentCategoryData.length > 0 && (
            <StyledHeadingBox>
              <Typography
                color={theme.palette.highEmphasis.main}
                variant="body2"
              >
                {RECENT_CATEGORIES}
              </Typography>
            </StyledHeadingBox>
          )}
          <StyledTextfieldBox>
            {recentCategoryData?.map((recentCategory, index) => (
              <RampQuickBookMapping
                key={recentCategory.rampName}
                rampPlaceholder={recentCategory.rampName}
                quickBookValue={dropdownValues[index] ?? ''}
                handleQuickBookChange={(event: SelectChangeEvent<unknown>) => {
                  handleChangeRampQuickbookSelection(
                    event,
                    recentCategory.rampId,
                    index,
                  );
                }}
                mappedRamp={false}
                quickbookItems={quickBookData}
              />
            ))}
          </StyledTextfieldBox>
        </StyledTextfieldBox>
      </StyledSubCategoryContentBox>
    );
  };

  return (
    <Modal
      headingContent={CREATE_CATEGORY_RULE}
      handleCancelClick={handleCancelClick}
      handleCreateRuleClick={handleCreateCategoryRuleModal}
      textContent={renderCategoryRuleTextContent}
      textFieldContents={renderCategoryRuleTextFieldContent()}
      width={'35%'}
      height={'41.625rem'}
    />
  );
};

export default React.memo(CreateCategoryRule);
