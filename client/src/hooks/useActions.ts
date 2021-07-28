import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from '../actions/makeOrderActions';
import * as InfoActionCreators from '../actions/cityInfoActions';
import * as MapActionCreators from '../actions/mapActions';
import * as FeedbackActionCreators from '../actions/feedbackActions';
import * as DriverOrderNewActionCreators from '../actions/driverOrderNewActions';

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

export const useOrderNewActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(DriverOrderNewActionCreators, dispatch);
};
