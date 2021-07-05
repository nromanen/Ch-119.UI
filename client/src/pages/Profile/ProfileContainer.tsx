import Profile from './Profile';
import { logout, checkModify, editUser, driverInProfile, checkDriver } from '../../actions/authActions';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => (
    {logoutUser: () => {
      dispatch(logout());
    },
    checkModified: (payload: any) => {
      dispatch(checkModify(payload));
    },
    updateUser: (payload:any) => {
      dispatch(editUser(payload));
    },
    driverProfile: (payload: any) => {
      dispatch(driverInProfile(payload));
    },
    checkDriverState: (payload: any) => {
      dispatch(checkDriver(payload));
    }}
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
