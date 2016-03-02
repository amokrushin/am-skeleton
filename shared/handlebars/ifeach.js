module.exports = function() {
    var args = [].slice.apply( arguments ),
        context = args.pop();
    for( var i = 0; i < args.length; ++i )
    {
        if( args[i] ) continue;
        return context.inverse(this);
    }
    return context.fn( this );
};