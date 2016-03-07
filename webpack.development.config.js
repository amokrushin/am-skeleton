const Webpack = require( 'webpack' ),
    path = require( 'path' ),
    autoprefixer = require( 'autoprefixer' ),
    BowerWebpackPlugin = require( "bower-webpack-plugin" ),
    appConfig = require( './config.json' ),
    CleanWebpackPlugin = require( 'clean-webpack-plugin' ),
    bowerRoot = path.resolve( __dirname, 'bower_components' ),
    config = {
        cache: true,

        devtool: 'eval',

        entry: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            'bootstrap-loader',
            './client/scripts/index.js'
        ],
        output: {
            path: path.resolve( __dirname, 'public/build' ),
            filename: 'bundle.js',
            publicPath: appConfig.baseUrl + '/build/'
        },
        module: {
            loaders: [
                {
                    test: /\.(png|jpg|gif|svg)(\?\S*)?$/,
                    loader: 'url?limit=1000',
                    include: path.resolve( __dirname, 'client/images' )
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?\S*)?$/,
                    loader: "url?limit=5000",
                    include: path.resolve( __dirname, 'client/styles/fonts' )
                },
                {
                    test: /\.css$/,
                    loaders: ['style', 'css', 'postcss']
                },
                {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'postcss', 'sass']
                },
                {
                    test: /\.hbs$/,
                    loader: 'handlebars?helperDirs[]=' + path.resolve( __dirname, 'shared', 'handlebars' ),
                    include: path.resolve( __dirname, 'server/views' )
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
                //'window.Tether': "tether"
            } ),
            new BowerWebpackPlugin(),
            new CleanWebpackPlugin( ['public/build'], {
                root: __dirname,
                verbose: false,
                dry: false
            } )
        ],

        resolve: {
            modulesDirectories: ['node_modules', 'server/views', 'client', 'shared'],
            alias: {
                i18next: 'i18next/lib/index.js',
                "i18next-xhr-backend": 'i18next-xhr-backend/lib/index.js',
                "i18next-localstorage-cache": 'i18next-localstorage-cache/lib/index.js',
                "bootstrap-dropdown": 'bootstrap/dist/js/umd/dropdown.js',
                "hubspot-messenger": path.join( __dirname, 'node_modules/messenger/build/js/messenger.js' ),
                "hubspot-messenger-theme-future": path.join( __dirname, 'node_modules/messenger/build/js/messenger-theme-future.js' ),
            }
        }
    };

module.exports = config;