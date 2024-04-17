import React, { ReactNode, createContext, useContext, useState } from 'react';
import {
  INSIGHTS,
  RAMP_CONTEXT_ERROR,
  REIMBURSMENTS_DROPDOWN_OPTIONS,
} from '../utils/constants';

interface IRampTabsProps {
  activeTab: string;
  setCurrentTab: (currentTab: string) => void;
  reimbursementTabValue: string;
  setCurrentReimbursementTab: (currentReimbursementTab: string) => void;
}

const RampTabsContext = createContext<IRampTabsProps | undefined>(undefined);

const RampTabsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>(INSIGHTS);
  const [reimbursementTabValue, setReimbursementTabValue] = useState<string>(
    REIMBURSMENTS_DROPDOWN_OPTIONS[0],
  );

  const setCurrentTab = (currentTab: string) => {
    setActiveTab(currentTab);
  };

  const setCurrentReimbursementTab = (currentReimbursementTab: string) => {
    setReimbursementTabValue(currentReimbursementTab);
  };

  return (
    <RampTabsContext.Provider
      value={{
        activeTab,
        setCurrentTab,
        reimbursementTabValue,
        setCurrentReimbursementTab,
      }}
    >
      {children}
    </RampTabsContext.Provider>
  );
};

export { RampTabsContext, RampTabsContextProvider };

export const useRampTabsContext = (): IRampTabsProps => {
  const context = useContext(RampTabsContext);
  if (context === undefined) {
    throw new Error(RAMP_CONTEXT_ERROR);
  }
  return context;
};
