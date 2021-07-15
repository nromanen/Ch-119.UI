import { OrderFormContainer } from './OrderForm/OrderFormContainer';
import { MapContainer } from './Map/MapContainer';
import './Order.scss';
import { Swipe } from './../../components/Swipe/Swipe';

export const MakeOrder = () => (
  <>
    <MapContainer />
    <Swipe></Swipe>
    <OrderFormContainer />
  </>
);
