import socket from 'socket.io';
import path from 'path';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8300;
const static_path = path.join('.', __dirname, 'client');


export default function startServer(store) {
    const io = socket.listen(server);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}

server.listen(port);

app.use(express.static(static_path))
    .get('/', (req, res) => {
        res.sendFile('index.html', {
            root: static_path
        });
    });
