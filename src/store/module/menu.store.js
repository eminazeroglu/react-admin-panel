import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialQuery = {
    page: 1,
    limit: 25,
}

const initialState = {
    translateKey: 'crm.Menu',
    query: initialQuery,
    loading: false,
    dataSource: {},
    selectList: [],
    tableRow: {},
    item: {},
    visibleFormModal: false
}

const MenuStore = createSlice({
    name: 'menuStore',
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
            state.selectList = action.payload;
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
} = MenuStore.actions;

export const useMenuStore = () => useSelector(state => state.menuStore)

export default MenuStore.reducer;