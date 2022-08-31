import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal
} from "store/module/language.store";
import {api} from "utils/api";
import Api from "api/language.api";
import {translate} from "utils/helpers";
import {serviceAppFetchStart} from "services/app.service";

export const serviceLanguageSetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const serviceLanguageSetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const serviceLanguageSetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const serviceLanguageSetModal = (name, action, row = {}) => {
    const dispatch = store.dispatch;
    if (name === 'form') dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const serviceLanguageFetchIndex = async () => {
    serviceLanguageSetLoading(true);
    const res = await api('get', Api.getIndex, {params: store.getState().languageStore.query});
    serviceLanguageSetLoading(false);
    serviceLanguageSetDataSource(res);
}

export const serviceLanguageUpdateAction = async (id) => {
    const res = await api('post', Api.postAction.replace(':id', id), {action: 'is_active'});
    if (res) await serviceLanguageFetchIndex();
}

export const serviceLanguageDestroy = async (id) => {
    const res = await api('delete', Api.deleteDestroy.replace(':id', id));
    if (res) await serviceLanguageFetchIndex();
}

export const serviceLanguageSelectList = async (empty = false) => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const serviceLanguageSave = async (data) => {
    try {
        let res = '';
        if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
        else res = await api('post', Api.postCreate, data)
        if (res) {
            await serviceAppFetchStart();
            await serviceLanguageFetchIndex();
        }
        return true;
    }
    catch (e) {
        return false;
    }
}

export const serviceLanguageItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) setItem(res);
}
