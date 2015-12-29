var path = require('path');

module.exports = {
    entry: {
        metaCompiler: "./src/metaCompiler/index.ts",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.json']
    },
    target: "node",
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.txt$/, loader: "raw-loader" },
            { test: /\.ts$/, loader: 'awesome-typescript-loader' }
        ]
    }
}
