'use strict';

var jsonfile = require( 'jsonfile' ),
    prompt = require( 'prompt' ),
    _ = require( 'lodash' ),
    async = require( 'async' ),
    path = require( 'path' ),
    crypto = require( 'crypto' ),
    fs = require( 'fs' ),
    nconf = require( 'nconf' ),
    credential = require( 'credential' )(),
    filepath = path.resolve( __dirname, '../config.json' );

function genSecret() {
    return crypto.randomBytes( 40 ).toString( 'hex' );
}

var questions = function( config ) {
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
            }
        ],
        admin: [
            {
                description: 'Administrator login or email',
                name: 'login'
            },
            {
                description: 'Administrator password',
                name: 'password'
            }
        ]
    };
};

try
{
    fs.closeSync( fs.openSync( filepath, 'wx' ) );
} catch( e )
{}

jsonfile.readFile( filepath, function( err, config ) {
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
            jsonfile.writeFile( filepath, config, callback );
            console.log( 'Config file saved', filepath );
        }
    ], function( err ) {
        if( err ) return console.error( err );
        process.exit( 0 );
    } );
} );