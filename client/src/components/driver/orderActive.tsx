import React, { useState, useEffect } from 'react';
import OrderItem from '../orderItem/orderItem';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

/**
 * @return {Object}
 */
const OrderActive = () => {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await axios.get(`${process.env.REACT_APP_HOST}order`, {
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
      {/* <div style={{background: '#ffff', padding: '15px', margin: '15px'}}>
        <h3>Estimated time:</h3>
        <div className='row'>
          <div className='col'>
            <Button className="mr-3 mb-3" variant="primary">3min</Button>
            <Button className="mb-3" variant="primary">5min</Button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Button className="mr-3" variant="primary">10min</Button>
            <Button variant="primary">15min</Button>
          </div>
        </div>
      </div> */}

      {
        orders.length > 0 && orders.map((order) =>
          <OrderItem key={order.id} order={order} />,
        )
      }
      </div>

  );
};

export default OrderActive;
