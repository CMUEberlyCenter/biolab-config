const { aliases } = require('./alias.config.js');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "../src/index.html"),
    filename: "index.html"
});
const StyleLintPlugin = require('stylelint-webpack-plugin');
const styleLintPlugin = new StyleLintPlugin({
    configFile: path.join(__dirname, "stylelint.config.js"),
    files: ["src/**/*.css"]
});

module.exports = {
    entry: {
        'app': "./src/index.js",
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: Infinity
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {}
            }
        ]
    },
    devServer: {
        contentBase: 'dist'
    },
    resolve: {
        alias: aliases
    },
    plugins: [styleLintPlugin,htmlWebpackPlugin]
};
