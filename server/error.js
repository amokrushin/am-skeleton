const _ = require( 'lodash' ),
    httpStatus = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not found',
        406: 'Not Acceptable',
        410: 'Gone',
        420: 'Enhance Your Calm',
        500: 'Internal Server Error'
    },
    errors = {
        0: [500, 'System error'],
        1: [403, 'API key not set'],
        2: [403, 'Invalid API key'],
        3: [403, 'Your current ip address is not whitelisted for that API key'],
        4: [401, 'Authorization header is not set'],
        5: [401, 'Invalid JSON web token'],
        6: [401, 'Invalid JSON web token payload'],
        7: [403, 'Your token has no access to that bot account'],
        10: [400, 'Invalid steamID64 url parameter'],
        11: [400, 'Invalid tradeoffer id parameter'],
        20: [401, 'Steam Guard code required'],
        21: [401, 'Two factor authentication already enabled on that account'],
        26: [401, 'Two factor authentication error'],
        22: [401, 'Two factor authentication activation code required'],
        23: [401, 'Two factor authentication activation failed'],
        24: [401, 'steamID64 is not consistent with the provided credentials'],
        25: [429, 'Two factor authentication activation code required'],
        40: [400, 'Unknown'],
        50: [500, 'Couldn\'t get account API key'],
        51: [403, 'Bot not initialized'],
        61: [404, 'Tradeoffer not found'],
        62: [400, 'Either partnerSteamId or partnerAccountId is required'],
        63: [400, 'partnerToken should is required'],
        64: [400, 'Either itemsToGive or itemsToReceive must be not empty'],
        65: [400, 'Tradeoffer cannot be canceled'],
        66: [400, 'Tradeoffer cannot be canceled, it is not out offer'],

        70: [400, 'Other bot account was not initialized. Internal tradeoffer was sent, but input offer can\'t be accepted'],

        100: [500, 'Something went wrong']
    },
    systemErrors = {
        ENOENT: [500, 'No such file or directory']
    };


module.exports.code = function( code, tag, metadata ) {
    var status = errors[code] ? errors[code][0] : 500,
        err = new Error( httpStatus[status] );
    err.status = status;
    err.description = errors[code] ? errors[code][1] : 'Unknown error';
    err.code = code;
    err.tag = [];
    if( tag ) err.tag.push( tag );
    if( metadata ) err.metadata = metadata;
    return err;
};

module.exports.system = function( serr, tag ) {
    console.log( serr );
    var err = new Error( 'System error' );
    err.status = 500;
    err.description = systemErrors[serr.code] ? systemErrors[serr.code][1] : serr.message;
    err.code = serr.code;
    err.tag = [];
    if( tag ) err.tag.push( tag );
    if( metadata ) err.metadata = err.stack;
    return err;
};

module.exports.tag = function( err, tag ) {
    if( !err.tag ) err.tag = [];
    err.tag.push( [tag, _.trim( new Error().stack.split( '\n' )[2].replace( 'at', '' ) )] );
    return err;
};