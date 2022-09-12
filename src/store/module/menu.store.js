import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialQuery = {
    page: 1,
    limit: 25,
}

const initialState = {
    translateKey: 'crm.Menu',
    permission: 'menu',
    query: initialQuery,
    loading: false,
    dataSource: {},
    selectList: [],
    tableRow: {},
    item: {},
    visibleFormModal: false,
    visibleWidgetModal: false,
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
        setVisibleWidgetModal: (state, action) => {
            state.visibleWidgetModal = action.payload;
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
    setItem,
    setVisibleWidgetModal
} = MenuStore.actions;

export const useMenuStore = () => useSelector(state => state.menuStore)

export default MenuStore.reducer;
