import webpack from "webpack";

// Generate webpack config file with an instance of an API object

export default function(api) {
    var config =  {
        entry: api._entry,
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
            rules: []
        },
        plugins: []
    }

    if (api.config.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }))
    }

    
    // All base entries
    api._extracts.forEach(e => {
        // e.modules, e.name
        config.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: e.name,
                chunks: e.chunks,
                // children: true,
                minChunks(module, count) {
                    // module.resource = /Users/willem/projects/webpackdotnet/src/index.js 
                    // module.context = /Users/willem/projects/webpackdotnet/src
                    
                    // e.modules can be a module or a library

                    return module.resource.indexOf('lib') !== -1
                },
            }),
        )
    });
    
    return config
}