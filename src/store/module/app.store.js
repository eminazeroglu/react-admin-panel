import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    theme: localStorage.getItem('theme') || 'light',
    language: localStorage.getItem('language') || 'az',
    loading: false,
    applicationShow: false,
    mobileMenuOpen: false,
    photos: {},
    languages: [],
    errors: [],
    currentPage: {}
}

const appStore = createSlice({
    name: 'appStore',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', state.language);
        },
        setPhotos: (state, action) => {
            state.photos = action.payload;
        },
        setMobileMenuOpen: (state, action) => {
            state.mobileMenuOpen = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setApplicationShow: (state, action) => {
            state.applicationShow = action.payload;
        },
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
        themeChange: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
        setError: (state, action) => {
            state.errors = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
})

export const {
    setLanguage,
    setPhotos,
    setLanguages,
    themeChange,
    setError,
    setCurrentPage,
    setApplicationShow,
    setLoading,
    setMobileMenuOpen
} = appStore.actions;

export const useAppState = () => useSelector(state => state.appStore)

export default appStore.reducer;
