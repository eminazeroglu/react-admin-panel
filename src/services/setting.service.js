import store from 'store'
import {setItem, setSelectList} from "store/module/setting.store";
import {api} from "utils/api";
import Api from "api/setting.api";
import {translate} from "utils/helpers";

export const serviceSettingSelectList = async () => {
    const res = await api('get', Api.getSelect);
    if (res) store.dispatch(setSelectList([
        {id: 0, name: translate('enum.Select')},
        ...res
    ]));
}

export const serviceSettingSave = async (data, key) => {
    try {
        await api('put', Api.putUpdate.replace(':id', key), data)
        return true;
    }
    catch (e) {
        return false;
    }
}

export const serviceSettingItem = async (id) => {
    const res = await api('get', Api.getId.replace(':id', id))
    if (res) {
        store.dispatch(setItem(res));
        return res;
    }
}
