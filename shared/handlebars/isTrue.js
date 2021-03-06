var ExpressionRegistry = function() {
    this.expressions = [];
};

ExpressionRegistry.prototype.add = function( operator, method ) {
    this.expressions[operator] = method;
};

ExpressionRegistry.prototype.call = function( operator, left, right ) {
    if( !this.expressions.hasOwnProperty( operator ) )
    {
        throw new Error( 'Unknown operator "' + operator + '"' );
    }

    return this.expressions[operator]( left, right );
};

var eR = new ExpressionRegistry;
eR.add( 'not', function( left, right ) {
    return left != right;
} );
eR.add( '>', function( left, right ) {
    return left > right;
} );
eR.add( '<', function( left, right ) {
    return left < right;
} );
eR.add( '>=', function( left, right ) {
    return left >= right;
} );
eR.add( '<=', function( left, right ) {
    return left <= right;
} );
eR.add( '===', function( left, right ) {
    return left === right;
} );
eR.add( '!==', function( left, right ) {
    return left !== right;
} );
eR.add( 'in', function( left, right ) {
    if( !_.isArray( right ) )
    {
        right = right.split( ',' );
    }
    return right.indexOf( left ) !== -1;
} );

var isHelper = function() {
    var args = arguments
        , left = args[0]
        , operator = args[1]
        , right = args[2]
        , val = args[3]
        , options = args[4]
        ;

    if( eR.call( operator, left, right ) )
    {
        return val;
    }
    return '';
};

module.exports = isHelper;