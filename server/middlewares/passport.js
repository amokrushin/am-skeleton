"use strict";

var async = require( 'async' ),
    _ = require( 'lodash' ),
    passport = require( '../passport' ),
    credential = require( 'credential' )(),
    LocalStrategy = require( 'passport-local' ).Strategy,
    config = require( '../config' ),
    logger = require( '../logger' );

function flashErr( req, err ) {
    logger.error( err );
    req.flash( 'loginMessage', req.__( 'loginMessage.error.unknown' ) );
}
function flashNoUser( req ) {
    req.flash( 'loginMessage', req.__( 'loginMessage.error.userNotFound' ) );
}
function flashWrongPassword( req ) {
    req.flash( 'loginMessage', req.__( 'loginMessage.error.wrongPassword' ) );
}

function localStrategyMiddleware( req, email, password, callback ) {
    callback();
}

module.exports = {
    local: function() {
        passport.use( 'local-login',
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                    passReqToCallback: true
                },
                localStrategyMiddleware
            )
        );
    }
};