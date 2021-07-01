import { $host, $authHost } from './index';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { USER_ROLE, DRIVER_ROLE } from '../constants/registrationConstants';

export const registration = (
  name: string,
  phone: string,
  password: string,
) => async () => {
  try {
    const { data } = await $host.post('user/registration', {
      name,
      phone,
      password,
      role: USER_ROLE,
    });

    if (data.id) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return new Promise((resolve, reject) =>
        resolve(jwtDecode(data.accessToken, data.refreshToken)),
      );
    } else return data.response.message;
  } catch (e: any) {
    return e.response?.data?.message;
  }
};

export const registrationDriver = (
  name: string,
  phone: string,
  password: string,
  car_color: string,
  car_model: string,
  car_number: string,
) => async () => {
  try {
    const { data } = await $host.post('user/registration', {
      name,
      phone,
      password,
      role: [USER_ROLE, DRIVER_ROLE],
      car_color,
      car_model,
      car_number,
    });

    if (data.id) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return new Promise((resolve, reject) =>
        resolve(jwtDecode(data.accessToken, data.refreshToken)),
      );
    } else {
      return data.response.message;
    }
  } catch (e: any) {
    return e.response?.data?.message;
  }
};

export const login = (phone: string, password: string, verification_code?: number) => async () => {
  try {
    const { data } = await $host.post('user/login', { phone, password, verification_code });
    if (data) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return new Promise((resolve, reject) =>
        resolve(jwtDecode(data.accessToken, data.refreshToken)),
      );
    } else {
      return data.response.message;
    }
  } catch (e: any) {
    return e.response?.data?.message;
  }
};

export const logout = () => async () => {
  try {
    const response = await $host.delete('user/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return new Promise((resolve, reject) => resolve(response));
  } catch (e: any) {
    return e.response?.data?.message;
  }
};

export const check = () => async () => {
  const { data } = await $authHost.get('user/auth');
  try {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return new Promise((resolve, reject) =>
      resolve(jwtDecode(data.accessToken, data.refreshToken)),
    );
  } catch (e: any) {
    return e.response?.data?.message;
  }
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
    return e.response?.data?.message;
  }
};
