const PermissionApi = {
    postCreate: '/crud/permissions',
    postAction: '/crud/permissions/:id/action',
    postOption: '/crud/permissions/:id/option-save',

    putUpdate: '/crud/permissions/:id',

    deleteDestroy: '/crud/permissions/:id',

    getIndex: '/crud/permissions',
    getSelect: '/crud/permissions/select',
    getId: '/crud/permissions/:id',
    getOption: '/crud/permissions/:id/option',
}

export default PermissionApi;
