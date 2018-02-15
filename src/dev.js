// // Run dev server with options provided by host app using API
var path = require('path')

function getHostFile(file) {
    // In dev mode use symbolic link path rather then actual path
    return path.resolve(path.join('/Users/Willem/temp/usedotnetwebpack', file))

    // This file is located in in node_modules/usedotnetwebpack/src/api.js
    // We want the source of the original project.
    // Need to move up three directories
    return path.resolve(path.join(__dirname, '../../../', file))
}

// include api from host application
var configFile = getHostFile('webpack.js')
console.log('This is the config file', configFile)
var config = require(configFile)
console.log('Api file', config)
