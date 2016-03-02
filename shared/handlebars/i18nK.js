var i18next = require( 'i18next' );

module.exports = function() {
    var args = [].slice.apply( arguments ).slice( 0, -1 );
    //return new handlebars.SafeString( i18next.t( args.join( '.' ) ) );
    return i18next.t( args.join( '.' ) );
};