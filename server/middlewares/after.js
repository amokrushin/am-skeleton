const _ = require( 'lodash' ),
    logger = require( '../logger' ),
    error = require( '../error' );

module.exports = function( app ) {
    app.use( function( req, res ) {
        const time = Date.now() - req.timestamp;
        logger.info( 'api', req.path, 'res', 200, time + 'ms' );
    } );

    /*
     * ==== Error handler ====
     */

    // catch 404 and forward to error handler
    app.use( function( req, res, next ) {
        next( error.http( 404 ) );
    } );

    if( app.get( 'env' ) === 'development' )
    {
        app.use( function( err, req, res, next ) {
            if( !_.isError( err ) ) return;
            const time = Date.now() - req.timestamp,
                responseData = _.omit( {
                    status: err.status || 500,
                    message: err.message,
                    description: err.description,
                    code: err.code,
                    tags: err.tag,
                    metadata: err.metadata
                }, _.isNil );

            logger.error( 'api', req.path, 'res', responseData.status, time + 'ms', _.omit( responseData, ['status'] ) );

            res.status( responseData.status );

            (req.xhr || ~req.headers.accept.indexOf( 'json' ))
                ? res.json( responseData )
                : res.render( 'error', {error: responseData} );

            //next();
        } );
    }
    else
    {
        app.use( function( err, req, res, next ) {
            if( !_.isError( err ) ) return;
            const time = Date.now() - req.timestamp,
                responseData = _.omit( {
                    status: err.status || 500,
                    message: err.message,
                    description: err.description,
                    code: err.code
                    //tags: err.tag,
                    //metadata: err.metadata
                }, _.isNil );

            logger.error( 'api', req.path, 'res', responseData.status, time + 'ms', _.omit( responseData, ['status'] ) );

            res.status( responseData.status );

            (req.xhr || ~req.headers.accept.indexOf( 'json' ))
                ? res.json( responseData )
                : res.render( 'error', {error: responseData} );
        } );
    }
};