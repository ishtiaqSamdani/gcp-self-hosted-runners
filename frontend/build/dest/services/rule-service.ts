import axios from 'axios';
import { MOCK_SERVER_URL } from '../config/url';

export const createMerchantRule = async (
  vendorName: string,
  quickbooksId: number,
  userId: number,
) => {
  try {
    await axios.post(`${MOCK_SERVER_URL}/merchantRules`, {
      vendorName: vendorName,
      quickBookId: quickbooksId,
      userId: userId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllMerchantRulesByUserId = async (userId: number) => {
  try {
    const response = await axios.get(
      `${MOCK_SERVER_URL}/merchantRules?userId=${userId}`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCategoryRulesByUserId = async (userId: number) => {
  try {
    const response = await axios.get(
      `${MOCK_SERVER_URL}/categoryRules?userId=${userId}`,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
