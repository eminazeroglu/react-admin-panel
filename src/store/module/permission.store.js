import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialQuery = {
    page: 1,
    limit: 25,
}

const initialState = {
    translateKey: 'crm.Permission',
    permission: 'permission',
    query: initialQuery,
    loading: false,
    dataSource: {},
    permissions: [],
    tableRow: {},
    item: {},
    visibleFormModal: false,
    visibleOptionModal: false,
}

const PermissionStore = createSlice({
    name: 'permissionStore',
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
        setVisibleOptionModal: (state, action) => {
            state.visibleOptionModal = action.payload;
        },
        setSelectList: (state, action) => {
            state.permissions = action.payload;
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
    setVisibleOptionModal
} = PermissionStore.actions;

export const usePermissionStore = () => useSelector(state => state.permissionStore)

export default PermissionStore.reducer;
