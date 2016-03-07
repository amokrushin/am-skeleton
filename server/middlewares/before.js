const express = require( 'express' ),
    _ = require( 'lodash' ),
    path = require( 'path' ),
    logger = require( '../logger' );

module.exports = function( app ) {

    app.set( 'trust proxy', 'loopback' );

    app.use( '/build', express.static( path.join( __dirname, '../../public/build' ) ) );
    //app.use( '/locales', express.static( path.join( __dirname, '../../locales' ) ) );

    /*
     * ==== Request logger ====
     */
    app.use( function( req, res, next ) {
        req.timestamp = Date.now();
        const reqData = {};
        if( !_.isEmpty( req.query ) ) reqData.query = req.query;
        if( !_.isEmpty( req.body ) ) reqData.query = req.body;
        logger.info( 'http', req.path, 'req', _.isEmpty( reqData ) ? '' : reqData );
        next();
    } );
};