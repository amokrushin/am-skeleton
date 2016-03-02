'use strict';

const routes = require( './routes/index' ),
    passportRouter = require( './routes/passport' );

module.exports = function( app ) {
    app.use( '/', passportRouter );
    app.use( '/', routes );
};