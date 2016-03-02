module.exports = function( url ) {
    console.log( ['Values:'].concat(
        Array.prototype.slice.call( arguments, 0, -1 )
    ) );
};