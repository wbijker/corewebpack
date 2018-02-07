const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    // a: './src/a.js',
    // b: './src/b.js',
    // lib: './src/lib.js'
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
        new FriendlyErrorsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
        // new webpack.optimize.CommonsChunkPlugin({
        //     // Chunk name. Array of strings is equal to invoking the plugin multiple times for each chunk name
        //     name: 'commons',
        //     chunks: ['main', 'a', 'b'],
        //     // (the commons chunk name
        //     filename: "commons.js"
        // })
    ]
}