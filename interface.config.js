var webpack = require('webpack');
module.exports = {
    entry: ['./src/web/index.tsx'],
    output: {
        path: './bin',
        filename: 'bundle.js'
    },
    debug: true,
    devtool: 'eval-source-map',
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
