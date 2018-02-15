var path = require('path')

// This file is located in in node_modules/usedotnetwebpack/src/helper.js
// We want the source of the original project.
// Need to move up three directories
const BASE = path.join(__dirname, '../../../')

module.exports = {
    projectPath: function(file) {
        return path.resolve(path.join(BASE, file))
    }
}
