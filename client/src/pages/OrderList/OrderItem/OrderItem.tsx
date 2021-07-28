import { FC } from 'react';
import {
  useOrderNewActions,
  useFeedbackActions,
} from '../../../hooks/useActions';
import { Statuses } from '../../../constants/statuses';

import { extraServicesIcons } from '../../../components/ExtraServices/icons';
import { Pages } from '../../../constants/routerConstants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faArrowAltCircleRight,
  faHryvnia,
  faInfoCircle,
  faTaxi,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import './OrderItem.scss';

const CarInfoLabel: FC<any> = (label: string, value: string) => (
  <div className="info" title="!isDriver && info">
    <p className="info__label">{label}:</p>
    <p className="info__value">{value}</p>
  </div>
);

export interface CustomerInfoI {
  name: string | null;
  phone: string | null;
}

export interface DriverInfoI {
  carColor: string;
  carNumber: string;
  carModel: string;
  rating: number;
}

interface OrderItemPropsI {
  orderId: number;
  from: string;
  to: string;
  status: string;
  price: string;
  carType: string;
  extraServices: [number];
  lastUpdate: Date;
  isDriver: boolean;
  page: Pages;
  customerInfo?: CustomerInfoI;
  driverInfo?: { carColor: string, carNumber: string, carModel: string, rating: number };
  mayTakeOrder?: boolean;
  showFeedbackButton?: boolean;
  customerId?: number;
  driverId?: number | null;
}

export const OrderItem: FC<OrderItemPropsI> = ({
  orderId,
  from,
  to,
  status,
  price,
  carType,
  extraServices,
  lastUpdate,
  isDriver,
  page,
  driverInfo,
  mayTakeOrder,
  showFeedbackButton,
  customerId,
  driverId,
}) => {
  const newFrom = from.split(', ').slice(0, 2).join(', ');
  const newTo = to.split(', ').slice(0, 2).join(', ');
  const date = new Date(lastUpdate).toLocaleDateString();
  const time = new Date(lastUpdate).toLocaleTimeString();

  const { changeOrderStatusAction } = useOrderNewActions();
  const { toggleModal, changeFeedbackValues } = useFeedbackActions();

  const onClickFeedback = () => {
    const orderProps = {
      orderId,
      customerId,
    };
    changeFeedbackValues(orderProps);
    toggleModal();
  };

  const onCancelHandler = () => {
    changeOrderStatusAction({
      status: Statuses.CANCELED,
      id: orderId,
    });
  };

  const ButtonCancel = () => (
    <button
      onClick={onCancelHandler}
      className="request__button cancel button button--hovered button--outlined button--border"
    >
      Cancel
    </button>
  );

  const ButtonFinish = () => (
    <button
      onClick={() =>
        changeOrderStatusAction({
          status: Statuses.FINISHED,
          id: orderId,
          customerId,
        })
      }
      className="request__button finish button button--hovered button--outlined button--border"
    >
      Finish
    </button>
  );

  const ButtonTake = () => (
    <button
      onClick={() => {
        changeOrderStatusAction({
          status: Statuses.ACCEPTED,
          id: orderId,
        });
      }}
      className="request__button take button button--hovered button--outlined button--border"
      disabled={mayTakeOrder}
      title={
        mayTakeOrder
          ? 'You should finish current order!'
          : 'Take order.'
      }
    >
      Take
    </button>
  );

  const ButtonFeedback = () => (
    <button
      onClick={onClickFeedback}
      className="request__button take button button--hovered button--outlined button--border"
      title="Leave feedback"
    >
      Feedback
    </button>
  );

  return (
    <li className="request__item">
      <div className="grid__container">
        <div className="padding">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {newFrom}
        </div>

        <div>
          <div>
            <div>
              <div className="info__center">
                <div>
                  <FontAwesomeIcon icon={faTaxi} />
                  <span className="info__value"> {carType}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHryvnia} />
                  <span className="info__value"> {price}</span>
                </div>
              </div>

              {page === Pages.CURRENT && (
                <ButtonCancel />
              )}

              {page === Pages.CURRENT && isDriver && (
                <ButtonFinish />
              )}

              {page === Pages.ACTIVE && isDriver && (
                <ButtonTake />
              )}

              {page === Pages.HISTORY && showFeedbackButton && driverId && (
                <ButtonFeedback />
              )}
            </div>

            {driverInfo?.rating && (
              <div>
                <span className="info__label">rating: </span>
                <span className="info__value">{driverInfo.rating}</span>
              </div>
            )}
          </div>
        </div>

        <div className="padding">
          <FontAwesomeIcon icon={faArrowAltCircleRight} /> {newTo}
        </div>
      </div>

      <div className="grid__footer">
        <div className="info">
          <FontAwesomeIcon icon={faInfoCircle} />
          <p className="info__value">{status}</p>
        </div>

        <div className="info">
          <p className="info__label">
            <FontAwesomeIcon icon={faClock} />
          </p>
          <p className="info__value date">
            {page === Pages.HISTORY && (
              <span>
                {date}
                <br />
              </span>
            )}
            {time}
          </p>
        </div>

        {extraServices.length > 0 && (
          <div className="info" title="request.description">
            <div className="info__extra-services">
              {extraServices
                .map((serviceName: number) => {
                  const Icon = extraServicesIcons[serviceName];
                  return (
                    <Icon
                      key={serviceName}
                      className="info__extra-services-icon"
                      title={serviceName}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {!isDriver && driverInfo && (
          <>
            <CarInfoLabel label="Car model" value={driverInfo.carModel} />
            <CarInfoLabel label="Car color" value={driverInfo.carColor} />
            <CarInfoLabel label="Car number" value={driverInfo.carNumber} />
          </>
        )}
      </div>
    </li>
  );
};
