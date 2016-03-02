var i18next = require( 'i18next' );

module.exports = function( key, value, context ) {
    //return new handlebars.SafeString( i18next.t( key, {value: value} ) );
    return i18next.t( key, {value: value} );
};