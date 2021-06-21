import React, { useState, useEffect } from 'react';
import OrderItem from '../../components/orderItem';
import axios from 'axios';


/**
 * @return {Object}
 */
const OrderDriverActive = () => {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}order`, {
      params: {
        'status': 'active',
      },
    });

    console.log(data);
    setOrders(data.data.data.rows);
  };

  return (
    <div className="jumbotron">
      <h2 className="text-center">Order list:</h2>

      {
        orders.length > 0 && orders.map((order) =>
          <OrderItem key={order.id} order={order} />,
        )
      }
    </div>

  );
};

export default OrderDriverActive;
