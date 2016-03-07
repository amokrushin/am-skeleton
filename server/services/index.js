const _ = require( 'lodash' ),
    path = require( 'path' ),
    services = {};

services.list = _.keyBy( [
    //{
    //    name: 'gmailIncomingMessage',
    //    title: 'Gmail incoming message',
    //    fn: require( '../services/gmail-incoming-messages' )
    //},
], 'name' );

services.autostart = function() {
};

services.start = function( id ) {
    services.stop( id );
};

services.stop = function( id ) {
};

module.exports = services;