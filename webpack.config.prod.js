var CircularDependencyPlugin = require('circular-dependency-plugin');
var path = require('path');

module.exports = {
    entry: './src/BL.js',
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        }
    },
    output: {
        path: __dirname,
        filename: 'build/bundle.js',
        library: 'BL',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
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
        new CircularDependencyPlugin({
            failOnError: true
        })
    ]
};