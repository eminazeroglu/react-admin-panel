import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal
} from "store/module/seo.store";
import {api} from "utils/api";
import Api from "api/seo.api";
import {translate} from "utils/helpers";

export const serviceSeoSetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const serviceSeoSetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const serviceSeoSetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const serviceSeoSetModal = (name, action, row = {}) => {
    const dispatch = store.dispatch;
    if (name === 'form') dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const serviceSeoFetchIndex = async () => {
    serviceSeoSetLoading(true);
    const res = await api('get', Api.getIndex, {params: store.getState().seoStore.query});
    serviceSeoSetLoading(false);
    serviceSeoSetDataSource(res);
}

export const serviceSeoUpdateAction = async (id) => {
    const res = await api('post', Api.postAction.replace(':id', id), {action: 'is_active'});
    if (res) await serviceSeoFetchIndex();
}

export const serviceSeoDestroy = async (id) => {
    const res = await api('delete', Api.deleteDestroy.replace(':id', id));
    if (res) await serviceSeoFetchIndex();
}

export const serviceSeoSelectList = async () => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const serviceSeoSave = async (data) => {
    try {
        let res = '';
        if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
        else res = await api('post', Api.postCreate, data)
        if (res) await serviceSeoFetchIndex();
        return true;
    }
    catch (e) {
        return false;
    }
}

export const serviceSeoItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) store.dispatch(setItem(res));
}
