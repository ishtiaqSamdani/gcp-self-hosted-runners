import { UserType } from '../utils/types';
import api from '../api';
import secureLocalStorage from 'react-secure-storage';

export const getAllUsers = async () => {
  const response = await api
    .get(`/api/users`)
    .catch((error) => console.log(error));
  const users: UserType[] = response?.data;
  return users;
};

export const loginUser = async (email: string, password: string) => {
  // const users: UserType[] = await getAllUsers();
  // const user: UserType | undefined = users.find(
  //   (u) => u.email === email && u.password === password,
  // );

  // return user ? user : Promise.reject(new Error('Authentication failed'));
  const response = await api.post(`/api/users/login/`, {
    email,
    password,
  });
  const userLoginData = response.data;
  window.localStorage.setItem('accessToken', userLoginData.authToken);
  if (userLoginData.authToken) {
    secureLocalStorage.setItem('authToken', userLoginData.authToken);
  }
  api.defaults.headers.common['Authorization'] =
    `Bearer ${userLoginData.authToken}`;
  return userLoginData.user;
};

export const postUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await api.post(`/api/users/`, {
      name,
      email,
      password,
    });

    const userLoginData = response.data;

    // window.localStorage.setItem('accessToken', userLoginData.authToken);
    // api.defaults.headers.common['Authorization'] =
    //   `Bearer ${userLoginData.authToken}`;

    return userLoginData;
  } catch (error) {
    throw Promise.reject(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await api.get(`/api/users/${email}`);

    console.log('API call');

    //const users: UserType[] = response?.data;

    // const userWithCurrentEmail: UserType | undefined = users?.find(
    //   (user: UserType) => user.email === email,
    // );
    return true;
  } catch (error) {
    console.log('user doesnot exist');
    return false;
  }
};
