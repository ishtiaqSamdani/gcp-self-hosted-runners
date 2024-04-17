import api from '../api';

export const createMerchantRule = async (
  vendorName: string,
  quickbooksId: number,
  userId: number,
) => {
  try {
    await api.post(`/api/categories/merchant-rules`, {
      vendorName: vendorName,
      quickbookId: quickbooksId,
      userId: userId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllMerchantRulesByUserId = async (userId: number) => {
  try {
    const response = await api.get(
      `/api/categories/users/${userId}/merchant-rules`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategoryRulesByUserId = async (userId: number) => {
  try {
    const response = await api.get(
      `/api/categories/users/${userId}/category-rules`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
