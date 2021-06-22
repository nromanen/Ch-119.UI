import { OrderFormContainer } from './OrderForm/OrderFormContainer';
import { MapContainer } from './Map/MapContainer';
import './Order.scss';


export const Order = () => {
  return (
    <>
      <MapContainer />
      <OrderFormContainer />
    </>
  );
};
