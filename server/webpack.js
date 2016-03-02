'use strict';

const webpack = require( 'webpack' ),
    webpackDevMiddleware = require( 'webpack-dev-middleware' ),
    webpackHotMiddleware = require( 'webpack-hot-middleware' ),
    webpackConfig = require( '../webpack.development.config' ),
    logger = require('./logger');

module.exports = function( app ) {
    // Step 1: Create & configure a webpack compiler
    var compiler = webpack( webpackConfig );

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use( webpackDevMiddleware( compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    } ) );

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use( webpackHotMiddleware( compiler, {
        log: logger.info, path: '/__webpack_hmr', heartbeat: 10 * 1000
    } ) );
};