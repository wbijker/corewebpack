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
        name: entry.chunkName,
        chunks: entry.targetChunks || null,
        minChunks: 2
    }
    // var type = typeof entry.modules
    if (Array.isArray(entry.module)) {
        obj.minChunks = function(module, count) {
            // return true if some of the modules is included in path
            console.log('Entry.modules', entry, entry.modules)
            return entry.modules.some(e => isIncluded(module, e))
        }
    } else if (typeof entry.modules == 'function') {
        obj.minChunks = module.modules
    }

    return new Webpack.optimize.CommonsChunkPlugin(obj)
}

function generateRules(config) {
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

    // extract common CSS into seperate chunks
    rules.concat(rules, config.extractCSS.map(e => 
        ({    
            // maybe rule.Condition?
            test: e.test,
            use: extractCSS.extract(['css-loader', 'postcss-loader'])
        })
    ))
    return rules
}

function generatePlugins(config) {
    var plugins = []
    if (config.mode == 0) {
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

    if (config.analyzeBundle) {
        plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
    }

    // Add commonChunks plugin
    config.extracts.forEach(entry => plugins.push(createCommonChunk(entry)))

    if (config.extractCSS.length > 0) {
        plugins.push(new ExtractTextPlugin({
            filename: 'style.css'
        }))
    }

    // Add manifest plugin for linking server side with client side 
    // Will generate manifest.json
    plugins.push(new ManifestPlugin())
    return plugins
}

function createEntries(config) {
    if (config.mode == 0) {
        // Webpack-dev-server module has no access to the webpack configuration. 
        // Instead, the user must add the webpack-dev-server client entry point to the webpack configuration.
        // https://github.com/webpack/docs/wiki/webpack-dev-server
        for (var k in config.entries) {
            config.entries[k] = [config.entries[k],  'webpack/hot/dev-server', 'webpack-dev-server/client?' + config.getUrl()]
        }
    }
    return config.entries
}

module.exports = function(config) {
    let webapckConfig = {
        entry: createEntries(config),
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
            rules: generateRules(config),
        },
        plugins: generatePlugins(config)
    }
    return webapckConfig
}