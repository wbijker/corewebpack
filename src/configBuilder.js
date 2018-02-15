// Generate webpack config file with an instance of an API object

var webpack = require('webpack')
var defaultRules = require('./rules')
var path = require('path')
var helper = require('./helper')

module.exports = function(api) {
    var config =  {
        entry: api._entries,
        output: {
            path: helper.projectPath('dist'),
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
            rules: defaultRules(api)
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }

    return config
}