const MenuApi = {
    postMenuCreate: '/crud/menus',
    postMenuAction: '/crud/menus/:id/action',

    putMenuUpdate: '/crud/menus/:id',

    deleteMenuDestroy: '/crud/menus/:id',

    getMenuIndex: '/crud/menus',
    getMenuSelect: '/crud/menus/select',
    getMenuId: '/crud/menus/:id',
}

export default MenuApi;