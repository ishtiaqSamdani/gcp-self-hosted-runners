import React, { useCallback } from 'react';
import { Box, styled } from '@mui/material';
import AllDrafts from '../../components/organisms/AllDrafts';
import { useRampTabsContext } from '../../contexts/RampTabsContext';
import AllPayments from '../../components/organisms/AllPayments';
import {
  NAVIGATE_NEW_BILL,
  REIMBURSMENTS_DROPDOWN_OPTIONS,
} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const StyledContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '3rem 6rem 0rem 3rem',
});

const ReimbursementTab = () => {
  const { reimbursementTabValue } = useRampTabsContext();

  const navigate = useNavigate();

  const handleNewBillClick = useCallback(() => {
    navigate(NAVIGATE_NEW_BILL);
  }, []);

  return (
    <StyledContentContainer data-testid="reimbursement-tab">
      {reimbursementTabValue === REIMBURSMENTS_DROPDOWN_OPTIONS[0] ? (
        <AllDrafts handleNewBillClick={handleNewBillClick} />
      ) : (
        <AllPayments handleNewBillClick={handleNewBillClick} />
      )}
    </StyledContentContainer>
  );
};

export default React.memo(ReimbursementTab);
