var sio;

module.exports = function( server ) {
    if( server ) sio = require( 'socket.io' )( server );
    return sio;
};