import io from 'socket.io-client';
import { getDispatch } from 'reactn';
import { getLoginFlag, getMeId } from '../globals';

let socket: SocketIOClient.Socket = null;

export const emitLoginSocketMsg = (id: number): void => {
    socket.emit('login', id, (response: unknown) => console.log('login:', response));
};

export const emitLogoutSocketMsg = (id: number): void => {
    socket.emit('logout', id, (response: unknown) => console.log('login:', response));
};

export const initSocket = (): void => {
    socket = io('localhost:9999');

    socket.on('connect', function() {
        console.log('Connected');

        socket.emit('events', { test: 'test' });
        socket.emit('identity', 0, (response: unknown) => console.log('Identity:', response));
    });

    socket.on('notice', function(data: unknown) {
        // console.log(getDispatch().updateNewMailHint);
        getDispatch().updateNewMailHint(true);
        console.log('NOTICE ', data);
    });

    socket.on('login', function(data: unknown) {
        console.log('login ', data);
    });

    socket.on('logout', function(data: unknown) {
        console.log('logout ', data);
    });

    socket.on('events', function(data: unknown) {
        console.log('event', data);
    });

    socket.on('exception', function(data: unknown) {
        console.log('event', data);
    });

    socket.on('disconnect', function() {
        console.log('Disconnected');
    });

    if (true === getLoginFlag()) {
        const id = getMeId();
        if (id > 0) {
            emitLoginSocketMsg(id);
        }
    }
};
