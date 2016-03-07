'use strict';

const passport = require( 'passport' );

passport.serializeUser( function( user, callback ) {
    callback( null, user.id );
} );

passport.deserializeUser( function( id, callback ) {
    callback( null, {id: id, roles: ['user']} );
} );

module.exports = passport;