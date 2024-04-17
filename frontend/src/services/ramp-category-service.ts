import api from '../api';

export const createRampCategory = async (userId: number, category: string) => {
  try {
    await api.post(`/api/categories/ramps`, {
      name: category,
      userId: userId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
