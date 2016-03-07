var _ = require( 'lodash' ),
    logger = require( '../logger' ),
    controller = {};

controller.login = function( req, res, next ) {
    res.render( 'index', {} );
};

controller.index = function( req, res, next ) {
    const responseData = _.assign( {
            //appSettings: req.user.store ? req.user.store.get( 'settings' ) : {}
        },
        _.pick( req, ['user', 'settings', 'path', 'csrftoken'] ),
        res.data
    );

    if( req.xhr || ~req.headers.accept.indexOf( 'json' ) )
    {
        res.json( responseData );
    }
    else
    {
        res.render( 'index', responseData );
    }
};

controller.messages = function( req, res, next ) {
    const messages = [];
    var message;
    while( message = res.locals.flash.shift() )
    {
        messages.push( message );
    }
    res.json( messages );
};

module.exports = controller;