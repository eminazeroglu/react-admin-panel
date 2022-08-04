import stores from 'stores'
import {setToken, setPermission, setUser} from "stores/module/auth.store";
import {api} from "utils/api";
import AuthApi from "api/auth.api";

const dispatch = stores.dispatch;

export const serviceSetTokenServiceAuth = (token) => {
    dispatch(setToken(token));
}

export const serviceSetPermissionAuth = (permissions) => {
    dispatch(setPermission(permissions));
}

export const serviceDispatchLoginAuth = async (params) => {
    const res = await api('post', AuthApi.postAuthLogin, params);
    if (res) {
        serviceSetTokenServiceAuth(res);
    }
}

export const serviceFetchCheckTokenAuth = async () => {
    const res = await api('get', AuthApi.getAuthCheckToken);
    stores.dispatch(setUser(res.user));
    stores.dispatch(setPermission(res.permissions));
}