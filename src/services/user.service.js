import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal
} from "store/module/user.store";
import {api} from "utils/api";
import Api from "api/user.api";
import {translate} from "utils/helpers";

export const serviceUserSetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const serviceUserSetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const serviceUserSetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const serviceUserSetModal = (name, action, row = {}) => {
    const dispatch = store.dispatch;
    if (name === 'form') dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const serviceUserFetchIndex = async () => {
    serviceUserSetLoading(true);
    const res = await api('get', Api.getIndex, {params: store.getState().userStore.query});
    serviceUserSetLoading(false);
    serviceUserSetDataSource(res);
}

export const serviceUserUpdateAction = async (id, action = 'is_active') => {
    const res = await api('post', Api.postAction.replace(':id', id), {action});
    if (res) await serviceUserFetchIndex();
}

export const serviceUserDestroy = async (id) => {
    const res = await api('delete', Api.deleteDestroy.replace(':id', id));
    if (res) await serviceUserFetchIndex();
}

export const serviceUserSelectList = async () => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const serviceUserSave = async (data) => {
    try {
        let res = '';
        if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
        else res = await api('post', Api.postCreate, data)
        if (res) await serviceUserFetchIndex();
        return true;
    } catch (e) {
        return false;
    }
}

export const serviceUserItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) setItem(res);
}
