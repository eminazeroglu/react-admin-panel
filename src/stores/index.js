import {configureStore} from "@reduxjs/toolkit";

import appStore from 'stores/module/app.store'
import authStore from 'stores/module/auth.store'

export default configureStore({
    reducer: {
        appStore,
        authStore
    }
})