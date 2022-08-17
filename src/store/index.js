import {configureStore} from "@reduxjs/toolkit";

import appStore from 'store/module/app.store'
import authStore from 'store/module/auth.store'
import menuStore from 'store/module/menu.store'

export default configureStore({
    reducer: {
        appStore,
        authStore,
        menuStore
    }
})