var webpack = require('webpack');
module.exports = {
    entry: ['./src/web/index.tsx'],
    output: {
        path: './bin',
        filename: 'bundle.js'
    },
    devtool: false,
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.tsx', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
