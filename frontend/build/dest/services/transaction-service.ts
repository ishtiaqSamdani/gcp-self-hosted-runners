import axios from 'axios';
import {
  CategoryRuleInformationType,
  CategoryRuleType,
  DraftType,
  EACH_PAYMENT_TYPE,
  EachTransactionType,
  QuickbookCategoriesType,
  RampQuickBookMap,
  RampType,
  TransactionInDBType,
  UserType,
  MappedBillData,
} from '../utils/types';
import { MOCK_SERVER_URL } from '../config/url';

export const getAllTransactions = async () => {
  const response = await axios.get(`${MOCK_SERVER_URL}/transactions`);
  const transactionsFromDB = response.data;

  const transactionsData: EachTransactionType[] = await Promise.all(
    transactionsFromDB.map(async (transaction: TransactionInDBType) => {
      const vendor = await getVendorById(transaction.vendorId);
      const employee = await getEmployeeById(transaction.employeeId);

      const quickBook =
        transaction.quickBookId !== null &&
        transaction.quickBookId !== undefined &&
        transaction.quickBookId > 0
          ? await getQuickbookById(transaction.quickBookId)
          : null;
      const tempTransaction: EachTransactionType = {
        id: transaction.id,
        vendor: vendor,
        amount: transaction.amount,
        date: transaction.date,
        employee: employee,
        quickBook: quickBook,
        receipt: transaction.receipt,
        memo: transaction.memo,
      };

      return tempTransaction;
    }),
  );

  return transactionsData;
};

export const getVendorById = async (vendorId: number) => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/vendors/${vendorId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEmployeeById = async (employeeId: number) => {
  try {
    const response = await axios.get(
      `${MOCK_SERVER_URL}/employees/${employeeId}`,
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getQuickbookById = async (quickbookId: number) => {
  try {
    const response = await axios.get(
      `${MOCK_SERVER_URL}/quickBooks/${quickbookId}`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllQuickBooks = async () => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/quickBooks`);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addQuickbookIdToTransaction = async (
  transactionId: number,
  quickBookId: number,
) => {
  try {
    await axios.patch(`${MOCK_SERVER_URL}/transactions/${transactionId}`, {
      quickBookId: quickBookId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTransactionById = async (transactionId: number) => {
  try {
    await axios.delete(`${MOCK_SERVER_URL}/transactions/${transactionId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategoryRule = async (
  rampId: number,
  quickBookId: number,
) => {
  try {
    await axios.post(`${MOCK_SERVER_URL}/categoryRules`, {
      rampId: rampId,
      quickBookId: quickBookId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoryRuleInformation = async () => {
  const categoryRulesData: CategoryRuleInformationType = {
    activeRules: [],
    recentCategory: [],
  };

  let ramps: RampType[] = [];
  try {
    ramps = await getAllRamps();
  } catch (error) {
    alert(error);
  }

  let quickBooks: QuickbookCategoriesType[] = [];
  try {
    quickBooks = await getAllQuickBooks();
  } catch (error) {
    alert(error);
  }

  let categoryRules: CategoryRuleType[] = [];
  try {
    categoryRules = await getAllCategoryRules();
  } catch (error) {
    alert(error);
  }

  const activeRulesData: RampQuickBookMap[] = [];
  const recentCategory: RampQuickBookMap[] = [];
  categoryRules.map((rule) => {
    const rampData: RampType | undefined = ramps.find(
      (ramp) => ramp.id === rule.rampId,
    );
    const quickBook: QuickbookCategoriesType | undefined = quickBooks.find(
      (quickBook) => quickBook.id === rule.quickBookId,
    );
    const tempActiveRules: RampQuickBookMap = {
      rampId: rule.rampId,
      rampName: rampData?.name ?? '',
      quickBookId: rule.quickBookId,
      quickBookName: quickBook?.name ?? '',
    };

    activeRulesData.push(tempActiveRules);
  });
  ramps.map(async (ramp) => {
    if (
      categoryRules.findIndex(
        (categoryRule) => categoryRule.rampId === ramp.id,
      ) === -1
    ) {
      const tempRecentCategory: RampQuickBookMap = {
        rampId: ramp.id,
        quickBookId: 0,
        rampName: ramp.name,
        quickBookName: '',
      };
      recentCategory.push(tempRecentCategory);
    }
  });

  categoryRulesData.activeRules = activeRulesData;
  categoryRulesData.recentCategory = recentCategory;

  return categoryRulesData;
};

export const getAllRamps = async () => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/ramps`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategoryRules = async () => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/categoryRules`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${MOCK_SERVER_URL}/users/`, {
      name,
      email,
      password,
    });
    const userLoginData: UserType = response.data;
    return userLoginData;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllDraftedBills = async () => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/bills`);
    const bills: DraftType[] = response.data.filter(
      (bill: DraftType) => bill.status !== 'approved',
    );
    return bills;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDraftedBillWithStatus = async (billId: number) => {
  try {
    const response = await axios.patch(`${MOCK_SERVER_URL}/bills/${billId}`, {
      status: 'approved',
      paymentDate: new Date(),
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllPaymentBills = async () => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/bills`);
    const bills: EACH_PAYMENT_TYPE[] = response.data.filter(
      (bill: DraftType) => bill.status === 'approved',
    );
    return bills;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const createNewBill = async (billData: MappedBillData) => {
  try {
    await axios.post(`${MOCK_SERVER_URL}/bills/`, billData);
  } catch (error) {
    return Promise.reject(error);
  }
};
