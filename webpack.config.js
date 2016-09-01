var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        main: [
            './src/Main.jsx'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: "/build/"
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel'
        },{
            test: /\.scss$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'style!css!sass'
        }]
    },
    watch: true
};
