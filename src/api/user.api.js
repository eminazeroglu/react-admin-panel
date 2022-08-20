const UserApi = {
    postCreate: '/crud/users',
    postAction: '/crud/users/:id/action',

    putUpdate: '/crud/users/:id',

    deleteDestroy: '/crud/users/:id',

    getIndex: '/crud/users',
    getSelect: '/crud/users/select',
    getId: '/crud/users/:id',
}

export default UserApi;