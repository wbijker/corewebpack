webpack
As you've described, Webpack is a module bundler, it bundles various module formats primarily so they can be run in a browser. It offers both a CLI and Node API.

webpack-dev-middleware
Webpack Dev Middleware is middleware which can be mounted in an express server to serve the latest compilation of your bundle during development. This uses webpack's Node API in watch mode and instead of outputting to the file system it outputs to memory.

For comparison, you might use something like express.static instead of this middleware in production.

webpack-dev-server
Webpack Dev Server is itself an express server which uses webpack-dev-middleware to serve the latest bundle and additionally handles hot module replacement (HMR) requests for live module updates in the client.

webpack-hot-middleware
Webpack Hot Middleware is an alternative to webpack-dev-server but instead of starting a server itself it allows you to mount it in an existing / custom express server alongside webpack-dev-middleware.

Also...

webpack-hot-server-middleware
Just to confuse things even more, there's also Webpack Hot Server Middleware which is designed to be used alongside webpack-dev-middleware and webpack-hot-middleware to handle hot module replacement of server rendered apps.

