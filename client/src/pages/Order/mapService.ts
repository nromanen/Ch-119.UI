import axios from 'axios';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
    REACT_APP_SERVER_URL: string;
  };
};

interface CityCarTypeI {
  coef: number;
  createdAt: Date;
  updatedAt: Date;
  carTypeId: number;
  cityId: number;
}
interface CityExtraServiceI {
  price: number;
  createdAt: Date;
  updatedAt: Date;
  carTypeId: number;
  cityId: number;
}

export interface CarTypesI {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  city_car_type: CityCarTypeI;
}
export interface ExtraServicesI {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  city_service: CityExtraServiceI;
}

export interface CityInfoI {
  id: number;
  name: string;
  basePrice: number;
  basePriceForKm: number;
  createdAt?: Date;
  updatedAt?: Date;
  car_types: CarTypesI[];
  extra_services: ExtraServicesI[];
}

export const fetchCityInfo = (name: string) => () => {
  // remove createdDate
  console.log('PROCESS', process.env.REACT_APP_SERVER_URL);

  const response = axios.get<CityInfoI>(
    `${process.env.REACT_APP_SERVER_URL}info`,
    {
      params: {
        name,
      },
    },
  );
  return response;

  // if (res.statusText === 'OK') {
  //   console.log(res, 'info');
  //   return res.data.data;
  // }
};

// TODO get User from store
export class OrderDTO {
  car_type: string;
  customer_id: number;
  extra_services: number[];
  from: string;
  is_card: boolean;
  price: string;
  status: string;
  to: string;
  constructor(order: any) {
    this.car_type = order.car_type;
    this.customer_id = order.customer_id || 1;
    this.extra_services = order.extraServices;
    this.from = order.from;
    this.is_card = order.paymentType !== 'cash';
    this.price = order.price;
    this.status = order.status;
    this.to = order.to;
  }
}
