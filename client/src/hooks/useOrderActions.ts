import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from '../actions/orderActions';

export const useOrderActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(OrderActionCreators, dispatch);
};
