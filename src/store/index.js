import {configureStore} from "@reduxjs/toolkit";

import appStore from 'store/module/app.store'
import authStore from 'store/module/auth.store'
import menuStore from 'store/module/menu.store'
import userStore from 'store/module/user.store'
import permissionStore from 'store/module/permission.store'
import languageStore from 'store/module/language.store'
import translateStore from 'store/module/translate.store'
import seoStore from 'store/module/seo.store'

export default configureStore({
    reducer: {
        appStore,
        authStore,
        menuStore,
        userStore,
        permissionStore,
        languageStore,
        translateStore,
        seoStore
    }
})
