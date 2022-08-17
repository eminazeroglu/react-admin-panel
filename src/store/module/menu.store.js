import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    translateKey: 'crm.Menu',
    query: {
        start: 0,
        length: 25,
    },
    loading: false,
    dataSource: {},
    selectList: [],
    tableRow: {},
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
            state.query = action.payload;
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
        }
    }
});

export const {
    setDataSource,
    setQuery,
    setLoading,
    setVisibleFormModal,
    setTableRow,
    setSelectList
} = MenuStore.actions;

export const useMenuStore = () => useSelector(state => state.menuStore)

export default MenuStore.reducer;