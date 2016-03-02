const logger = require( './logger' ),
    httpError = {};

httpError.http = function( tag, err ) {
    if( err.code === 'ENOTFOUND' ) return httpError.http404( tag, err );
    return httpError.http500( tag, err );
};

httpError.http500 = function( tag, err ) {
    var error = new Error( 'Internal Server Error. ' + tag || '' );
    error.status = 500;
    logger.error( {tag: tag, error: err} );
    return error;
};

httpError.http420 = function( tag, err ) {
    var error = new Error( 'Method Failure. ' + tag || '' );
    error.status = 420;
    logger.error( {tag: tag, error: err} );
    return error;
};

httpError.http400 = function( tag, err ) {
    var error = new Error( 'Bad Request. ' + tag || '' );
    error.status = 400;
    logger.error( {tag: tag, error: err} );
    return error;
};

httpError.http404 = function( tag, err ) {
    var error = new Error( 'Not found. ' + tag || '' );
    error.status = 404;
    logger.error( {tag: tag, error: err} );
    return error;
};

httpError.http403 = function( tag, err ) {
    var error = new Error( 'Forbidden. ' + tag || '' );
    error.status = 403;
    logger.error( {tag: tag, error: err} );
    return error;
};

module.exports = httpError;