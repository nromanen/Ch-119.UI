import axios from 'axios';
import { CityInfoI } from '../types/cityInfoTypes';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
    REACT_APP_SERVER_URL: string;
  };
};

export const fetchCityInfo = (name: string) => () => {
  const response = axios.get<CityInfoI>(
    `${process.env.REACT_APP_SERVER_URL}info`,
    {
      params: {
        name,
      },
    },
  );
  return response;
};
