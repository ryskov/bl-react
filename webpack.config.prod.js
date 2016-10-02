var CircularDependencyPlugin = require('circular-dependency-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/BL.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        library: 'BL',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' /* loader: ExtractTextPlugin.extract("style-loader", "css-loader") */},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:'url-loader?limit=10000000&mimetype=application/font-woff'},
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
            { 
                test: /\.js$/,
                exclude: /(lib|build|node_modules|bower_components)/, 
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
     //   new ExtractTextPlugin('bundle.css'),
        new CircularDependencyPlugin({
            failOnError: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    externals: ['react', 'underscore']
};