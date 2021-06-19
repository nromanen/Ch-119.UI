import { Registration } from './Registration';
import { registrate } from '../../reducers/authReducer';
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
