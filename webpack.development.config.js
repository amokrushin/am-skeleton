const Webpack = require( 'webpack' ),
    path = require( 'path' ),
    autoprefixer = require( 'autoprefixer' ),
    BowerWebpackPlugin = require( "bower-webpack-plugin" ),
    siteConfig = require( './config.json' ),
    CleanWebpackPlugin = require( 'clean-webpack-plugin' ),
    bowerRoot = path.resolve( __dirname, 'bower_components' );

var config = {
    cache: true,

    devtool: 'eval',

    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        'bootstrap-loader',
        './client/scripts/index.js'
    ],
    output: {
        path: path.resolve( __dirname, 'public', 'build' ),
        filename: 'bundle.js',
        publicPath: siteConfig.url + '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?\S*)?$/,
                loader: "url?limit=10000"
                //include: path.resolve( __dirname, 'client/styles/fonts' )
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars?helperDirs[]=' + path.resolve( __dirname, 'shared', 'handlebars' )
                //include: path.resolve( __dirname, 'server/views' )
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=5000'
                //include: path.resolve( __dirname, 'public/images' )
            }
        ]
    },

    // don't parse some dependencies to speed up build.
    // can probably do this non-AMD/CommonJS deps
    noParse: [
        path.join( bowerRoot, '/jquery' )
    ],

    postcss: [autoprefixer],

    plugins: [
        // Bootstrap 4
        new Webpack.optimize.OccurenceOrderPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin(),
        new Webpack.ProvidePlugin( {
            $: "jquery",
            jQuery: "jquery",
            'window.Tether': "tether"
        } ),
        new BowerWebpackPlugin(),
        new CleanWebpackPlugin( ['public/build'], {
            root: __dirname,
            verbose: false,
            dry: false
        } )
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'client', 'shared'],
        alias: {
            i18next: 'i18next/lib/index.js',
            "i18next-xhr-backend": 'i18next-xhr-backend/lib/index.js',
            "i18next-localstorage-cache": 'i18next-localstorage-cache/lib/index.js',
            "bootstrap-dropdown": 'bootstrap/dist/js/umd/dropdown.js'
        }
    }
};

module.exports = config;