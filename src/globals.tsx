import { setGlobal } from 'reactn';
import { dummyMusic } from './dataInterfaces/music';

let gToken = '';

export const setToken = (token: string): void => {
    gToken = token;
};

export const getToken = (): string => {
    return gToken;
};

export const isTokenExsit = (): boolean => {
    return gToken.length > 0;
};

setGlobal({
    avatar: 'anonymous.png',
    userId: 'guest',
    isLogin: false,
    drawerOpen: false,
    loginModalOpen: false,
    currentMusic: dummyMusic,
    musics: [],
});
