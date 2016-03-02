var nconf = require( 'nconf' ),
    url = require( 'url' ),
    path = require( 'path' ),
    configPath = /server$/.test( __dirname )
        ? path.resolve( __dirname, '../config.json' )
        : path.resolve( __dirname, './config.json' );

nconf.use( 'file', {file: configPath} );

nconf.load( function( err, config ) {
    if( !config.secret )
    {
        nconf.set( 'secret', require( 'crypto' ).randomBytes( 64 ).toString( 'hex' ) );
        nconf.save();
    }

    if( nconf.get( 'url' ) )
    {
        var urlObject = url.parse( nconf.get( 'url' ) );
        nconf.set( 'baseUrl', urlObject.protocol + '//' + urlObject.host );
        nconf.set( 'secure', /^https/.test( urlObject.protocol ) );
        nconf.set( 'relativePath', urlObject.pathname );
        nconf.set( 'port', urlObject.port || nconf.get( 'port' ) || 3000 );
        nconf.set( 'hostname', urlObject.hostname );
    }

} );

module.exports = nconf;