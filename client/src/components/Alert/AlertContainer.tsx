import { connect } from 'react-redux';
import Alert from './Alert';
import { errorHandle } from '../../actions/authActions';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispathToProps = (dispatch: any) => ({
  handleError: (payload: any) => {
    dispatch(errorHandle(payload));
  },
});

export default connect(mapStateToProps, mapDispathToProps)(Alert);
