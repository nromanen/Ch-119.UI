import axios from 'axios';
import { OrderStateI } from './../types/orderTypes';

export class OrderDTO {
  carTypeId: number;
  customer_id: number;
  extra_services: number[];
  from: string;
  is_card: boolean;
  price: string;
  status: string;
  to: string;
  constructor(order: any, id: number) {
    this.carTypeId = order.carType.id;
    this.customer_id = id || 1;
    this.extra_services = order.extraServices;
    this.from = order.from;
    this.is_card = order.paymentType !== 'cash';
    this.price = order.price;
    this.status = order.status;
    this.to = order.to;
  }
}

export const makeOrder = (order: OrderStateI, userId: number) => async () => {
  const orderDTO = new OrderDTO(order, userId);
  const url = `${process.env.REACT_APP_SERVER_URL}order`;
  try {
    const response = axios.post(url, {
      body: orderDTO,
    });
    response.catch((error) => {
      // throw new Error('Something gone wrong');
    });
    return response;
  } catch (error) {
    throw new Error('Something gone wrong');
  }
};
