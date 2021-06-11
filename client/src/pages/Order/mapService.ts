import axios from 'axios';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
    REACT_APP_HOST: string;
  };
};

export const getCityInfo = async (name = 'Чернівці') => {
  console.log('get info');

  const res = await axios.get(`${process.env.REACT_APP_HOST}info`, {
    params: {
      name,
    },
  });

  if (res.statusText === 'OK') {
    console.log(res, 'info');
    return res.data.data;
  }
};
