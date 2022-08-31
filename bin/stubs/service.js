import store from 'store'
import {
    setDataSource,
    setItem,
    setLoading,
    setQuery,
    setSelectList,
    setTableRow,
    setVisibleFormModal
} from "store/module/$FILE_NAME$.store";
import {api} from "utils/api";
import Api from "api/$FILE_NAME$.api";
import {translate} from "utils/helpers";

export const service$CLASS_NAME$SetQuery = (query) => {
    store.dispatch(setQuery(query))
}

export const service$CLASS_NAME$SetDataSource = (data) => {
    store.dispatch(setDataSource(data))
}

export const service$CLASS_NAME$SetLoading = (data) => {
    store.dispatch(setLoading(data))
}

export const service$CLASS_NAME$SetModal = (name, action, row = {}) => {
    const dispatch = store.dispatch;
    if (name === 'form') dispatch(setVisibleFormModal(action))
    store.dispatch(setTableRow(row));
}

export const service$CLASS_NAME$FetchIndex = async () => {
    service$CLASS_NAME$SetLoading(true);
    const res = await api('get', Api.getIndex, {params: store.getState().$FILE_NAME$Store.query});
    service$CLASS_NAME$SetLoading(false);
    service$CLASS_NAME$SetDataSource(res);
}

export const service$CLASS_NAME$UpdateAction = async (id) => {
    const res = await api('post', Api.postAction.replace(':id', id), {action: 'is_active'});
    if (res) await service$CLASS_NAME$FetchIndex();
}

export const service$CLASS_NAME$Destroy = async (id) => {
    const res = await api('delete', Api.deleteDestroy.replace(':id', id));
    if (res) await service$CLASS_NAME$FetchIndex();
}

export const service$CLASS_NAME$SelectList = async () => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const service$CLASS_NAME$Save = async (data) => {
    try {
        let res = '';
        if (data?.id) res = await api('put', Api.putUpdate.replace(':id', data.id), data)
        else res = await api('post', Api.postCreate, data)
        if (res) await service$CLASS_NAME$FetchIndex();
        return true;
    }
    catch (e) {
        return false;
    }
}

export const service$CLASS_NAME$Item = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) store.dispatch(setItem(res));
}
