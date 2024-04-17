import React, { useEffect, useState } from 'react';
import theme from '../../theme';
import { styled, Stack } from '@mui/material';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Button';
import RampCardData from '../../components/molecules/RampCardData';
import AllRampCards from '../../components/organisms/AllRampCards';
import MerchantRuleDiaogueBox from '../../components/molecules/MerchantRuleDialogueBox';
import CreateMerchantRuleComponent from '../../components/organisms/CreateMerchantRule';
import CreateCategoryRule from '../../components/organisms/CreateCategoryRule';
import { getMerchantRuleDialogBoxDescription } from '../../utils/functions';
import {
  RAMP_CARDS,
  SYNC_HISTORY,
  SETTINGS,
  CREATE_CATEGORY_RULE,
  MERCHANT_RULE_HEAD,
} from '../../utils/constants';
import {
  createMerchantRule,
  getAllMerchantRulesByUserId,
  getAllCategoryRulesByUserId,
} from '../../services/rule-service';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryRuleState, MerchantRuleState } from '../../utils/types';

const ContentStack = styled(Stack)({
  flexDirection: 'column',
  marginLeft: '3rem',
  marginRight: theme.spacing(20),
});

const HeaderStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: theme.spacing(9),
  marginBottom: theme.spacing(7),
});

const StyledCounterStack = styled(Stack)({
  marginBottom: theme.spacing(9),
});

const ButtonStack = styled(Stack)({
  flexDirection: 'row',
  gap: theme.spacing(3),
});

const DialogBoxStack = styled(Stack)({
  position: 'absolute',
  right: theme.spacing(4),
  bottom: theme.spacing(4),
});

const RuleModalWrapper = styled(Stack)({
  position: 'absolute',
  width: '100%',
  height: '100vh',
});

const AccountingPage = () => {
  const [merchantRule, setMerchantRule] = useState<MerchantRuleState>({
    count: 0,
    isDialogOpen: false,
    isModalOpen: false,
  });

  const [categoryRule, setCategoryRule] = useState<CategoryRuleState>({
    count: 0,
    isModalOpen: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchMerchantRuleCount();
    };

    fetchData();
  }, [merchantRule.isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategoryRuleCount();
    };

    fetchData();
  }, [categoryRule.isModalOpen]);
  const { user } = useAuth();

  const fetchMerchantRuleCount = async () => {
    try {
      const rules = await getAllMerchantRulesByUserId(user?.id ?? 0); // need to use userId here
      setMerchantRule((prevMerchantRule) => ({
        ...prevMerchantRule,
        count: rules.length,
      }));
    } catch (error) {
      alert(error);
    }
  };

  const fetchCategoryRuleCount = async () => {
    try {
      const rules = await getAllCategoryRulesByUserId(user?.id ?? 0); // need to use userId here
      setCategoryRule((prevCategoryRule) => ({
        ...prevCategoryRule,
        count: rules.length,
      }));
    } catch (error) {
      alert(error);
    }
  };

  const handleQuickBookSelect = () => {
    setMerchantRule((prevMerchantRule) => ({
      ...prevMerchantRule,
      isDialogOpen: true,
    }));
  };

  const onMerchantRuleDialogboxCreateClick = () => {
    setMerchantRule((prevMerchantRule) => ({
      ...prevMerchantRule,
      isDialogOpen: false,
      isModalOpen: true,
    }));
    document.body.style.overflow = 'hidden';
  };

  const onMerchantRuleDialogboxClose = () => {
    setMerchantRule((prevMerchantRule) => ({
      ...prevMerchantRule,
      isDialogOpen: false,
    }));
  };

  const onMerchantRuleModalCancelClick = () => {
    setMerchantRule((prevMerchantRule) => ({
      ...prevMerchantRule,
      isModalOpen: false,
    }));
  };

  const onCreateMerchantRuleModalClick = async (
    vendorName: string,
    quickbooksId: number,
  ) => {
    await createMerchantRule(vendorName, quickbooksId, user?.id ?? 0); // need to use userId here
    setMerchantRule((prevMerchantRule) => ({
      ...prevMerchantRule,
      isModalOpen: false,
    }));
    await fetchMerchantRuleCount();
  };

  const onCreateCategoryRuleOpenModalClick = async () => {
    setCategoryRule((prevCategoryRule) => ({
      ...prevCategoryRule,
      isModalOpen: true,
    }));
    document.body.style.overflow = 'hidden';
  };

  const onCreateCategoryRuleClick = async () => {
    setCategoryRule((prevCategoryRule) => ({
      ...prevCategoryRule,
      isModalOpen: false,
    }));
    await fetchCategoryRuleCount();
  };

  const onCategoryRuleCancelClick = () => {
    setCategoryRule((prevCategoryRule) => ({
      ...prevCategoryRule,
      isModalOpen: false,
    }));
  };

  return (
    <ContentStack>
      <HeaderStack>
        <Typography variant="h1" color={theme.palette.highEmphasis.main}>
          {RAMP_CARDS}
        </Typography>
        <ButtonStack>
          <Button
            variant="outlined"
            label={SYNC_HISTORY}
            labelColor={theme.palette.mediumEmphasis.main}
            backgroundColor="white"
            width="94px"
          />
          <Button
            variant="outlined"
            label={SETTINGS}
            labelColor={theme.palette.mediumEmphasis.main}
            backgroundColor="white"
            width="68px"
          />
          <Button
            variant="contained"
            label={CREATE_CATEGORY_RULE}
            labelColor={theme.palette.white.main}
            backgroundColor={theme.palette.primary[500]}
            width="130px"
            onClick={onCreateCategoryRuleOpenModalClick}
          />
        </ButtonStack>
      </HeaderStack>
      <StyledCounterStack>
        <RampCardData
          countersData={{
            missingItemsCount: 74,
            merchantRuleCount: merchantRule.count,
            categoryRuleCount: categoryRule.count,
          }}
        />
      </StyledCounterStack>
      <AllRampCards handleQuickBookSelect={handleQuickBookSelect} />
      {merchantRule.isDialogOpen && (
        <DialogBoxStack>
          <MerchantRuleDiaogueBox
            data-testid="merchant-rule-dialog"
            onCreate={onMerchantRuleDialogboxCreateClick}
            onClose={onMerchantRuleDialogboxClose}
            headText={MERCHANT_RULE_HEAD}
            description={getMerchantRuleDialogBoxDescription()}
          />
        </DialogBoxStack>
      )}
      {merchantRule.isModalOpen && (
        <RuleModalWrapper>
          <CreateMerchantRuleComponent
            onCancelClick={onMerchantRuleModalCancelClick}
            onCreateRuleClick={onCreateMerchantRuleModalClick}
          />
        </RuleModalWrapper>
      )}
      {categoryRule.isModalOpen && (
        <RuleModalWrapper>
          <CreateCategoryRule
            handleCancelClick={onCategoryRuleCancelClick}
            onCreateRuleClick={onCreateCategoryRuleClick}
          />
        </RuleModalWrapper>
      )}
    </ContentStack>
  );
};

export default AccountingPage;
