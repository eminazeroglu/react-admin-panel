import stores from 'store'
import {
    setError,
    setLanguage,
    themeChange,
    setLanguages,
    setCurrentPage,
    setPhotos,
    setApplicationShow, setLoading, setMobileMenuOpen
} from "store/module/app.store";
import {api} from "utils/api";
import CommonApi from "api/common.api";

const dispatch = stores.dispatch;

export const serviceAppSetLanguage = (language) => {
    dispatch(setLanguage(language));
    window.location.reload();
}

export const serviceAppSetLanguages = (languages) => {
    dispatch(setLanguages(languages));
}

export const serviceAppSetLoading = (action) => {
    dispatch(setLoading(action));
}

export const serviceAppSetError = (errors) => {
    dispatch(setError(errors));
}

export const serviceAppSetCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
}

export const serviceAppThemeChange = () => {
    dispatch(themeChange());
}

export const serviceAppMobileMenuOpen = (action) => {
    dispatch(setMobileMenuOpen(action));
}

export const serviceAppCheckTheme = () => {
    const dark = stores.getState().appStore.theme;
    if (dark === 'dark') document.getElementsByTagName('html')[0].classList.add('dark');
    else document.getElementsByTagName('html')[0].classList.remove('dark');
}

export const serviceAppFetchStart = async () => {
    const res = await api('get', CommonApi.getAppStart);
    stores.dispatch(setApplicationShow(true))
    stores.dispatch(setLanguages(res.languages));
    stores.dispatch(setLanguage(res.language));
    stores.dispatch(setPhotos(res.photos));
}