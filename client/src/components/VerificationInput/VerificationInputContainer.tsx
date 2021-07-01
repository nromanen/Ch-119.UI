import { connect } from 'react-redux';
import VerificationInput from './VerificationInput';
import { errorHandle, verifyUser, login } from '../../actions/authActions';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispathToProps = (dispatch: any) => ({
  splitError: (value: any) => {
    return value.split(' ')[4];
  },
  handleError: (payload: any) => {
    dispatch(errorHandle(payload));
  },
  verifyCode: (payload: any) => {
    dispatch(verifyUser(payload));
  },
  loginUser: (payload: any) => {
    dispatch(login(payload));
  },
});

export default connect(mapStateToProps, mapDispathToProps)(VerificationInput);
