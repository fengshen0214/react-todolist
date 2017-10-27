"use strict";
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var defaultJs= require('./default.js');
var dfPath= defaultJs.dfPath;
var dfConfig= defaultJs.dfConfig;

let config = Object.assign(dfConfig, {
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename:'../index.html',
            template:'./src/index.html'
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery',
            React:'react',
            ReactDOM:'react-dom',
            PT:'prop-types'
        })
    ],
    resolve:{
        modules:[
            'node_modules',
            dfPath.src,
            dfPath.common,
            dfPath.components,
            dfPath.layout,
            dfPath.view,
            dfPath.root,
        ]
    },
    devtool:'cheap-module-eval-source-map'
});
config.module.rules.push(
    {
        test:/\.js$/,
        use:['babel-loader'],
        include:[
            dfPath.src
        ]
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test:/\.scss$/,
        use:[
            'style-loader',
            {
                loader:'css-loader',
                options:{
                    module:true,
                    localIdentName:'[local]--[hash:base64:6]'
                }
            },
            {
                loader:'sass-loader'
            }
        ]
    }
);

module.exports= config