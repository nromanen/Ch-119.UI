import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

/**
 * @return {Object}
 */
const OrderActive = () => {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    fetchOrders();
    console.log(orders);
  }, []);

  const fetchOrders = async () => {
    const data = await fetch(
        'https://fakestoreapi.com/products',
    );

    const items = await data.json();
    console.log(data);
    console.log(items);
    setOrders(items);
  };

  return (

    <div style={{background: '#D3D3D3', padding: '15px'}}>
      <div style={{background: '#ffff', padding: '15px', margin: '15px'}}>
        <h3>Estimated time:</h3>
        <div className='row'>
          <div className='col'>
            <Button variant="primary">3min</Button>
            <Button variant="primary">5min</Button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Button variant="primary">10min</Button>
            <Button variant="primary">15min</Button>
          </div>
        </div>
      </div>
      <div style={{background: '#ffff', padding: '15px', margin: '15px'}}>
        <p>From:</p>
        <p>To:</p>
        <p>Price:</p>
        <p>Rating:</p>
        <div>
          {/* {orders.map((item: any, index): any => (
            <p key={index}> Car type: {item.price}</p>
          ))} */}
          <p>Car type: {orders[3]?.title}</p>
        </div>
        <p>Extra services:</p>
        <Link to={'/order-accepted'}>
          <Button variant="success">Take order</Button>
        </Link>
      </div>
      <div style={{background: '#ffff', padding: '15px', margin: '15px'}}>
        <p>From:</p>
        <p>To:</p>
        <p>Price:</p>
        <p>Rating:</p>
        <div>
          {/* {orders.map((item: any, index): any => (
            <p key={index}> Car type: {item.price}</p>
          ))} */}
          <p>Car type: {orders[1]?.title}</p>
        </div>
        <p>Extra services:</p>
        <Link to={'/order-accepted'}>
          <Button variant="success">Take order</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderActive;
