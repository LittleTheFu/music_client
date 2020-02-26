let gUser = 'guest';
export let gIsGuest = true;
let gToken = '';
let gIsTokenSetted = false;

// export gIsGuest;

export const setUserName = (user: string): void => {
    gUser = user;
    gIsGuest = false;
};

export const isGuest = (): boolean => {
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
    clearToken();
    clearUser();
};