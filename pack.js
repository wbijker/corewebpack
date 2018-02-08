// 1. Provide clean API to add / confiure files to webpack pipeline
// 2. Run through web module
// 3. Development, test and production version
// 4. Webpack manifest file 

const webpack = require('webpack');
const config = require('./webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

var development = false

if (development) {

    // add the webpack-dev-server client entry point to the webpack configuration.
    for (var k in config.entry) {
        config.entry[k] = [config.entry[k],  'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080']
        // console.log(config.entry[k])
    }

    const compiler = webpack(config)

    var server = new WebpackDevServer(compiler,
    {
        overlay: true,
        inline: true,
        hot: true,
        publicPath: config.output.publicPath
    });
    server.listen(8080);
}

if (!development) {
    const compiler = webpack(config)
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
            // ...
            // Add console colors
            colors: true
        }));

        // Done processing
    });
}
