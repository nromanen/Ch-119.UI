import axios from 'axios';
import { CityInfoI } from '../types/cityInfoTypes';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
    REACT_APP_SERVER_URL: string;
  };
};

const url = process.env.REACT_APP_SERVER_URL;

export const fetchCityInfo = (name: string) => () => {
  const response = axios.get<CityInfoI>(`${url}info`, {
    params: {
      name,
    },
  });
  return response;
};
