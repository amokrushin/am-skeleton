var moment = require( 'moment' );

module.exports = function( context, block ) {
    var format = block.hash.format || "MMM DD, YYYY hh:mm:ss A",
        date = /\d+/.test( context ) ? parseInt( context, 10 ) : context;
    return moment( date ).format( format );
};