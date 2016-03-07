const async = require( 'neo-async' ),
    _ = require( 'lodash' ),
    error = require( '../error' ),
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
rbacMiddleware.can = function( permissions, options ) {
    if( !_.isBoolean( options.breakIfDenied ) ) options.breakIfDenied = true;
    return function( req, res, next ) {
        if( !req.user && options.failureRedirect ) return res.redirect( options.failureRedirect );
        if( !req.user ) return options.breakIfDenied ? next( error.code( 7, '1457042155289' ) ) : next();
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

            var permissions = _.fromPairs( permissionsPairs ),
                isDenied = !_.min( _.values( permissions ) );

            if( options.failureRedirect && isDenied )
            {
                if( options.failureMessage ) req.flash( 'error', options.failureMessage );
                return res.redirect( options.failureRedirect );
            }
            if( options.breakIfDenied && isDenied ) return next( error.code( 7, '1457042230270' ) );

            _.assign( req.user.permissions, permissions );

            next();
        } );
    };
};

module.exports = rbacMiddleware;