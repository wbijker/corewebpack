var path = require('path')

function getProjectSource() {
    // In dev mode use symbolic link path rather then actual path
    return '/Users/Willem/temp/usedotnetwebpack'

    // This file is located in in node_modules/usedotnetwebpack/src/api.js
    // We want the source of the original project.
    // Need to move up three directories
    return path.resolve(path.join(__dirname, '../../../'));
}

var api = {
    _entries: {},
    _extracts: [],
    _extractCSS: [],
    _css: [],
    _projectSource: getProjectSource(),

    entries: function(entries) {
        this._entries = entries;
    },
    extract: function(modules, name, chunks) {
        this._extracts.push({
            modules,
            name,
            chunks
        })
    },
    extractCSS: function(modules, name) {
        this._extractCSS.push({
            modules, 
            name
        })
    },
    css: function(entry) {
        // a css entry just like entry, but will only generate a CSS file 
        // not a JS file combined
        this._css.push(entry);
    }
}

module.exports = api
