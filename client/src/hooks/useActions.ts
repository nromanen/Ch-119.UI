import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from '../actions/orderActions';
import * as InfoActionCreators from '../actions/cityInfoActions';
import * as MapActionCreators from '../actions/mapActions';
import * as FeedbackActionCreators from '../actions/feedbackActions';
import * as FeedbackFormActionCreators from '../actions/feedbackFormActions';

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

export const useFeedbackFormActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(FeedbackFormActionCreators, dispatch);
};
