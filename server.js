import socket from 'socket.io';
import express from 'express';
import path from 'path';
const app = express();
const port = process.env.PORT || 8300;
const static_path = path.join('.', __dirname, 'client');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(static_path))
    .get('/', (req, res) => {
        res.sendFile('index.html', {
            root: static_path
        });
    });

const server = app.listen(port, () => {
    const host = server.address().address;
    console.log(`Server listening at port ${port}`);
 });

export const io = socket.listen(server);
