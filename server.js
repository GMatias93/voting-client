import socket from 'socket.io';
import config from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 8300;

const isDevelopment = (process.env.NODE_ENV !== 'production');
const static_path = path.join(__dirname, '/dist');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = app.listen(port, () => {
    const host = server.address().address;
    console.log(`Server listening at port ${port}`);
});

app.use(express.static(static_path))
    .get('/', (req, res) => {
        res.sendFile('index.html', {
            root: static_path
        });
    });


export default function startServer(store) {
    const io = socket(server);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });

}

if (isDevelopment) {

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true
    }).listen(3000, 'localhost', (err, result) => {
        if (err) { console.log(err); }
        console.log('Listening at port 3000');
    });
}
