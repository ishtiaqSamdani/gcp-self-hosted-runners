import {
  CategoryRuleInformationType,
  CategoryRuleType,
  DraftType,
  EACH_PAYMENT_TYPE,
  EachTransactionType,
  QuickbookCategoriesType,
  RampQuickBookMap,
  RampType,
  MappedBillData,
} from '../utils/types';
import api from '../api';

export const getAllTransactions = async () => {
  const response = await api.get(`/api/categories/users/1/transactions`);
  const transactionsData: EachTransactionType[] = response.data;

  // const transactionsData: EachTransactionType[] = await Promise.all(
  //   transactionsFromDB.map(async (transaction: TransactionInDBType) => {
  //     const vendor = await getVendorById(transaction.vendorId);
  //     const employee = await getEmployeeById(transaction.employeeId);

  //     const quickBook =
  //       transaction.quickBookId !== null &&
  //       transaction.quickBookId !== undefined &&
  //       transaction.quickBookId > 0
  //         ? await getQuickbookById(transaction.quickBookId)
  //         : null;
  //     const tempTransaction: EachTransactionType = {
  //       id: transaction.id,
  //       vendor: vendor,
  //       amount: transaction.amount,
  //       date: transaction.date,
  //       employee: employee,
  //       quickBook: quickBook,
  //       receipt: transaction.receipt,
  //       memo: transaction.memo,
  //     };

  //     return tempTransaction;
  //   }),
  // );

  return transactionsData;
};

// export const getVendorById = async (vendorId: number) => {
//   try {
//     const response = await axios.get(`${MOCK_SERVER_URL}/vendors/${vendorId}`);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export const getEmployeeById = async (employeeId: number) => {
//   try {
//     const response = await axios.get(
//       `${MOCK_SERVER_URL}/employees/${employeeId}`,
//     );

//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

export const getQuickbookById = async (quickbookId: number, userId: number) => {
  try {
    const quickBooks: QuickbookCategoriesType[] =
      await getAllQuickBooks(userId);
    return quickBooks.find((quickBook) => quickBook.id === quickbookId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllQuickBooks = async (userId: number) => {
  try {
    const response = await api.get(`/api/categories/users/1/quickbooks`);

    return response.data as QuickbookCategoriesType[];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addQuickbookIdToTransaction = async (
  transactionId: number,
  quickBookId: number,
) => {
  try {
    await api.patch(`/api/categories/transactions/${transactionId}`, {
      quickBookId: quickBookId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTransactionById = async (transactionId: number) => {
  try {
    await api.delete(`/api/categories/transactions/${transactionId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategoryRule = async (category: CategoryRuleType) => {
  try {
    await api.post(`/api/categories/category-rules`, {
      rampId: category.ramp.id,
      quickBookId: category.quickbook.id,
      userId: category.userId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoryRuleInformation = async (userId: number) => {
  const categoryRulesData: CategoryRuleInformationType = {
    activeRules: [],
    recentCategory: [],
  };

  let ramps: RampType[] = [];
  try {
    ramps = await getAllRamps(userId);
  } catch (error) {
    alert(error);
  }

  // let quickBooks: QuickbookCategoriesType[] = [];
  // try {
  //   quickBooks = await getAllQuickBooks();
  // } catch (error) {
  //   alert(error);
  // }

  let categoryRules: CategoryRuleType[] = [];
  try {
    categoryRules = await getAllCategoryRules(userId);
  } catch (error) {
    alert(error);
  }

  const activeRulesData: RampQuickBookMap[] = [];
  const recentCategory: RampQuickBookMap[] = [];
  categoryRules.map((rule) => {
    // const rampData: RampType | undefined = ramps.find(
    //   (ramp) => ramp.id === rule.ramp.id,
    // );
    // const quickBook: QuickbookCategoriesType | undefined = quickBooks.find(
    //   (quickBook) => quickBook.id === rule.quickbookId,
    // );
    const tempActiveRules: RampQuickBookMap = {
      rampId: rule.ramp.id,
      rampName: rule.ramp.name,
      quickBookId: rule.quickbook.id,
      quickBookName: rule.quickbook.name,
    };

    activeRulesData.push(tempActiveRules);
  });
  ramps.map(async (ramp) => {
    if (
      categoryRules.findIndex(
        (categoryRule) => categoryRule.ramp.id === ramp.id,
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

export const getAllRamps = async (userId: number) => {
  try {
    const response = await api.get(`/api/categories/users/${userId}/ramps`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategoryRules = async (userId: number) => {
  try {
    const response = await api.get(
      `/api/categories/users/${userId}/category-rules`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const postUser = async (
//   name: string,
//   email: string,
//   password: string,
// ) => {
//   try {
//     const response = await axios.post(`${MOCK_SERVER_URL}/users/`, {
//       name,
//       email,
//       password,
//     });
//     const userLoginData: UserType = response.data;
//     return userLoginData;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

export const getAllDraftedBills = async (userId: number) => {
  try {
    const response = await api.get(`/api/bills/users/${userId}?status=DRAFTED`);
    const bills: DraftType[] = response.data;
    return bills;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDraftedBillWithStatus = async (billId: number) => {
  try {
    const response = await api.patch(`/api/bills/${billId}`, {
      status: 'APPROVED',
      paymentDate: new Date(),
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllPaymentBills = async (userId: number) => {
  try {
    const response = await api.get(
      `/api/bills/users/${userId}?status=APPROVED`,
    );
    const bills: EACH_PAYMENT_TYPE[] = response.data;
    return bills;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const createNewBill = async (billData: MappedBillData) => {
  try {
    await api.post(`/api/bills/`, billData);
  } catch (error) {
    return Promise.reject(error);
  }
};
