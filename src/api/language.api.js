const LanguageApi = {
    postCreate: '/crud/languages',
    postAction: '/crud/languages/:id/action',

    putUpdate: '/crud/languages/:id',

    deleteDestroy: '/crud/languages/:id',

    getIndex: '/crud/languages',
    getSelect: '/crud/languages/select',
    getId: '/crud/languages/:id',
}

export default LanguageApi;