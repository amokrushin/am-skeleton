'use strict';

const path = require( 'path' ),
    configPath = /server$/.test( __dirname )
        ? path.resolve( __dirname, '../config.json' )
        : path.resolve( __dirname, './config.json' ),
    config = require( './server/config' );

config.init( configPath );

const express = require( 'express' ),
    app = express(),
    logger = require( './server/logger' ),
    middlewaresBefore = require( './server/middlewares/before' ),
    middlewares = require( './server/middlewares' ),
    middlewaresAfter = require( './server/middlewares/after' ),
    view = require( './server/view' ),
    router = require( './server/router' ),
    services = require( './server/services' );


app.locals.env = app.get( 'env' );

middlewaresBefore( app );

middlewares( app );
view( app );
router( app );

logger.info( {environment: app.get( 'env' )} );

if( app.get( 'env' ) === 'development' ) require( './server/webpack' )( app );

middlewaresAfter( app );

services.autostart();

module.exports = app;