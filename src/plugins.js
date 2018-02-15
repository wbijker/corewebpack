var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function(api, list) {
    if (api._config.analyzeBundle) {
        list.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
    }

    // Add commonChunks plugin

}