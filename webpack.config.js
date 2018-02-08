const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        main: './src/index.js',
        a: './src/a.js',
        b: './src/b.js'
    },
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
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            }
        ]
    },
    plugins: [
        // new FriendlyErrorsWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),

        // new webpack.HotModuleReplacementPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     minChunks: 2
        // }),

       
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            chunks: ['main', 'a', 'b'],
            // children: true,
            minChunks(module, count) {
                // module.resource = /Users/willem/projects/webpackdotnet/src/index.js 
                // module.context = /Users/willem/projects/webpackdotnet/src
                return module.resource.indexOf('lib') !== -1
            },
        }),

        
        //specifically bundle these large things
        new webpack.optimize.CommonsChunkPlugin({
            name: 'big',
            chunks: ['main', 'a', 'b'],
            // children: true,
            minChunks(module, count) {
                return module.resource.indexOf('big.js') !== -1
            },
        }),

        // //catch all - anything used in more than one place
        new webpack.optimize.CommonsChunkPlugin({
            name: 'twice-or-more', 
            // async: 'used-twice',
            minChunks(module, count) {
                return count >= 2;
            },
        }),


        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
             // Passing `Infinity` just creates the commons chunk, but moves no modules into it.
            minChunks: Infinity
        })        
        
        // new webpack.optimize.CommonsChunkPlugin({
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'biglibcommons',
        //     minChunks: function(module, count) {
        //         // If module has a path, and inside of the path exists the name "somelib",
        //         // and it is used in 3 separate chunks/entries, then break it out into
        //         // a separate chunk with chunk keyname "my-single-lib-chunk", and filename "my-single-lib-chunk.js"
        //         // console.log('MR:', module.resource);
        //         return module.resource.indexOf('biglib.js') > 0
        //         // return module.resource && (/somelib/).test(module.resource) && count > 1;
        //     }
        // }),
        //     // Chunk name. Array of strings is equal to invoking the plugin multiple times for each chunk name
        //     name: 'commons',
        //     chunks: ['main', 'a', 'b'],
        //     // (the commons chunk name
        //     filename: "commons.js"
        // })
    ]
}