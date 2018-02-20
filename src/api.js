// api is only a container for holding configuration related options

import Config from './config'

class Api {

    constructor() {
        // Create default config settings
        this.config = Config()
    }

    setMode(mode) {
        let index = ['dev', 'prod'].indexOf(mode)
        if (index == -1) {
            throw new Error(`'${mode}' is not a mode name. Use eiather 'prod' or 'dev'`)
        }
        this.config.mode = index
    }

    isDev() {
        return this.config.mode == 0
    }

    isProd() {
        return this.config.mode == 1
    }

    sourceMaps(options) {
        // todo add options here
        this.config.sourceMaps = true
    }

    minify(options) {
        // todo add options here
        this.config.minify = true
    }

    hash(options) {
        // todo add options here
        this.config.hash = true
    }

    host(host, port) {
        // Automatically set port, domain, and path according
        this.config.host = host
        this.config.port = port
    }

    useProxy(config) {
        this.config.proxy = true
    }

    // https://www.npmjs.com/package/webpack-bundle-analyzer
    analyzeBundle(options) {
        this.config.analyzeBundle = true
        this.config.analyzeOptions = options
    }

    entry(chunkName, source) {
        if (this.config.entries[chunkName]) {
            throw new Error(`Entry ${chunkName} already exsits. Please choose another chunk name.`)
        }
        this.config.entries[chunkName] = source
    }

    entries(entries) {
        // merge entries into existing
        for (let k in entries) {
            this.entries(k, entries[k])
        }
    }

    // extract all modules into one chunk 
    extractVendor(chunkName, manifestName) {
        this.config.extracts.push({
            modules(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.includes("node_modules");
            },
            chunkName,
            // Apply to all chunks
            applyToChunks: null
        })
        if (manifestName) {
            this.config.extracts.push({
                modules: Infinity,
                chunkName: manifestName,
                applyToChunks: null
            })
        }
    }

    extract(modules, chunkName, applyToChunks) {
        // Make sure all chunks exists
        if (applyToChunks && !applyToChunks.every(c => this.entries[c])) {
            throw new Error(`Some chunks does not exits trying to create '${chunkName}' chunk.`)
        }

        this.config.extracts.push({
            modules,
            chunkName,
            applyToChunks
        })
    }
    
    // utility extractCSS plugin
    // test regex
    extractCSS(test, chunkName) {
        this.config.extractCSS.push(
            test,
            chunkName
        )
    }

    addRule(rule) {
        config.rules.push(rule)
    }

    addPlugin(plugin) {
        config.plugins.push(plugin)
    }

    // public exposable URL needed to setup webpack dev server module 
    // and to open default browser if setting is enabled.
    getUrl() {
        return `http://${this.config.host}:${this.config.port}`
    }
}

export default new Api()