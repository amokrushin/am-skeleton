var i18next = require( 'i18next' );

module.exports = function( key, count ) {
    return i18next.t( key, {count: parseInt( count )} );
};