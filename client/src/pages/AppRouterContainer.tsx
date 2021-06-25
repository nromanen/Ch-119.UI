import { connect } from 'react-redux';
import AppRouter from './AppRouter';
import { setUserData } from '../actions/authActions';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispathToProps = (dispatch: any) => (
    {setUser: (payload: any) => {
        dispatch(setUserData(payload));
    }}
);

export default connect(mapStateToProps, mapDispathToProps)(AppRouter);
