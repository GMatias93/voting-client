var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = [
    {
        name: 'client',
        devtool: 'source-map',
        entry: [
            './client/src/index.jsx'
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/dist/'
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'babel',
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: 'style!css!autoprefixer?browsers=last 2 versions',
                    include: path.join(__dirname, 'src')
                }
            ]
        }
    },
    {
        name: 'server',
        entry: [
            './server.js'
        ],
        target: 'node',
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/dist/',
            filename: 'server-bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }
            ]
        },
        externals: nodeModules,
        plugins: [
            new webpack.IgnorePlugin(/\.(css|less)$/),
            new webpack.BannerPlugin('require("source-map-support").install();',
                                     { raw: true, entryonly: false })
        ],
        devtool: 'source-map'
    }

];
