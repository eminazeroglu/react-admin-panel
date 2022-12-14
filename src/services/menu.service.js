import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal
} from "store/module/menu.store";
import {api} from "utils/api";
import Api from "api/menu.api";
import {translate} from "utils/helpers";

export const serviceMenuSetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const serviceMenuSetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const serviceMenuSetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const serviceMenuSetVisibleFormModal = (action, row = {}) => {
    store.dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const serviceMenuFetchIndex = async () => {
    serviceMenuSetLoading(true);
    const res = await api('get', Api.getIndex);
    serviceMenuSetLoading(false);
    serviceMenuSetDataSource(res);
}

export const serviceMenuUpdateAction = async (id) => {
    const res = await api('post', Api.postAction.replace(':id', id), {action: 'is_active'});
    if (res) await serviceMenuFetchIndex();
}

export const serviceMenuDestroy = async (id) => {
    const res = await api('delete', Api.deleteDestroy.replace(':id', id));
    if (res) await serviceMenuFetchIndex();
}

export const serviceMenuSelectList = async () => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const serviceMenuSave = async (data) => {
    let res = '';
    if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
    else res = await api('post', Api.postCreate, data)

    if (res) await serviceMenuFetchIndex();
}

export const serviceMenuItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) setItem(res);
}