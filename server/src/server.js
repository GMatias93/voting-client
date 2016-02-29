// import Server from 'socket.io';
import io from '../../server.js';

export default function startServer(store) {
    // const io = new Server().attach(process.env.PORT || 8300);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });

}
