var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var Helper = require('./helper')
var Path = require('path')
var Webpack = require('webpack')
var ManifestPlugin = require('webpack-manifest-plugin');

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

module.exports = function(api, list) {
    if (api._config.analyzeBundle) {
        list.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
    }

    // Add commonChunks plugin
    api._extracts.forEach(entry => list.push(createCommonChunk(entry)))

    // Add manifest plugin for linking server side with client side 
    // Will generate manifest.json
    list.push(new ManifestPlugin())
    return list    
}