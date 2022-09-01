const SeoApi = {
    postCreate: '/crud/seo-meta-tags',
    postAction: '/crud/seo-meta-tags/:id/action',

    putUpdate: '/crud/seo-meta-tags/:id',

    deleteDestroy: '/crud/seo-meta-tags/:id',

    getIndex: '/crud/seo-meta-tags',
    getSelect: '/crud/seo-meta-tags/select',
    getId: '/crud/seo-meta-tags/:id',
}

export default SeoApi;
