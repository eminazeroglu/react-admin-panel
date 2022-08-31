import store from 'store'
import {
    setDataSource,
    setLoading,
    setQuery,
    setTableRow,
    setTranslateKeys,
    setVisibleFormModal
} from "store/module/translate.store";
import {api} from "utils/api";
import Api from "api/translate.api";
import {serviceAppFetchStart} from "services/app.service";

export const serviceTranslateSetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const serviceTranslateSetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const serviceTranslateSetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const serviceTranslateSetTranslateKey = (data) => {
    store.dispatch(setTranslateKeys(data))
}

export const serviceTranslateSetModal = (name, action, row = {}) => {
    const dispatch = store.dispatch;
    if (name === 'form') dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const serviceTranslateFetchIndex = async () => {
    serviceTranslateSetLoading(true);
    const res = await api('get', Api.getIndex, {params: store.getState().translateStore.query});
    serviceTranslateSetLoading(false);
    serviceTranslateSetDataSource(res);
}

export const serviceTranslateSave = async (params) => {
    try {
        const res = await api('post', Api.change, params)
        if (res) {
            await serviceAppFetchStart();
            await serviceTranslateFetchIndex(res);
        }
        return true;
    }
    catch (e) {
        return false
    }
}

export const serviceTranslateKeys = async () => {
    const res = await api('get', Api.getKeys)
    if (res) serviceTranslateSetTranslateKey(res);
}
