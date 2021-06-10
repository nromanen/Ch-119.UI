import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

/**
 * @return {Object}
 */
const OrderAccepted = () => {
  const [order, setOrders] = useState<any[]>([]);
  useEffect(() => {
    fetchOrders();
    console.log(order);
  }, []);

  const fetchOrders = async () => {
    const data = await fetch(
        'https://fakestoreapi.com/products',
    );

    const item = await data.json();
    console.log(data);
    console.log(item);
    setOrders(item);
  };

  return (
    <div style={{background: '#D3D3D3', padding: '15px'}}>
      <div style={{background: '#ffff', padding: '15px', margin: '15px'}}>
        <h3>Order is accepted.</h3>
        <p>Name: {order[2]?.title}</p>
        <p>From:</p>
        <p>To:</p>
        <p>Price:</p>
        <p>Phone:</p>
        <p>Extra services:</p>
        <Link to={'#'}>
          <Button variant="success">Finish</Button>
        </Link>
        <Link to={'#'}>
          <Button variant="danger">Cancel</Button>
        </Link>
        <Link to={'#'}>
          <Button variant="warning">Waiting</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderAccepted;
