// Run dev server with options provided by host app using API
var Fs = require('fs')
var Helper = require('./helper')

// include api from host application
var configFile = Helper.projectPath('webpack.js')
if (!Fs.existsSync(configFile)) {
    throw Error('Webpack configuration file not found. Searched path ' + configFile)
}

// Get reference to api. Webpack.js is making changes to this files
var api = require('./api.js')
var config = require(configFile)

// Now generate a webpack config file with the API container
var config = require('./configBuilder.js')(api)

var httpUrl = 'http://' + api._config.host + ':' + api._config.port

var Webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server');

// Webpack-dev-server module has no access to the webpack configuration. 
// Instead, the user must add the webpack-dev-server client entry point to the webpack configuration.
// https://github.com/webpack/docs/wiki/webpack-dev-server
for (var k in config.entry) {
    config.entry[k] = [config.entry[k],  'webpack/hot/dev-server', 'webpack-dev-server/client?' + httpUrl]
}

const compiler = Webpack(config)

var server = new WebpackDevServer(compiler, config.devServer)

server.listen(api._config.port, api._config.host, function() {
    if (api._config.openBrowser) {
        // Seems like webpack's open and openPage does not work
        const opn = require('opn');
        opn(httpUrl)
    }
});
