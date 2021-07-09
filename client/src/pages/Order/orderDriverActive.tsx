import React, { useState, useEffect } from 'react';
import OrderItem from '../../components/orderItem';
import { $authHost } from '../../http/index';
import Navbar from '../../components/Navbar/Navbar';


const OrderDriverActive = () => {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await $authHost.get(`${process.env.REACT_APP_SERVER_URL}order?status=active`);

    setOrders(data.data.data.rows);
  };

  return (
    <div className="jumbotron driver-order-active">
      <h2 className="text-center">Order list:</h2>

      {
        orders.length > 0 && orders.map((order) =>
          <OrderItem key={order.id} order={order} />,
        )
      }
      <Navbar />
    </div>

  );
};

export default OrderDriverActive;
