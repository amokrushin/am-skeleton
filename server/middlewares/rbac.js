var async = require( 'async' ),
    _ = require( 'lodash' ),
    httpError = require( '../http-error' ),
    rbac = require( '../rbac' ),
    rbacMiddleware = {};

/**
 * requires
 *      req.user.roles
 * extends
 *      req.user
 * sets
 *      req.user.permissions
 */
rbacMiddleware.can = function( permissions, breakIfDenied ) {
    if( !_.isBoolean( breakIfDenied ) ) breakIfDenied = true;
    return function( req, res, next ) {
        if( !req.user ) return breakIfDenied ? next( httpError.http403( 'bx9y4p' ) ) : next();
        _.defaults( req.user, {permissions: {}} );

        async.map( _.isArray( permissions ) ? permissions : [permissions], function( permission, callback ) {
            async.detectSeries( req.user.roles,
                function( role, callback ) {
                    rbac.check( role, permission, req, function( err, result ) {
                        if( err ) return callback( false );
                        callback( result );
                    } );
                },
                function( result ) {
                    callback( null, [_.camelCase( permission ), !!result] );
                }
            );
        }, function( err, permissionsPairs ) {
            if( err ) return next( err );

            var permissions = _.fromPairs( permissionsPairs );

            if( breakIfDenied && !_.min( _.values( permissions ) ) ) return next( httpError.http403( 'f4tjvk' ) );

            _.assign( req.user.permissions, permissions );

            next();
        } );
    };
};

module.exports = rbacMiddleware;