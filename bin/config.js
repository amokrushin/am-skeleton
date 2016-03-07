'use strict';

var fse = require( 'fs-extra' ),
    prompt = require( 'prompt' ),
    _ = require( 'lodash' ),
    async = require( 'async' ),
    path = require( 'path' ),
    crypto = require( 'crypto' ),
    configPath = path.resolve( __dirname, '../config.json' );

function genSecret() {
    return crypto.randomBytes( 40 ).toString( 'hex' );
}

const questions = function( config ) {
    return {
        main: [
            {
                name: 'url',
                description: 'Site url',
                'default': config.url,
                pattern: /^http(?:s)?:\/\//
            },
            {
                description: 'Site secret',
                name: 'secret',
                'default': config.secret || genSecret()
            },
            {
                description: 'Session store',
                name: 'sessionStore',
                'default': config.sessionStore || 'file'
            }
        ]
    };
};

fse.readJson( configPath, function( err, config ) {
    config = config || {};
    prompt.start();
    async.series( [
        function( callback ) {
            prompt.get( questions( config ).main, function( err, answers ) {
                _.assign( config, answers );
                config.url = _.trimEnd( config.url, '/' );
                callback();
            } );
        },
        function( callback ) {
            fse.outputJson( configPath, config, callback );
            console.log( 'Config file saved', configPath );
        }
    ], function( err ) {
        if( err ) return console.error( err );
        process.exit( 0 );
    } );
} );