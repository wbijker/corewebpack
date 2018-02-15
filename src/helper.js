var path = require('path')

// This file is located in in node_modules/usedotnetwebpack/src/helper.js
// We want the source of the original project.
// Need to move up three directories
// const BASE = path.join(__dirname, '../../../')

// In dev mode use symbolic link path rather then actual path
const BASE = '/Users/willem/Temp/usedotnetwebpack'

module.exports = {
    projectPath: function(file) {
        return path.resolve(path.join(BASE, file))
    }
}
