const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: './src/server.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: 'source-map-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    target: 'node'
};
