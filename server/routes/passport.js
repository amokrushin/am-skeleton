var express = require( 'express' ),
    router = express.Router(),
    passport = require( '../passport' );

router.get( '/login',
    function( req, res ) {
        res.render( 'login', {
            title: 'Express',
            message: res.locals.flash.length ? res.locals.flash.pop().message : []
        } );
    }
);

router.post( '/login',
    passport.authenticate( 'local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    } )
);

router.get( '/logout',
    function( req, res ) {
        req.logout();
        res.redirect( '/' );
    }
);

module.exports = router;