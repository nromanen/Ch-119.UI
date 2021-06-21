import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActionCreators from '../actions/orderActions';
import * as InfoActionCreators from '../actions/cityInfoActions';
import * as MapActionCreators from '../actions/mapActions';

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
