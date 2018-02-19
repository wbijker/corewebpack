// Generate webpack config file with an instance of an API object

const Webpack = require('webpack')
const Path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Helper = require('./helper')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function isIncluded(module, entry) {
    if (entry.charAt(0) == '.') {
        // File
        // console.log('Relative library')
        // console.log(Helper.projectPath(entry))
        return Helper.projectPath(entry) === module.resource
    }
    // Module
    var rp = Helper.projectPath(Path.join('node_modules', entry))
    return module.context.indexOf(Helper.projectPath(Path.join('node_modules', entry))) === 0
}


function createCommonChunk(entry) {
    var obj = {
        name: entry.name,
        chunks: entry.chunks || null,
        minChunks: 2
    }

    if (entry.modules && entry.modules.length > 0) {
        obj.minChunks = function(module, count) {
            // return true if some of the modules is included in path
            return entry.modules.some(e => isIncluded(module, e))
        }
    }

    return new Webpack.optimize.CommonsChunkPlugin(obj)
}

function generateRules(api) {
    var rules =  [
        {
            test: /\.js$/,
            exclude: /node_modules/,
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
        },
    ]

    rules.concat(rules, api._extractCSS.map(e => 
        // extract common CSS into seperate chunks
        ({    
            // maybe rule.Condition?
            test: e.test,
            use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
        })
    ))
    return rules
}

function generatePlugins(api) {
    var plugins = []
    if (api._dev) {
        plugins.push(new Webpack.HotModuleReplacementPlugin())
    } else {
        // Production plugins
        plugins.push(new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }))
    }

    if (api._config.analyzeBundle) {
        plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
    }

    // Add commonChunks plugin
    api._extracts.forEach(entry => plugins.push(createCommonChunk(entry)))

    if (api.extractCSS.length > 0) {
        plugins.push(new ExtractTextPlugin({
            filename: 'style.css'
        }))
    }

    // Add manifest plugin for linking server side with client side 
    // Will generate manifest.json
    plugins.push(new ManifestPlugin())
    return plugins    
}

module.exports = function(api) {
    var config =  {
        entry: api._entries,
        output: {
            path: Helper.projectPath('dist'),
            filename: '[name].js',
            publicPath: '/webpack/'
        },
        devServer: {
            overlay: true,
            inline: true,
            hot: true,
            publicPath: '/webpack/',
            stats: {
                colors: true
            }
        },
        module: {
            rules: generateRules(api),
        },
        plugins: generatePlugins(api)
    }
    return config
}