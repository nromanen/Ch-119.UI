import { connect } from 'react-redux';
import AppRouter from './AppRouter';
import { setUserData, setDriverData, check } from '../actions/authActions';

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
  checkAuth: () => {
    dispatch(check());
  },
});

export default connect(mapStateToProps, mapDispathToProps)(AppRouter);
