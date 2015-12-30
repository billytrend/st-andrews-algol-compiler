var path = require('path');

module.exports = {
    entry: {
        //sAlgolCompiler: "./src/sAlgolCompiler/index.ts",
        metaCompiler: "./src/metaCompiler/index.ts"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].entry.js"
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.json']
    },
    target: "node",
    sourceMaps: false,
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' }
        ]
    }
}
