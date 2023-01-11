import stores from 'store'
import {notification as AntdNotification} from "antd";
import Swal from "sweetalert2";
import routers from "router/routers";
import {generatePath} from "react-router-dom";

export const flatten = arr => {
    return arr ? arr.reduce((result, item) => [
        ...result,
        {...item},
        ...flatten(item.children)
    ], []) : [];
}

export const notification = (params = {}) => {
    const placement = params.placement || 'topRight';
    const type = params.type || 'success';
    const onClose = params?.onClose ? params.onClose() : false;

    AntdNotification[type]({
        message: params?.title || translate('notification.Warning.Title'),
        description: params.message,
        placement,
        onClose: () => {
            return onClose;
        }
    })
}

export const translate = (key = null, params = {}) => {
    const result = params.result ? params.result : 'yes',
        search = params.search ? params.search : null,
        replace = params.replace ? params.replace : null,
        label = params.label ? params.label : null,
        lang = params.lang ? params.lang : stores.getState().appStore.language,
        languages = stores.getState().appStore.languages;

    if (lang) {
        let language = languages && languages.length ? languages.find(i => i.code === lang) : null;
        if (language) {
            const translates = language.translates.find(i => i.key === key);
            if (translates && key) {
                if (search && replace) {
                    if (Array.isArray(search) && Array.isArray(replace)) return this.replaceAll(translates.text, search, replace);
                    else return translates.text.replace(search, replace);
                } else if (label) return translates.text.replace(':label', this.translate(label).toLowerCase());
                return translates.text;
            }
        }
    }
    if (result === 'yes') return key;
}

export const can = (value) => {
    const permissions = stores.getState().authStore.permissions;
    let permission = Array.isArray(value) ? value : (value ? value.split('.') : []);
    let result = value === 'accept';
    if (permissions.length && value !== 'accept') {
        if (Array.isArray(value)) {
            let newPermission = [];
            permissions.forEach(i => {
                Object.keys(i.options).forEach(k => {
                    if (i.options[k]) newPermission.push(i.key + '.' + k)
                });
            })
            result = newPermission.some(i => value.includes(i));
        } else {
            const findPermission = permissions.find(i => i.key === permission[0]);
            if (findPermission) {
                const findOption = findPermission.options[permission[1]];
                if (findOption) result = true;
            }
        }
    }
    return result;
}

export const recursiveSearch = (find, search, arr, objectName = 'children') => {
    return arr.reduce((a, item) => {
        if (a) return a;
        if (item[find] === search) return item;
        if (item[objectName]) return recursiveSearch(find, search, item[objectName], objectName)
    }, null);
}

export const recursiveNotSearch = (find, search, arr, objectName = 'children') => {
    return arr.filter(o => {
        const keep = o[find] !== search;
        if (keep && o[objectName]) o[objectName] = recursiveNotSearch(find, search, o[objectName], objectName);
        return keep;
    });
}

export const print = (id) => {
    const prtHtml = document.getElementById(id).innerHTML;
    let stylesHtml = '';
    for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
    }
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(`<!DOCTYPE html>
            <html>
              <head>
                ${stylesHtml}
              </head>
              <body>
                ${prtHtml}
              </body>
            </html>`
    );
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}

export const jsonToFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(i => formData.append(i, data[i]));
    return formData;
}

export const route = (name, params = {}) => {
    let lastRoute, path = '';
    if (name) {
        name.split('.').map(n => {
            if (!lastRoute) {
                lastRoute = routers.find(i => i.name === n);
                if (lastRoute)
                    path = lastRoute?.path;
            } else {
                lastRoute = lastRoute.children.find(i => i.name === n);
                if (lastRoute && lastRoute?.path) {
                    path += '/' + lastRoute?.path;
                }
            }
        });
        if (path) {
            path = path.replace(/\/\//gi, '/');
            return Object.values(params).length ? generatePath(path, params) : path;
        }
    }
    return '/';
}

export const currentTimezone = () => {
    let offSet = new Date().getTimezoneOffset();
    let hour = Math.abs(offSet) / 60;
    let minute = Math.abs(offSet) % 60;
    if (parseInt(hour) < 10) hour = "0" + hour;
    if (parseInt(minute) < 10) minute = "0" + minute;
    let timezone = (offSet > 0 ? "-" : "+") + hour + ":" + minute;
    return timezone || null;
}

export const dialog = (params = {}) => {
    const title = params.title || translate('notification.Warning.Title');
    const html = params.message || null;
    const icon = params.icon || 'info';
    const iconColor = params.iconColor || '';
    const iconHtml = params.iconHtml || '';
    const confirmButtonText = params.buttonYesText || translate('button.Yes');
    const cancelButtonColor = params.buttonNoColor || '#b91c1c';
    const denyButtonColor = params.buttonDenyColor || '#888';
    const cancelButtonText = params.buttonNoText || translate('button.No');
    const denyButtonText = params.buttonDenyText || '';
    const showCancelButton = params.buttonNo !== false;
    const showConfirmButton = params.buttonYes !== false;
    const showCloseButton = params.buttonClose || false;
    const showDenyButton = params.buttonDeny || false;
    const customClass = params.customClass || {};

    return new Promise((resolve, reject) => {
        Swal.fire({
            customClass,
            icon,
            iconColor,
            iconHtml,
            title,
            html,
            confirmButtonText,
            cancelButtonColor,
            cancelButtonText,
            showConfirmButton,
            showCloseButton,
            showCancelButton,
            showDenyButton,
            denyButtonText,
            denyButtonColor,
        })
            .then(r => {
                if (r.value) {
                    resolve('yes');
                } else if (r.dismiss === 'backdrop') {
                    resolve('close');
                } else if (r.dismiss === 'cancel') {
                    resolve('no');
                } else if (r.isDenied) {
                    resolve('deny');
                }
            })
    })
}

export const getIframeSrc = (val, type = null) => {
    let pattern = /<iframe.*?\/iframe>/gm;
    return val.replace(pattern, function (sMatch) {
        let url = /src="(.*?)"/g.exec(sMatch);
        url = url[0].replace('src="', '');
        url = url.replace('"', '');
        if (type === 'remove_http') {
            url = url.replace('https://', '');
            url = url.replace('http://', '');
        }
        return url;
    });
}

export const addCommas = (nStr) => {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

export const onlyNumberWrite = (value, callback) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
        return callback(parseFloat(value));
    }
}
