import io from 'socket.io-client';
import { getLoginFlag, getMeId, setLoginFlag } from '../helpers';
import { getUnreadMailNum } from './service';
import { store } from '../reducer/rootReducer';
import {
    OPEN_MASK,
    UPDATE_UNREAD_MAIL_COUNT,
    INCREASE_UNREAD_MAIL_COUNT,
    REFRESH_MAIL_PAGE,
} from 'reducer/system/types';

const host = process.env.REACT_APP_HOST;

let socket: typeof io.Socket | null = null;

// 初始化 socket
if (host) {
    socket = io(host);
}

export const emitLoginSocketMsg = (id: number): void => {
    if (socket) {
        socket.emit('login', id, (response: unknown) => console.log('login:', response));
    }
};

export const emitLogoutSocketMsg = (id: number): void => {
    socket.emit('logout', id, (response: unknown) => console.log('logout:', response));
};

export const initSocket = (): void => {
    socket = io(host);

    socket.on('connect', function() {
        console.log('Connected');

        // socket.emit('events', { test: 'test' });
        // socket.emit('identity', 0, (response: unknown) => console.log('Identity:', response));
    });

    socket.on('banned', function() {
        setLoginFlag(false);
        store.dispatch({ type: OPEN_MASK });
    });

    socket.on('new_mail', function() {
        store.dispatch({ type: INCREASE_UNREAD_MAIL_COUNT });
        store.dispatch({ type: REFRESH_MAIL_PAGE });
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
            getUnreadMailNum(num => {
                store.dispatch({ type: UPDATE_UNREAD_MAIL_COUNT, payload: { unreadMailCnt: num } });
                console.log('mails ' + num);
            });
        }
    }
};
