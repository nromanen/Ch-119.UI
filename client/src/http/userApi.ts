import { $host, $authHost } from './index';
import jwtDecode from 'jwt-decode';

export const registration = (
    name: string,
    phone: string,
    password: string,
) => async () => {
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
  const { data } = await $host.post('user/login', { phone, password });
  console.log(data);

  if (data) {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return new Promise((resolve, reject) =>
      resolve(jwtDecode(data.accessToken, data.refreshToken)),
    );
  } else return 'Invalid Data';
};

export const check = async () => {
  const { data } = await $authHost.get('user/auth');

  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return jwtDecode(data.accessToken, data.refreshToken);
};
