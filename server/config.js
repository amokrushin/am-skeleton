'use strict';

const config = require( 'nconf' ),
    url = require( 'url' ),
    path = require( 'path' ),
    fse = require( 'fs-extra' );

var isInitial = true;

function ensureJsonSync( path ) {
    fse.ensureFileSync( path );
    return fse.readJsonSync( path, {throws: false} )
        ? null
        : fse.outputJsonSync( path, {} );
}

config.init = function( configPath ) {
    ensureJsonSync( configPath );

    config.use( 'file', {file: configPath} );

    config.load( function( err, config ) {
        if( !config.secret )
        {
            config.set( 'secret', require( 'crypto' ).randomBytes( 64 ).toString( 'hex' ) );
            config.save();
        }
    } );
};

config.middleware = function( req, res, next ) {
    if( isInitial )
    {
        config.set( 'baseUrl', req.protocol + '://' + req.get( 'host' ) );
        config.set( 'secure', req.protocol === 'https' );
        isInitial = false;
        return config.save( next );
    }
    next();
};

module.exports = config;
