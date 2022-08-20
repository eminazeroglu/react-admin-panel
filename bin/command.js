const {
    readFile,
    replaceAll,
    toTitleCase,
    toSnakeCase,
    createFolder,
    createFile,
    deleteFolderRecursive,
    deleteFile
} = require("./helper");
const path = require("path");

const rootPath = path.resolve('.');
const src = rootPath + '/src';
const bin = rootPath + '/bin';

function params(name, stubsFileName = '') {
    const fileName = toSnakeCase(name);
    const className = replaceAll(' ', '', toTitleCase(name));

    let fileContent = '';
    if (stubsFileName) fileContent = readFile(`${bin}/stubs/${stubsFileName}.js`);
    fileContent = replaceAll('$CLASS_NAME$', className, fileContent);
    fileContent = replaceAll('$FILE_NAME$', fileName, fileContent);

    return {
        fileName,
        className,
        fileContent
    }
}

function createService (name, options) {
    const {fileName, fileContent} = params(name, 'service');
    const filePath = `${src}/services/${fileName}.service.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}

function createStore (name, options) {
    const {fileName, fileContent} = params(name, 'store');
    const filePath = `${src}/store/module/${fileName}.store.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}

function createApi (name, options) {
    const {fileName, fileContent} = params(name, 'api');
    const filePath = `${src}/api/${fileName}.api.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}

function createPage (name, options) {
    const {fileName, fileContent, className} = params(name, 'page');
    const filePath = `${src}/pages/${fileName}/${className}Page.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}

function createFilter (name, options) {
    const {fileName, fileContent, className} = params(name, 'filter');
    const filePath = `${src}/pages/${fileName}/components/${className}Filter.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}

function createModal (name, options) {
    const {fileName, fileContent, className} = params(name, 'modal');
    const filePath = `${src}/pages/${fileName}/components/${className}FormModal.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}


function createTable (name, options) {
    const {fileName, fileContent, className} = params(name, 'table');
    const filePath = `${src}/pages/${fileName}/components/${className}Table.js`;
    if (options.back) deleteFile(filePath);
    else createFile(filePath, fileContent);
}

exports.service = (name, options) => createService(name, options)
exports.store = (name, options) => createStore(name, options)
exports.api = (name, options) => createApi(name, options)

exports.createModule = function (name, options) {
    createService(name, options);
    createStore(name, options);
    createApi(name, options);
    const {fileName} = params(name);
    if (options.back) {
        deleteFolderRecursive(`${src}/pages/${fileName}`)
    }
    else {
        createFolder(`${src}/pages/${fileName}`)
        createFolder(`${src}/pages/${fileName}/components`)
        createPage(name, options)
        createFilter(name, options)
        createModal(name, options)
        createTable(name, options)
    }
}

exports.page = function (name, options) {
    const {fileName} = params(name);
    if (options.back) {
        deleteFolderRecursive(`${src}/pages/${fileName}`)
    }
    else {
        createFolder(`${src}/pages/${fileName}`)
        createFolder(`${src}/pages/${fileName}/components`)
        createPage(name, options)
        createFilter(name, options)
        createModal(name, options)
        createTable(name, options)
    }
}