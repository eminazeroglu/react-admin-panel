import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal
} from "store/module/permission.store";
import {api} from "utils/api";
import Api from "api/permission.api";
import {translate} from "utils/helpers";

export const servicePermissionSetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const servicePermissionSetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const servicePermissionSetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const servicePermissionSetVisibleFormModal = (action, row = {}) => {
    store.dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const servicePermissionFetchIndex = async () => {
    servicePermissionSetLoading(true);
    const res = await api('get', Api.getIndex);
    servicePermissionSetLoading(false);
    servicePermissionSetDataSource(res);
}

export const servicePermissionUpdateAction = async (id) => {
    const res = await api('post', Api.postAction.replace(':id', id), {action: 'is_active'});
    if (res) await servicePermissionFetchIndex();
}

export const servicePermissionDestroy = async (id) => {
    const res = await api('delete', Api.deleteDestroy.replace(':id', id));
    if (res) await servicePermissionFetchIndex();
}

export const servicePermissionSelectList = async () => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const servicePermissionSave = async (data) => {
    let res = '';
    if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
    else res = await api('post', Api.postCreate, data)

    if (res) await servicePermissionFetchIndex();
}

export const servicePermissionItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) setItem(res);
}