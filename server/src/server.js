import Server from 'socket.io';
import express from 'express';

const app = express();
const port = process.env.PORT || '3000';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

export default function startServer(store) {
    const io = new Server().listen(port);
    io.path('https://stormy-citadel-54885.herokuapp.com/');

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

}
