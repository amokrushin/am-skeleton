const passport = require( 'passport' );

passport.serializeUser( function( userId, callback ) {
    callback( null, userId );
} );

passport.deserializeUser( function( userId, callback ) {
    callback( null, userId );
} );

module.exports = passport;