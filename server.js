import socket from 'socket.io';
import config from './webpack.config';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 8300;

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
            root: './dist'
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

