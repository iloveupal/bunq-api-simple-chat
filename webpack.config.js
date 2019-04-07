const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader',
            },
        ],
    },
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            Framework: path.resolve(__dirname, 'src/framework'),
            Modules: path.resolve(__dirname, 'src/modules'),
            Config: path.resolve(__dirname, 'src/config'),
            Utils: path.resolve(__dirname, 'src/utils'),
            Ui: path.resolve(__dirname, 'src/ui-kit'),
        }
    },
};
