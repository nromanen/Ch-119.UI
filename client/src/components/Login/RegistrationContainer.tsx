import { Registration } from './Registration';
import { registrate, registrateDriver, checkDriver } from '../../reducers/authReducer'; // checkDriver
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    registrateUser: (payload: any) => {
      dispatch(registrate(payload));
    },
    registrateDriver: (payload: any) => {
      dispatch(registrateDriver(payload));
    },
    checkDriverState: (payload: any) => {
      dispatch(checkDriver(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
