var util = {},
    _ = require( 'lodash' );

util.isUuid = function( val ) {
    return /[a-f0-9]{8}-[a-f0-9]{4}-[14][a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test( val );
};

util.flattenDeepPathKey = function( obj ) {
    var list = {};

    (function flattenLevel( obj, result, prefix ) {
        _.transform( obj, function( result, value, key ) {
            if( _.isObject( value ) )
            {
                flattenLevel( value, result, prefix + key + '.' );
            }
            else
            {
                result[prefix + key] = value;
            }
        }, result );
    })( obj, list, '' );

    return list;
};

module.exports = util;