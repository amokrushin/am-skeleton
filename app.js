'use strict';
const config = require( './server/config' ),
    path = require( 'path' ),
    fse = require( 'fs-extra' );

config.set( 'apiKeyFile', path.resolve( __dirname, 'credentials/api-key.json' ) );
config.set( 'whitelistedEmails', path.resolve( __dirname, 'credentials/whitelist.json' ) );
config.set( 'tokenPath', path.resolve( __dirname, 'credentials' ) );
config.set( 'dataPath', path.resolve( __dirname, 'data' ) );
config.set( 'leasewebCookieFile', path.resolve( __dirname, 'data/leaseweb-cookies.json' ) );
fse.ensureFileSync( config.get( 'leasewebCookieFile' ) );


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