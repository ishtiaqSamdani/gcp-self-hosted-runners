import axios from 'axios';
import { MOCK_SERVER_URL } from '../config/url';
import { UserType } from '../utils/types';

export const getAllUsers = async () => {
  const response = await axios
    .get(`${MOCK_SERVER_URL}/users`)
    .catch((error) => console.log(error));
  const users: UserType[] = response?.data;
  return users;
};

export const loginUser = async (email: string, password: string) => {
  const users: UserType[] = await getAllUsers();
  const user: UserType | undefined = users.find(
    (u) => u.email === email && u.password === password,
  );

  return user ? user : Promise.reject(new Error('Authentication failed'));
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
    return response.data as UserType;
  } catch (error) {
    throw Promise.reject(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/users`);

    const users: UserType[] = response?.data;

    const userWithCurrentEmail: UserType | undefined = users?.find(
      (user: UserType) => user.email === email,
    );
    return userWithCurrentEmail ? true : false;
  } catch (error) {
    console.log('user doesnot exist');
    return false;
  }
};
