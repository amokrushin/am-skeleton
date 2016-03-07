'use strict';

const passportRoutes = require( './routes/passport' ),
    appRoutes = require( './routes/index' );

module.exports = function( app ) {
    app.use( '/', passportRoutes );
    app.use( '/', appRoutes );
};