import { setGlobal } from 'reactn';
import { dummyMusic } from './dataInterfaces/music';

// let gUser = 'guest';
// export let gIsGuest = true;
let gToken = '';
// const gIsTokenSetted = false;

// export const setUserName = (user: string): void => {
//     gUser = user;
//     gIsGuest = false;
// };

// export const isGuest = (): boolean => {
//     console.log('call isGuest()');
//     return gIsGuest;
// };

// export const getUserName = (): string => {
//     return gUser;
// };

export const setToken = (token: string): void => {
    gToken = token;
};

export const getToken = (): string => {
    return gToken;
};

// export const clearToken = (): void => {
//     gToken = '';
// };

export const isTokenExsit = (): boolean => {
    return gToken.length > 0;
};

// export const clearToken = (): void => {
//     gIsTokenSetted = false;
//     gToken = '';
// };

// export const isTokenSetted = (): boolean => {
//     return gIsTokenSetted;
// };

// const clearUser = (): void => {
//     gUser = 'Guest';
//     gIsGuest = true;
// };

// export const doLogout = (): void => {
//     console.log('begin logout : ' + gIsGuest);
//     clearToken();
//     clearUser();
//     console.log(' gIsGuest : ' + gIsGuest);
//     console.log('end logout : ' + gIsGuest);
// };

setGlobal({
    avatar: 'anonymous.png',
    userId: 'guest',
    isLogin: false,
    drawerOpen: false,
    loginModalOpen: false,
    currentMusic: dummyMusic,
    musics: [],
});
