module.exports = function( url ) {
    if( !url ) return;
    url = url.replace( /(\||\(|\))/g, '' ).replace( /\s\s/g, ' ' ).replace( /\s/g, '-' );
    return url;
    //return new handlebars.SafeString( url );
};