import axios from 'axios';

const $host = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL!,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL!,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(authInterceptor, async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/token`,
          { withCredentials: true },
      );
      localStorage.setItem('token', response.data.accessToken);
      return $host.request(originalRequest);
    } catch (e) {
      console.log('Not authorized');
    }
  }
  throw error;
});

export { $host, $authHost };
