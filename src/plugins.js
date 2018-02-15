var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var Helper = require('./helper')
var Path = require('path')
var Webpack = require('webpack')

function isIncluded(module, entry) {
    // module.resource = /Users/willem/projects/webpackdotnet/src/index.js 
    // module.context = /Users/willem/projects/webpackdotnet/src
    // console.log('Run module.isIncluded?')
    // console.log(entry)
    // console.log(module.resource, module.context)

    if (entry.charAt(0) == '.') {
        // relative module
        // console.log('Relative library')
        // console.log(Helper.projectPath(entry))
        return Helper.projectPath(entry) === module.resource
    }
    console.log('Its a module:', entry)
    var rp = Helper.projectPath(Path.join('node_modules', entry))
    console.log(module.context)
    console.log(rp)
    console.log(module.context.startsWith(rp))
    
    // its a node module
    // module.context =         /Users/willem/Temp/usedotnetwebpack/node_modules/vue/dist
    // Helper.projecPath.. =    /Users/Willem/temp/usedotnetwebpack/node_modules/vue
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
}