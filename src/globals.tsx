// import React from 'react';
// import { setGlobal } from 'reactn';

// setGlobal({
//     avatar: 'anonymous.png',
// });
import { setGlobal } from 'reactn';

let gUser = 'guest';
export let gIsGuest = true;
let gToken = '';
let gIsTokenSetted = false;

// export const useGuestState = (): boolean => {
//     const [isGuestEff, setIsGuestEff] = useState(gIsGuest);

//     return isGuestEff;
// };

export const setUserName = (user: string): void => {
    gUser = user;
    gIsGuest = false;
};

export const isGuest = (): boolean => {
    console.log('call isGuest()');
    return gIsGuest;
};

export const getUserName = (): string => {
    return gUser;
};

export const setToken = (token: string): void => {
    gToken = token;
    gIsTokenSetted = true;
};

export const getToken = (): string => {
    return gToken;
};

export const clearToken = (): void => {
    gIsTokenSetted = false;
    gToken = '';
};

export const isTokenSetted = (): boolean => {
    return gIsTokenSetted;
};

const clearUser = (): void => {
    gUser = 'Guest';
    gIsGuest = true;
};

export const doLogout = (): void => {
    console.log('begin logout : ' + gIsGuest);
    clearToken();
    clearUser();
    console.log(' gIsGuest : ' + gIsGuest);
    console.log('end logout : ' + gIsGuest);
};

setGlobal({
    avatar: 'anonymous.png',
});
