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

export const serviceAuthLoginDispatch = async (params) => {
    const res = await api('post', AuthApi.postAuthLogin, params);
    if (res) {
        serviceAuthSetToken(res);
    }
}

export const serviceAuthFetchCheckToken = async () => {
    const res = await api('get', AuthApi.getAuthCheckToken);
    stores.dispatch(setUser(res.user));
    stores.dispatch(setPermission(res.permissions));
}