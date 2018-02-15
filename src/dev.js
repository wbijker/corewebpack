// Run dev server with options provided by host app using API
var path = require('path')
var fs = require('fs')
var helper = require('./helper')

// include api from host application
var configFile = helper.projectPath('webpack.js')
if (!fs.existsSync(configFile)) {
    throw Error('Webpack configuration file not found. Searched path ' + configFile)
}

// Get reference to api. Webpack.js is making changes to this files
var api = require('./api.js')
var config = require(configFile)

// Now generate a webpack config file with the API container
var config = require('./webpackConfigBuilder.js')(api)
const WebpackDevServer = require('webpack-dev-server');

console.log('All done')

// // add the webpack-dev-server client entry point to the webpack configuration.
// for (var k in config.entry) {
//     config.entry[k] = [config.entry[k],  'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080']
// }

// const compiler = webpack(config)

// var server = new WebpackDevServer(compiler,
// {
//     overlay: true,
//     inline: true,
//     hot: true,
//     publicPath: config.output.publicPath
// });
// server.listen(8080);

