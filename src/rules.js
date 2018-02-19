// Default rules for webpack configuration file

module.exports = function(api) {
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
            // maybe rule.Condition
            test: e.test,
            use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
        })
    ))
    return rules
}
