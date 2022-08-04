import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    token: localStorage.getItem('token') || '',
    user: {},
    permissions: []
}

const authStore = createSlice({
    name: 'authStore',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', state.token)
        },
        setPermission: (state, action) => {
            state.permissions = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {
    setToken,
    setPermission,
    setUser
} = authStore.actions;

export const useAuthState = () => useSelector(state => state.authStore)

export default authStore.reducer;