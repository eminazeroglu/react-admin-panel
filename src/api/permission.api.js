const PermissionApi = {
    postCreate: '/crud/permissions',
    postAction: '/crud/permissions/:id/action',

    putUpdate: '/crud/permissions/:id',

    deleteDestroy: '/crud/permissions/:id',

    getIndex: '/crud/permissions',
    getSelect: '/crud/permissions/select',
    getId: '/crud/permissions/:id',
}

export default PermissionApi;