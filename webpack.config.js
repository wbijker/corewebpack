const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'webpack'
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
                    // loaders: {
                    //     js: 'babel-loader!eslint-loader'
                    // }
                }
            }
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin()
    ],
}