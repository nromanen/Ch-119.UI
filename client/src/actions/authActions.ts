import { AuthActionTypes, IAuthAction, IUser } from '../types/userTypes';

export const registrate = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.REGISTRATE_USER,
    payload,
});

export const registrateDriver = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.REGISTRATE_DRIVER,
    payload,
});

export const setUserData = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.SET_USER_DATA,
    payload,
});

export const setDriverData = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.SET_DRIVER_DATA,
    payload,
});

export const checkDriver = (payload: IUser) => ({
    type: AuthActionTypes.IS_DRIVER,
    payload,
});

export const login = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.LOGIN_USER,
    payload,
});

export const check = (): IAuthAction => ({
    type: AuthActionTypes.CHECK_USER_DATA,
});

export const logout = () => ({
    type: AuthActionTypes.LOGOUT_USER,
});

export const errorHandle = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.HANDLE_ERROR,
    payload,
});

export const verifyUser = (payload: IUser): IAuthAction => ({
    type: AuthActionTypes.VERIFY_USER,
    payload,
});
