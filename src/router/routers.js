import {Navigate} from "react-router-dom";
import AuthProvider from "provider/AuthProvider";
import AuthLayout from "layouts/AuthLayout";
import AppLayout from "layouts/AppLayout";
import HomePage from "pages/home/HomePage";
import ContactPage from "pages/contact/ContactPage";
import LoginPage from "pages/auth/LoginPage";
import ForgetPasswordPage from "pages/auth/ForgetPasswordPage";
import RegisterPage from "pages/auth/RegisterPage";


const routers = [
    {
        name: 'app',
        path: '/',
        element: <AppLayout/>,
        auth: true,
        children: [
            {
                name: 'home',
                index: true,
                permission: 'accept',
                element: <HomePage/>,
            },
        ]
    },
    {
        name: 'auth',
        path: '/auth',
        permission: 'accept',
        element: <AuthLayout/>,
        children: [
            {
                name: 'login',
                index: true,
                path: 'login',
                permission: 'accept',
                element: <LoginPage/>,
            },
            {
                name: 'register',
                path: 'register',
                permission: 'accept',
                element: <RegisterPage/>,
            },
            {
                name: 'forgetPassword',
                path: 'forget-password',
                permission: 'accept',
                element: <ForgetPasswordPage/>,
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/'} replace={true}/>
    }
]

const routerMap = (routers) => routers.map(router => {
    if (router?.auth) {
        router.element = <AuthProvider>{router.element}</AuthProvider>
    }

    if (router?.children) {
        router.children = routerMap(router.children)
    }

    return router;
})

export default routerMap(routers);