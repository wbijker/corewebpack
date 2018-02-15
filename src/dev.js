// Run dev server with options provided by host app using API
var path = require('path')
var fs = require('fs')

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
if (!fs.existsSync(configFile)) {
    throw Error('Webpack configuration file not found. Searched path ' + configFile)
}

// Get reference to api. Webpack.js is making changes to this files
var api = require('./api.js')
var config = require(configFile)

console.log('Now we need to work with ', api._entries)
