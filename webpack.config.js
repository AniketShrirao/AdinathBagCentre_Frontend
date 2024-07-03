const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const isDevelopment = env.NODE_ENV === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
            publicPath: '/',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            fallback: {
                "path": require.resolve("path-browserify"),
                "os": require.resolve("os-browserify/browser"),
                "crypto": require.resolve("crypto-browserify")
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './public/favicon.ico',
            }),
            new Dotenv({
                path: isDevelopment ? './.env.dev' : './.env.prod',
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(dotenv.parsed),
            }),
        ],
        devServer: {
            historyApiFallback: true,
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000,
        },
    };
};
