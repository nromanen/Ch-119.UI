import { Login } from './Login';
import { login } from '../../reducers/authReducer';
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
      console.log(payload);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
