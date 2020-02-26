import React, { useState, useEffect } from 'react';

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

const clearUser = (): void => {
    gUser = 'Guest';
    gIsGuest = true;
};

export const doLogout = (): void => {
    console.log('begin logout : ' + gIsGuest);
    clearToken();
    clearUser();
    console.log('end logout : ' + gIsGuest);
};
