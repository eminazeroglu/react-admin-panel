import stores from 'stores'
import {
    setError,
    setLanguage,
    themeChange,
    setLanguages,
    setCurrentPage,
    setPhotos,
    setApplicationShow, setLoading, setMobileMenuOpen
} from "stores/module/app.store";
import {api} from "utils/api";
import CommonApi from "api/common.api";

const dispatch = stores.dispatch;

export const serviceSetLanguageApp = (language) => {
    dispatch(setLanguage(language));
    window.location.reload();
}

export const serviceSetLanguagesApp = (languages) => {
    dispatch(setLanguages(languages));
}

export const serviceSetLoadingApp = (action) => {
    dispatch(setLoading(action));
}

export const serviceSetErrorApp = (errors) => {
    dispatch(setError(errors));
}

export const serviceSetCurrentPageApp = (page) => {
    dispatch(setCurrentPage(page));
}

export const serviceThemeChangeApp = () => {
    dispatch(themeChange());
}

export const serviceMobileMenuOpenApp = (action) => {
    dispatch(setMobileMenuOpen(action));
}

export const serviceCheckThemeApp = () => {
    const dark = stores.getState().appStore.theme;
    if (dark === 'dark') document.getElementsByTagName('html')[0].classList.add('dark');
    else document.getElementsByTagName('html')[0].classList.remove('dark');
}

export const serviceFetchStartApp = async () => {
    const res = await api('get', CommonApi.getAppStart);
    stores.dispatch(setApplicationShow(true))
    stores.dispatch(setLanguages(res.languages));
    stores.dispatch(setLanguage(res.language));
    stores.dispatch(setPhotos(res.photos));
}