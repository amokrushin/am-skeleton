module.exports = function() {
    var args = [].slice.apply( arguments ),
        context = args.pop();
    for( var i = 0; i < args.length; ++i )
    {
        if( args[i] ) return context.fn( this );
    }
    return context.inverse( this );
};