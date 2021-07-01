import React, { useEffect } from 'react';
import OrderItem from '../../components/Order/OrderItem';
import Navbar from '../../components/Navbar/Navbar';
import { fetchOrders } from '../../reducers/ordersReducer';
import { useDispatch, useSelector } from 'react-redux';


const OrderList = () => {
  const orders = useSelector((state: any) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="jumbotron driver-order-active">
      <h2 className="text-center">Order list:</h2>

      {
        orders.length > 0 && orders.map((order: any) =>
          <OrderItem key={order.id} order={order} />,
        )
      }
      <Navbar />
    </div>

  );
};

export default OrderList;
