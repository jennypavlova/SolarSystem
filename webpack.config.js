const ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ManifestPlugin = require('webpack-manifest-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path'),

    webpack = require('webpack');
    extractPlugin = new ExtractTextPlugin({
        filename: 'main.css'
    });

module.exports = {
    devServer: {
        contentBase: './dist',
        inline: true, // autorefresh
        port: 8080 // development port server
    },
    entry: './src/js/index.js', // entry point
    module: {
        rules: [
            {
                test: /\.jsx?$/, // search for js files
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/, // search for js files 
                exclude: /node_modules/,
                loader: ['babel-loader', 'eslint'],
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // place where bundled app will be served
        publicPath: '/',
    },
    plugins: [
        extractPlugin,
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/views/index.html'
        }),
        new ManifestPlugin({
            seed: {
                short_name: 'SolarSystem'
            },
            writeToFileEmit: true
        }),
        new CopyWebpackPlugin([{
            from: 'src/img',
            to: 'img',
        }])
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}