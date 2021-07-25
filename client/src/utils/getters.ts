import { DRIVER_ROLE } from '../constants/registrationConstants';
import { UserRoles } from '../constants/userRoles';

export const getUserRoleAsNumber = (state: any) =>
  state.auth.role.includes(DRIVER_ROLE) ? UserRoles.DRIVER : UserRoles.USER;

export const getUserRoleAsString = (state: any) =>
  state.auth.role.includes(DRIVER_ROLE) ? 'DRIVER' : 'USER';

export const getDriverId = (state: any) => state.auth.driver_info.driver_id;

export const getUserId = (state: any) =>
  state.auth.driver_info.driver_id || state.auth.id;
