'use strict';

const express = require( 'express' ),
    path = require( 'path' ),
    bodyParser = require( 'body-parser' ),
    cookieParser = require( 'cookie-parser' ),
    favicon = require( 'serve-favicon' ),
    session = require( 'express-session' ),
    csurf = require( 'csurf' ),
    config = require( '../config' ),
    passport = require( '../passport' ),
    passportMiddleware = require( './passport' ),
    flash = require( 'flash' ),
//nodalytics = require( 'nodalytics' ),
    rbac = require( './rbac' );

var sessionStore;

switch( config.get( 'session-store' ) )
{
    case 'filestore':
        var FileStore = require( 'session-file-store' )( session );
        sessionStore = new FileStore( {} );
        break;
    case 'redis':
        //var RedisStore = require( 'connect-redis' )( session );
        //sessionStore = new RedisStore( {client: redis} );
        break;
}

function sessionMiddleware() {
    return session( {
        store: sessionStore,
        secret: config.get( 'secret' ),
        key: 'express.sid',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
            secure: config.get( 'secure' )
            //domain: config.get( 'hostname' )
        },
        resave: true,
        saveUninitialized: true
    } );
}

function csrf() {
    return [csurf(), function( req, res, next ) {
        req.csrftoken = req.csrfToken();
        res.locals.csrftoken = req.csrftoken;
        next();
    }];
}


module.exports = function( app, sio ) {
    app.locals.baseUrl = config.get( 'baseUrl' );
    app.locals.env = app.get( 'env' );

    app.use( express.static( path.join( __dirname, '../../public' ) ) );
    app.use( '/locales', express.static( path.join( __dirname, '../../locales' ) ) );

    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded( {extended: false} ) );
    app.use( cookieParser() );

    app.use( function( req, res, next ) {
        res.cookie( 'locale', 'en', {maxAge: 900000, httpOnly: true} );
        next();
    } );
    // default: using 'accept-language' header to guess language settings
    //app.use( i18nMiddleware() );

    app.use( sessionMiddleware() );

    app.use( passport.initialize() );
    app.use( passport.session() );

    app.use( csrf() );

    app.use( flash() );

    //app.use( nodalytics( 'UA-73426854-1' ) );

    passportMiddleware.local();
};