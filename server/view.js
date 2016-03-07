'use strict';

const _ = require( 'lodash' ),
    hbs = require( 'hbs' ),
    hbsutils = require( 'hbs-utils' )( hbs ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    i18nLoader = require( './i18next' );

function loadHelpers() {
    var helpers = fs.readdirSync( path.join( __dirname, '../shared/handlebars' ) );
    _.forEach( helpers, function( helper ) {
        const helperName = helper.replace( '.js', '' ),
            helperFn = require( '../shared/handlebars/' + helperName );

        if( _.isFunction( helperFn ) )
        {
            hbs.registerHelper( helperName, helperFn );
        }
    } );
}

function registerPartials( app ) {
    if( app.get( 'env' ) === 'development' )
    {
        hbsutils.registerWatchedPartials( path.join( __dirname, '/views/partials' ) );
    }
    else
    {
        hbsutils.registerPartials( path.join( __dirname, '/views/partials' ) );
    }
}

module.exports = function( app ) {
    app.set( 'views', path.join( __dirname, 'views' ) );
    app.set( 'view engine', 'hbs' );

    loadHelpers();
    registerPartials( app );
    hbs.localsAsTemplateData( app );

    i18nLoader();
};