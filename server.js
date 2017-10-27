"use strict";
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./cfg/dev.js');
var defaultJs= require('./cfg/default');
var dfPath= defaultJs.dfPath;
let app = new (require('express'))();
let post = 9001;
config.entry.unshift('webpack-hot-middleware/client?reload=true');
let compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {publicPath: '/assets/'}));
app.use(webpackHotMiddleware(compiler));
app.get('/*', (req, res)=>res.sendFile(dfPath.src + '/index.html'));
app.listen(post, (error)=> {
    if (!error) {
        console.log();
    }
});