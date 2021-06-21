import { OrderFormContainer } from './OrderForm/OrderFormContainer';
import { MapContainer } from './Map/MapContainer';
import Navbar from '../../components/Navbar/Navbar';
import './Order.scss';


export const Order = () => {
  return (
    <>
      <MapContainer />
      <OrderFormContainer />
      <Navbar/>
    </>
  );
};
