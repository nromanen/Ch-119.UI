import { $host, $authHost } from './index';
import jwtDecode from 'jwt-decode';

export const registration = async (
    name: string,
    phone: string,
    password: string,
) => {
  const { data } = await $host.post('user/registration', {
    name,
    phone,
    password,
    role: 'USER',
  });

  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  return jwtDecode(data.token, data.refreshToken);
};

export const login = async (phone: string, password: string) => {
  const { data } = await $host.post('user/login', { phone, password });
  console.log(data);

  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  return jwtDecode(data.accessToken, data.refreshToken);
};

export const check = async () => {
  const { data } = await $authHost.get('user/auth');

  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  return jwtDecode(data.token, data.refreshToken);
};
