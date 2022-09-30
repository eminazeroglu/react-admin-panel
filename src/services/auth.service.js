import stores from 'store'
import {setToken, setPermission, setUser} from "store/module/auth.store";
import {api} from "utils/api";
import AuthApi from "api/auth.api";

const dispatch = stores.dispatch;

export const serviceAuthSetToken = (token) => {
    dispatch(setToken(token));
}

export const serviceAuthSetPermission = (permissions) => {
    dispatch(setPermission(permissions));
}

export const serviceLogoutAction = () => {
    serviceAuthSetToken(false);
    stores.dispatch(setUser({}));
    stores.dispatch(setPermission([]));
}

export const serviceAuthLoginDispatch = async (params) => {
    try {
        const res = await api('post', AuthApi.postAuthLogin, params);
        if (res) {
            serviceAuthSetToken(res);
        }
    }
    catch (e) {
        return false;
    }
}

export const serviceAuthLogoutFetch = async () => {
    try {
        const res = await api('get', AuthApi.getAuthLogout);
        if (res) {
            serviceLogoutAction()
        }
    }
    catch (e) {
        return false
    }
}

export const serviceAuthFetchCheckToken = async () => {
    try {
        const res = await api('get', AuthApi.getAuthCheckToken);
        stores.dispatch(setUser(res.user));
        stores.dispatch(setPermission(res.permissions));
    }
    catch (e) {
        return false;
    }
}
