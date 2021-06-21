import { Login } from './Login';
import { login, check } from '../../actions/authActions';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => (
    {loginUser: (payload: any) => {
      dispatch(login(payload));
    },
    checkUser: () => {
      dispatch(check());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
