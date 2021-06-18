import { $host, $authHost } from './index';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export const registration =
  (name: string, phone: string, password: string) => async () => {
    const { data } = await $host.post('user/registration', {
      name,
      phone,
      password,
      role: 'USER',
    });

    if (data) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return new Promise((resolve, reject) =>
        resolve(jwtDecode(data.accessToken, data.refreshToken)),
      );
    } else return 'Invalid Data';
  };

export const login = (phone: string, password: string) => async () => {
  try {
    const { data } = await $host.post('user/login', { phone, password });
    console.log(data);
    if (data) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return new Promise((resolve, reject) =>
        resolve(jwtDecode(data.accessToken, data.refreshToken)),
      );
    } else {
      console.log('Invalid data', data.message);
    }
  } catch (e) {
    console.log('');
  }
};

export const logout = () => async () => {
  try {
    const response = await $host.delete('user/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return new Promise((resolve, reject) => resolve(response));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
};
// add one more action with setAuth and implement
// it in login and registrate logic
// setAuth need only one parametr true and he change state
// from isAuth: false on true
// it can be add in redux-saga layer yield put(setAuth, true)
export const check = () => async () => {
  const { data } = await $authHost.get('user/auth');

  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return new Promise((resolve, reject) =>
    resolve(jwtDecode(data.accessToken, data.refreshToken)),
  );
};

export const checkAuth = () => async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL!}/user/token`,
      { withCredentials: true },
    );
    localStorage.setItem('token', data.accessToken);
    return new Promise((resolve, reject) =>
      resolve(jwtDecode(data.accessToken)),
    );
  } catch (e: any) {
    console.log(e.respose?.data?.message);
  }
};
