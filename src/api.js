// var Entry = require('./entry.js')

var api = {
    _entry: {},
    _extracts: [],
    _extractCSS: [],
    _css: [],

    entry: function(entry) {
        this._entry = entry;
    },
    extract: function(modules, name) {
        this._extracts.push({
            modules,
            name
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
