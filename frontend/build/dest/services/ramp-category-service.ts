import axios from 'axios';
import { MOCK_SERVER_URL } from '../config/url';

export const createRampCategory = async (category: string) => {
  try {
    await axios.post(`${MOCK_SERVER_URL}/ramps`, {
      name: category,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
