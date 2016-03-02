var RBAC = require( 'rbac2' ),
    _ = require( 'lodash' ),
    util = require( '../shared/util' );

/**
 * @param req
 * @param req.user.id
 * @param req.profile.id
 * @param callback
 */
function isSelfProfile( req, callback ) {
    if( !req.user ) return callback( null, false );
    if( !req.profile || !req.profile.id ) return callback( null, false );
    if( req.user.id != req.profile.id ) return callback( null, false );
    return callback( null, true );
}

var rules = [
        {a: 'admin', can: 'admin permission'},
        {a: 'admin', can: 'user permission'},
        {a: 'user', can: 'view profile', when: isSelfProfile}
    ],
    rbac = new RBAC( rules );

module.exports = rbac;