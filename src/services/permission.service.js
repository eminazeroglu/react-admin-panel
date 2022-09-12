import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal, setVisibleOptionModal
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

export const servicePermissionSetModal = (name, action, row = {}) => {
    const dispatch = store.dispatch;
    if (name === 'form') dispatch(setVisibleFormModal(action))
    if (name === 'option') dispatch(setVisibleOptionModal(action))
    store.dispatch(setTableRow(row));
}

export const servicePermissionFetchIndex = async () => {
    servicePermissionSetLoading(true);
    const res = await api('get', Api.getIndex, {params: store.getState().permissionStore.query});
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
        {id: '', name: translate('enum.Select')},
        ...res
    ]));
}

export const servicePermissionSave = async (data) => {
    try {
        let res = '';
        if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
        else res = await api('post', Api.postCreate, data)
        if (res) await servicePermissionFetchIndex();
        return true;
    }
    catch (e) {
        return false;
    }
}

export const servicePermissionItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) store.dispatch(setItem(res));
}

export const servicePermissionOption = async (id) => {
    const res = await api('get', Api.getOption.replace(':id', id))
    if (res) {
        return res;
    }
    return false;
}

export const servicePermissionOptionSave = async (params) => {
    const res = await api('post', Api.postOption.replace(':id', params.group_id), params)
    if (res) {
        return res;
    }
    return false;
}
