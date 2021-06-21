import { Login } from './Login';
import { login, check } from '../../reducers/authReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (payload: any) => {
      dispatch(login(payload));
    },
    checkUser: () => {
      dispatch(check());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
