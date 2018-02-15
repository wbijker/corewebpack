// Generate webpack config file with an instance of an API object

var webpack = require('webpack')
var defaultRules = require('./rules')
var path = require('path')

module.exports = function(api) {
    var config =  {
        entry: api._entries,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/webpack/'
        },
        devServer: {
            overlay: true,
            inline: true,
            hot: true
        },
        module: {
            rules: defaultRules(api)
        },
        plugins: []
    }

    return config
}