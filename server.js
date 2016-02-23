var express = require('express');
var app = express();
var path = require('path');
var webpack = require('webpack');
var port = process.env.PORT || 3000;

var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, '/dist');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var server = app.listen(port, function() {
    var host = server.address().address;
    console.log('Server listening at port %d', port);
});

app.use(express.static(static_path))
    .get('/', function(req, res) {
        res.sendFile('index.html', {
            root: static_path
        });
    });

if (isDevelopment) {
    var config = require('./webpack.config');
    var WebpackDevServer = require('webpack-dev-server');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true
    }).listen(3000, 'localhost', function (err, result) {
        if (err) { console.log(err); }
        console.log('Listening at port 3000');
    });
}
