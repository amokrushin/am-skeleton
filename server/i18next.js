'use strict';

const i18next = require( 'i18next' ),
    i18nextSyncFsBackend = require( 'i18next-sync-fs-backend' ),
    path = require( 'path' );

module.exports = function() {
    i18next
        .use( i18nextSyncFsBackend )
        .init( {
            lng: "en",
            fallbackLng: "en",
            saveMissing: true,
            backend: {
                loadPath: path.join( __dirname, "../locales/{{lng}}/{{ns}}.json" ),
                addPath: path.join( __dirname, "../locales/{{lng}}/{{ns}}.missing.json" ),
                jsonIndent: 4
            }
        } );
};