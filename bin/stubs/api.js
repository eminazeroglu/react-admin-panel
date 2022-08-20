const $CLASS_NAME$Api = {
    postCreate: '/crud/$FILE_NAME$s',
    postAction: '/crud/$FILE_NAME$s/:id/action',

    putUpdate: '/crud/$FILE_NAME$s/:id',

    deleteDestroy: '/crud/$FILE_NAME$s/:id',

    getIndex: '/crud/$FILE_NAME$s',
    getSelect: '/crud/$FILE_NAME$s/select',
    getId: '/crud/$FILE_NAME$s/:id',
}

export default $CLASS_NAME$Api;