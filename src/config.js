export default function() {
    return {
        // Standard webpack entries object
        entries: {},

        // List of what modules or scrips should be extracted
        extracts: [],

        // List of css modules to be extracted into one CSS file
        extractCSS: [],

        /// Extract all modules into a common chunk
        vendorExtract: false,

        // Additional custom webpack rules. 
        rules: [],

        // Additinoal custom weback plugins
        plugins: [],

        // The current mode in which the process runs. Can be 'dev', 'prod', 'test'
        // Dev will spin up HMR dev server
        mode: 0,

        // Generate source maps?
        sourceMaps: true,

        // Minifiy JS?
        minify: true,

        // Hash ouput. Will only work in production
        hash: true,
        
        // hot module development server configurations
        port: 8080,
        host: 'localhost',

        // Open browser default false, because the server is responsbile to deliver the content
        openBrowser: false,

        // use webpack-bundle-analyzer plugin
        analyzeBundle: false,
        
        // Customize logo for the notification
        logo: 'logo.png'
    }
}