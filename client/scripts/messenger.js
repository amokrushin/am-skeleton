require( '../../node_modules/messenger/build/js/messenger.js' );
require( '../../node_modules/messenger/build/js/messenger-theme-flat' );

Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'flat'
};

$( function() {
    $.getJSON( '/api/messages', function( messages ) {
        for( var i = 0; i < messages.length; i++ )
        {
            Messenger().post( {
                message: messages[i].message,
                type: messages[i].type
            } );
        }
    } );

} );