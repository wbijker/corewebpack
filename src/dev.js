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
api.setMode(process.argv[2] || 'dev')

// Allow user to set mode
var config = require(configFile)

// Now generate a webpack config file with the API container
var config = require('./configBuilder.js')(api.config)

var Webpack = require('webpack')
const compiler = Webpack(config)

if (api.config.mode == 0) {
    var WebpackDevServer = require('webpack-dev-server');
    var server = new WebpackDevServer(compiler, config.devServer)

    server.listen(api.config.port, api.config.host, function() {
        if (api.config.openBrowser) {
            // Seems like webpack's open and openPage does not work
            const opn = require('opn');
            opn(api.config.getUrl())
        }
    });

} else {
    compiler.run((err, stats) => {
        if (err) {
            // Fatal webpack errors (wrong configuration, etc)
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }
        const info = stats.toJson();

        // Compilations errors (missing modules, syntax errors, etc)
        if (stats.hasErrors()) {
            console.error(info.errors);
        }
        
        // Compilation warnings
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }

        // else all is perfect
        console.log(stats.toString({
            // Add console colors
            colors: true
        }));
    })
}