import {api} from "utils/api";
import Api from "api/file-management.api";

export const serviceFileManagementPhotoUpload = async (params) => {
    return await api('post', Api.photoUpload, params);
}

export const serviceFileManagementPhotoRemove = async (params) => {
    return await api('post', Api.photoRemove, params);
}

export const serviceFileManagementPhotoRemoveAll = async (params) => {
    return await api('post', Api.photoRemoveAll, params);
}

export const serviceFileManagementEditorPhotoUpload = async (params) => {
    return await api('post', Api.photoEditorUpload, params);
}
