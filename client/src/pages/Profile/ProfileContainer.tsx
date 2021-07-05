import Profile from './Profile';
import { logout, checkModify, editUser } from '../../actions/authActions';
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
    }}
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
