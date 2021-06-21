import { CITY_CAR_TYPES, CITY_SERVICES } from './modelsNames';

export const carTypes = [
  {
    name: 'basic',
    [CITY_CAR_TYPES]: {
      coef: 1.0,
      price: 12,
    },
  },
  {
    name: 'comfort',
    [CITY_CAR_TYPES]: {
      coef: 1.1,
    },
  },
  {
    name: 'eco',
    [CITY_CAR_TYPES]: {
      coef: 0.9,
    },
  },
  {
    name: 'xl',
    [CITY_CAR_TYPES]: {
      coef: 1.2,
    },
  },
  {
    name: 'luxury',
    [CITY_CAR_TYPES]: {
      coef: 2.0,
    },
  },
];
export const extraServices = [
  {
    name: 'English speaking',
    [CITY_SERVICES]: {
      price: 10,
    },
  },
  {
    name: 'Silent driver',
    [CITY_SERVICES]: {
      price: 15,
    },
  },
  {
    name: 'Baby chair',
    [CITY_SERVICES]: {
      price: 20,
    },
  },
];
