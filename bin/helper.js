const fs = require('fs');
const path = require('path')

exports.replaceAll = (search, replace, string) => {
    return string.split(search).join(replace);
}

exports.toTitleCase = (string) => {
    return string.toLowerCase().split('-').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

exports.toSnakeCase = (str = '') => {
    const strArr = str.split(' ');
    const snakeArr = strArr.reduce((acc, val) => {
        return acc.concat(val.toLowerCase());
    }, []);
    return snakeArr.join('_');
};

exports.createFile = (path, content, callback = null) => {
    if (!fs.existsSync(path)) {
        fs.writeFile(path, content, (err) => {
            if (err) throw err;
            console.log('File created: ' + path);
            if (callback)
                callback();
        });
    }
    else {
        console.log('Exists file: ' + path);
    }
}

exports.readFile = (path) => {
    return fs.readFileSync(path, 'utf8')
}

exports.createFolder = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true})
        return new Promise((resolve) => {
            resolve(true);
        })
    }
    else {
        return new Promise((resolve, reject) => {
            reject(false);
        })
    }
}

function deleteFolderRecursive (directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
}

exports.deleteFolderRecursive = (directoryPath) => deleteFolderRecursive(directoryPath)

exports.deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted: ' + filePath);
    }
    else {
        console.log('File not found: ' + filePath);
    }
}