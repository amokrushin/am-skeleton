var async = require( 'async' ),
    _ = require( 'lodash' ),
    logger = require( '../logger' ),
    controller = {};

controller.index = function( req, res ) {
    if( req.xhr || ~req.headers.accept.indexOf( 'json' ) )
    {
        res.json( _.pick( req, ['user', 'raffle', 'raffles', 'profile', 'csrftoken'] ) );
    }
    else
    {
        res.render( 'index', req );
    }
};

controller.join = function( req, res ) {
    if( req.xhr || ~req.headers.accept.indexOf( 'json' ) )
    {
        res.json( _.pick( req, ['user', 'raffle', 'raffles', 'csrftoken'] ) );
    }
    else
    {
        res.redirect( 'back' );
    }
};

module.exports = controller;