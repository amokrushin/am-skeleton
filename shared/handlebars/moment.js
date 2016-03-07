var moment = require( 'moment' );

module.exports = function( time, block ) {
    var format = block.hash.format || "MMM DD, YYYY hh:mm:ss A",
        timestamp = block.hash.type === 's' ? parseInt( time, 10 ) * 1000 : parseInt( time, 10 );

    return moment( timestamp ).format( format );
};