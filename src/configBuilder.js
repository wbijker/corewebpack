// Generate webpack config file with an instance of an API object

var Webpack = require('webpack')
var DefaultRules = require('./rules')
var Helper = require('./helper')
var Plugins = require('./plugins')

module.exports = function(api) {
    var plugins = []
    if (api._dev) {
        plugins.push(new Webpack.HotModuleReplacementPlugin())
    }
    var rules = DefaultRules(api)
    // Add custom rules added by API
    if (api._rules.length > 0) {
        rules = rules.concat(api._rules)
    }
    // Add plugins needed
    Plugins(api, plugins)
    // Add custom plugins provided by API interface
    if (api._plugins.lenght > 0) {
        plugins = plugins.concat(api._plugins)
    }

    var config =  {
        entry: api._entries,
        output: {
            path: Helper.projectPath('dist'),
            filename: '[name].js',
            publicPath: '/webpack/'
        },
        devServer: {
            overlay: true,
            inline: true,
            hot: true,
            publicPath: '/webpack/',
            stats: {
                colors: true
            }
        },
        module: {
            rules: rules,
        },
        plugins: plugins
    }

    return config
}