import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from '../actions/orderActions';
import * as InfoActionCreators from '../actions/cityInfoActions';
import * as MapActionCreators from '../actions/mapActions';
import * as FeedbackActionCreators from '../actions/feedbackActions';
import * as DriverOrderNewActionCreators from '../actions/driverOrderNewActions';
import * as UserOrderActionCreators from '../actions/userOrdersActions';

export const useOrderActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(OrderActionCreators, dispatch);
};

export const useInfoActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(InfoActionCreators, dispatch);
};
export const useMapActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(MapActionCreators, dispatch);
};
export const useFeedbackActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(FeedbackActionCreators, dispatch);
};

export const useDriverOrderNewActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(DriverOrderNewActionCreators, dispatch);
};
export const useUserOrderActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(UserOrderActionCreators, dispatch);
};
