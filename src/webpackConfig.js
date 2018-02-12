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
        
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'lib',
        //     chunks: ['main', 'a', 'b'],
        //     // children: true,
        //     minChunks(module, count) {
        //         // module.resource = /Users/willem/projects/webpackdotnet/src/index.js 
        //         // module.context = /Users/willem/projects/webpackdotnet/src
        //         return module.resource.indexOf('lib') !== -1
        //     },
        // }),

        
    });
    
    return config
}