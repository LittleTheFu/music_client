import { setGlobal } from 'reactn';
import { Music, dummyMusic } from './dataInterfaces/music';
import { State, Dispatch } from 'reactn/default';

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

export const updateMusic = (
    global: State,
    dispatch: Dispatch,
    music: Music,
): Pick<State, 'currentMusic' | 'musics'> => ({
    currentMusic: music,
    musics: global.musics.map(m => {
        if (m.id === music.id) {
            return music;
        } else {
            return m;
        }
    }),
});
