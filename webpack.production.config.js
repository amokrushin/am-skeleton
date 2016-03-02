const Webpack = require( 'webpack' );
const path = require( 'path' );
const autoprefixer = require( 'autoprefixer' );
const BowerWebpackPlugin = require( "bower-webpack-plugin" );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const siteConfig = require( './config.json' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

var config = {
    //devtool: 'eval',

    entry: [
        'bootstrap-loader/extractStyles',
        './client/scripts/index.js'
    ],
    //output: {
    //    path: path.resolve( __dirname, 'public', 'build' ),
    //    filename: 'bundle.js',
    //    publicPath: '/'
    //},
    output: {
        path: path.join( __dirname, 'public', 'build' ),
        filename: 'bundle.js',
        publicPath: '/build/'
    },

    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract( 'style', 'css!postcss' )},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract( 'style', 'css!postcss!sass' )},
            {test: /\.(woff|woff2|ttf|eot|svg)(\?\S*)?$/, loader: "url?limit=10000"},
            //{test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'},
            {test: /\.hbs$/, loader: 'handlebars?helperDirs[]=' + path.resolve( __dirname, 'shared', 'handlebars' )},
            {test: /\.(png|jpg)$/, loader: 'url?limit=5000'}
        ]
    },

    postcss: [autoprefixer],

    plugins: [
        new ExtractTextPlugin( 'bundle.css', {allChunks: true} ),
        // Bootstrap 4
        //new Webpack.optimize.OccurenceOrderPlugin(),
        //new Webpack.HotModuleReplacementPlugin(),
        //new Webpack.NoErrorsPlugin(),
        new Webpack.ProvidePlugin( {
            $: "jquery",
            jQuery: "jquery",
            'window.Tether': "tether"
        } ),
        new BowerWebpackPlugin(),
        new CleanWebpackPlugin( ['public/build'], {
            root: __dirname,
            verbose: true,
            dry: false
        } )
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'server/views', 'client', 'shared'],
        //alias: {
        //    flipclock: path.resolve( __dirname, '/node_modules/flipclock/compiled/flipclock.js' )
        //}
        alias: {
            i18next: 'i18next/lib/index.js',
            "i18next-xhr-backend": 'i18next-xhr-backend/lib/index.js',
            "i18next-localstorage-cache": 'i18next-localstorage-cache/lib/index.js',
            "bootstrap-dropdown": 'bootstrap/dist/js/umd/dropdown.js'
        }
    }
};

module.exports = config;