var path = require('path')

function getProjectSource() {
    // This file is located in in node_modules/dotnetapi/src/api.js
    // We want the source of the original project.
    // Need to move up three directories
    return path.resolve([__dirname, '../../../')
}



var api = {
    _entry: {},
    _extracts: [],
    _extractCSS: [],
    _css: [],
    _projectSource: getProjectSource(),

    entry: function(entry) {
        this._entry = entry;
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
