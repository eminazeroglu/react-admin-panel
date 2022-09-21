import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialQuery = {
    page: 1,
    limit: 25,
}

const initialState = {
    translateKey: 'crm.$CLASS_NAME$',
    permission: '$FILE_NAME$',
    query: initialQuery,
    loading: false,
    dataSource: {},
    $FILE_NAME$s: [],
    tableRow: {},
    item: {},
    visibleFormModal: false
}

const $CLASS_NAME$Store = createSlice({
    name: '$FILE_NAME$Store',
    initialState,
    reducers: {
        setDataSource: (state, action) => {
            state.dataSource = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload ? {...state.query, ...action.payload} : initialQuery;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setTableRow: (state, action) => {
            state.tableRow = action.payload;
        },
        setVisibleFormModal: (state, action) => {
            state.visibleFormModal = action.payload;
        },
        setSelectList: (state, action) => {
            state.$FILE_NAME$s = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        }
    }
});

export const {
    setDataSource,
    setQuery,
    setLoading,
    setVisibleFormModal,
    setTableRow,
    setSelectList,
    setItem
} = $CLASS_NAME$Store.actions;

export const use$CLASS_NAME$Store = () => useSelector(state => state.$FILE_NAME$Store)

export default $CLASS_NAME$Store.reducer;
