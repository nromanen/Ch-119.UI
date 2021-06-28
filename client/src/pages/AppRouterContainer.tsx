import { connect } from 'react-redux';
import AppRouter from './AppRouter';
import { setUserData, setDriverData } from '../actions/authActions';
import { checkAuth } from '../http/userApi';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispathToProps = (dispatch: any) => ({
  setUser: (payload: any) => {
    dispatch(setUserData(payload));
  },
  setDriver: (payload: any) => {
    dispatch(setDriverData(payload));
  },
  check: () => {
    dispatch(checkAuth());
  },
});

export default connect(mapStateToProps, mapDispathToProps)(AppRouter);
