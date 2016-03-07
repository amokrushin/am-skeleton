require( 'es6-promise' ).polyfill();
require( './messenger' );
require( 'jquery-form' );

var page = require( 'page' ),
    _ = require( 'lodash' ),
    $ = require( 'jquery' ),
    pace = require( 'pace' );