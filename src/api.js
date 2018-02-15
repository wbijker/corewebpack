// api is only a container for holding configuration related options

module.exports = {
    // private variables
    _entries: {},
    _extracts: [],
    _extractCSS: [],
    _css: [],
    // Additional rules
    _rules: [],
    // Additional plugins
    _plugins: [],

    _config: {
        port: 8080,
        host: 'localhost',
        openBrowser: true,
        // use webpack-bundle-analyzer plugin
        analyzeBundle: false,
    },

    entries: function(entries) {
        // Entires just like normal webpack entry configuration
        this._entries = entries;
    },

    extract: function(modules, name, chunks) {
        // Group common chunks using CommonChunkPlugin
        // Modules array of string that can either be a library or node module.
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
        // no with a JS file combined
        this._css.push(entry);
    },
    
    addRule(rule) {
        this._rules.push(rule)
    },

    addPlugin(plugin) {
        this._plugins.push(plugin)
    }

}
