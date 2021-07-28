import axios from 'axios';
import { OrderStateI } from './../types/orderTypes';
import { ERROR_IN_ORDER } from '../constants/errorConstants';
import { $authHost } from '../http/index';
import { Statuses } from '../constants/statuses';

export class OrderDTO {
  car_type_id: number;
  customer_id: number;
  extra_services: number[];
  from: string;
  is_card: boolean;
  price: string;
  status: string;
  to: string;
  id?: number;
  constructor(order: any, id: number) {
    this.car_type_id = order.carType.id;
    this.customer_id = id || 1;
    this.extra_services = order.extraServices;
    this.from = order.from;
    this.is_card = order.paymentType !== 'cash';
    this.price = order.price;
    this.status = order.status;
    this.to = order.to;
  }
}

export interface PricesI {
  initial: number;
  distanceCoef: number;
  carTypeCoef?: number;
  services: number[] | undefined;
  distance: number;
  discount: number;
}

export const calculatePrice = (prices: any) => {
  const servicesPrice = prices.services!.reduce(
    (acc: number, val: number) => acc + +val,
    0,
  );
  return Math.ceil(
    prices.initial +
    prices.distance * prices.distanceCoef * prices.carTypeCoef! +
    servicesPrice -
    prices.discount,
  );
};

export const makeOrder = (order: OrderStateI, userId: number) => async () => {
  const orderDTO = new OrderDTO(order, userId);
  const url = `${process.env.REACT_APP_SERVER_URL}order`;
  try {
    const response = $authHost.post(url, {
      body: orderDTO,
    });
    response.catch((error) => {
      // throw new Error('Something gone wrong');
    });
    return response;
  } catch (error) {
    throw new Error(ERROR_IN_ORDER);
  }
};

export const changeOrderStatusById =
  (id: number, orderNewValues: any) => async () => {
    const url = `${process.env.REACT_APP_SERVER_URL}order`;
    try {
      const response = $authHost.put(url, {
        ...orderNewValues,
        id,
      });
      return response;
    } catch (error) {
      throw new Error(ERROR_IN_ORDER);
    }
  };

export const fetchDriverOrderNew = async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}order/list`;

  try {
    const response = $authHost.get(url, {
      params: {
        status: Statuses.ACTIVE,
        withUser: '1', // pass any not falsy value, return user info for order in customer_id column
      },
    });

    return response;
  } catch (error) {
    throw new Error(ERROR_IN_ORDER);
  }
};
export const fetchOrderCurrent = (id: number, role: string) => async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}order/list`;

  try {
    const response = $authHost.get(url, {
      params: {
        status: [Statuses.ACCEPTED, Statuses.ACTIVE],
        id,
        role,
        withUser: '1', // pass any not falsy value, return user info for order in customer_id column
      },
    });

    return response;
  } catch (error) {
    throw new Error(ERROR_IN_ORDER);
  }
};
export const fetchUserOrderCurrent = (userId: number) => async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}order/list`;

  try {
    const response = $authHost.get(url, {
      params: {
        userId,
        status: [Statuses.ACCEPTED, Statuses.ACTIVE], // add statuses that do not done or cancel
        withDriver: '1', // pass any not falsy value, return driver info for order
      },
    });

    return response;
  } catch (error) {
    throw new Error(ERROR_IN_ORDER);
  }
};

export const fetchOrderHistory = (id: number, role: string) => async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}order/list`;

  try {
    const response = $authHost.get(url, {
      params: {
        status: [Statuses.DONE, Statuses.FINISHED, Statuses.CANCELED], // change if its same
        id,
        role,
      },
    });

    return response;
  } catch (error) {
    throw new Error(ERROR_IN_ORDER);
  }
};

export const showFeedbackButton = (feedbacks: any[] = [], userRole: number) => {
  const feedback = feedbacks.find(
    (feedback: any) => feedback.author_role === userRole,
  );
  const showFeedbackButton = !feedback?.author_role;
  return showFeedbackButton;
};
