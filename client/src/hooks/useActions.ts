import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from '../actions/orderActions';
import * as InfoActionCreators from '../actions/infoActions';
import * as FeedbackActionCreators from '../actions/feedbackActions';

export const useOrderActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(OrderActionCreators, dispatch);
};

export const useInfoActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(InfoActionCreators, dispatch);
};

export const useFeedbackActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(FeedbackActionCreators, dispatch);
};
